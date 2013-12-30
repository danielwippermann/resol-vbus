/*! resol-vbus | Copyright (c) 2013, Daniel Wippermann | MIT license */
'use strict';



var EventEmitter = require('events').EventEmitter;
var Duplex = require('stream').Duplex;


var _ = require('lodash');
var Q = require('q');


var extend = require('./extend');

var Header = require('./header');
var Packet = require('./packet');
var Datagram = require('./datagram');
var Telegram = require('./telegram');



var states = _.reduce([
    'DISCONNECTED',
    'CONNECTING',
    'CONNECTED',
    'INTERRUPTED',
    'RECONNECTING',
    'DISCONNECTING',
], function(memo, state) {
    memo ['STATE_' + state] = state;
    return memo;
}, {});



var optionKeys = [
    'channel',
    'selfAddress',
];



var Connection = extend(Duplex, {

    constructor: function(options) {
        Duplex.call(this);

        _.extend(this, _.pick(options, optionKeys));
    },

    dataSource: null,

    channel: 0,

    selfAddress: 0x0020,

    connectionState: states.STATE_DISCONNECTED,

    rxBuffer: null,

    connect: function() {
        throw new Error('Must be implemented by sub-class');
    },

    disconnect: function() {
        throw new Error('Must be implemented by sub-class');
    },

    _write: function(chunk, encoding, callback) {
        var _this = this;

        if (EventEmitter.listenerCount(this, 'rawData') > 0) {
            this.emit('rawData', chunk);
        }

        var buffer;
        if (this.rxBuffer) {
            buffer = Buffer.concat([ this.rxBuffer, chunk ]);
        } else {
            buffer = chunk;
        }

        var reportJunk = function(index) {
            if (index > processed) {
                if (EventEmitter.listenerCount(_this, 'junkData') > 0) {
                    var junkData = buffer.slice(processed, index);
                    _this.emit('junkData', junkData);
                }
            }
        };

        // console.log('_write (start):', this.rxBuffer, chunk);

        var index = 0, start = null, processed = 0;
        while (index < buffer.length) {
            var b = buffer [index] & 255;
            if (b === 0xAA) {
                reportJunk(index);

                start = index;
                processed = index;
            } else if (b >= 0x80) {
                start = null;
            } else if (start === null) {
                // skip junk
            } else if (index >= start + 5) {
                var version = buffer [start + 5] & 255;
                var majorVersion = version >> 4;
                var length;
                if (majorVersion === 1) {
                    if (index >= start + 8) {
                        length = 10 + buffer [start + 8] * 6;
                    } else {
                        length = 10;
                    }
                } else if (majorVersion === 2) {
                    length = 16;
                } else if (majorVersion === 3) {
                    if (index >= start + 6) {
                        length = 8 + Telegram.getFrameCountForCommand(buffer [start + 6]) * 9;
                    } else {
                        length = 8;
                    }
                } else {
                    length = 0;
                }

                if (index === start + length - 1) {
                    var valid = true, frameIndex;
                    if (version === 0x10) {
                        if (!Header.calcAndCompareChecksumV0(buffer, start + 1, start + 9)) {
                            // console.log('checksum error in header');
                            valid = false;
                        }

                        frameIndex = start + 10;
                        while (valid && (frameIndex < start + length)) {
                            if (!Header.calcAndCompareChecksumV0(buffer, frameIndex, frameIndex + 5)) {
                                // console.log('checksum error in frame index ' + frameIndex);
                                valid = false;
                            }
                            frameIndex += 6;
                        }
                    } else if (version === 0x20) {
                        if (!Header.calcAndCompareChecksumV0(buffer, start + 1, start + 15)) {
                            valid = false;
                        }
                    } else if (version === 0x30) {
                        if (!Header.calcAndCompareChecksumV0(buffer, start + 1, start + 7)) {
                            valid = false;
                        }

                        frameIndex = start + 8;
                        while (valid && (frameIndex < start + length)) {
                            if (!Header.calcAndCompareChecksumV0(buffer, frameIndex, frameIndex + 8)) {
                                valid = false;
                            }
                            frameIndex += 9;
                        }
                    } else {
                        valid = false;
                    }

                    if (valid) {
                        if (majorVersion === 1) {
                            if (EventEmitter.listenerCount(this, 'packet') > 0) {
                                var packet = Packet.fromLiveBuffer(buffer, start, index);
                                packet.channel = this.channel;
                                this.emit('packet', packet);
                            }
                        } else if (majorVersion === 2) {
                            if (EventEmitter.listenerCount(this, 'datagram') > 0) {
                                var datagram = Datagram.fromLiveBuffer(buffer, start, index);
                                datagram.channel = this.channel;
                                this.emit('datagram', datagram);
                            }
                        } else if (majorVersion === 3) {
                            if (EventEmitter.listenerCount(this, 'telegram') > 0) {
                                var telegram = Telegram.fromLiveBuffer(buffer, start, index);
                                telegram.channel = this.channel;
                                this.emit('telegram', telegram);
                            }
                        }
                    } else {
                        reportJunk(index + 1);
                    }

                    start = null;
                    processed = index + 1;
                }
            }

            index++;
        }

        var minProcessed = buffer.length - 1024;
        if (processed < minProcessed) {
            reportJunk(minProcessed);
            processed = minProcessed;
        }

        if (processed < buffer.length) {
            this.rxBuffer = buffer.slice(processed);
        } else {
            this.rxBuffer = null;
        }
        
        // console.log('_write (end): ', this.rxBuffer); 

        if (callback) {
            callback(null);
        }
    },

    _read: function() {
        // nop
    },

    _setConnectionState: function(newState) {
        if (this.connectionState !== newState) {
            this.connectionState = newState;

            this.rxBuffer = null;
            
            if (EventEmitter.listenerCount(this, 'connectionState') > 0) {
                this.emit('connectionState', newState);
            }
        }
    },

    send: function(data) {
        if (data instanceof Header) {
            data = data.toLiveBuffer();
        }
        return this.push(data);
    },

    transceive: function(txData, options) {
        var _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 0,
            tries: 1,
        });

        var deferred = Q.defer();
        var promise = deferred.promise;

        var timer, onPacket, onDatagram;

        var done = function(err, result) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            if (onPacket) {
                _this.removeListener('packet', onPacket);
                onPacket = null;
            }

            if (onDatagram) {
                _this.removeListener('datagram', onDatagram);
                onDatagram = null;
            }

            if (deferred) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
                deferred = null;
            }
        };

        if (options.filterPacket) {
            onPacket = function(rxPacket) {
                options.filterPacket(rxPacket, done);
            };

            this.on('packet', onPacket);
        }
        
        if (options.filterDatagram) {
            onDatagram = function(rxDatagram) {
                options.filterDatagram(rxDatagram, done);
            };

            this.on('datagram', onDatagram);
        }

        var tries = options.tries, timeout = options.timeout;

        var nextTry = function() {
            if (tries > 0) {
                tries--;

                if (txData) {
                    _this.send(txData);
                }

                timer = setTimeout(nextTry, timeout);

                timeout += options.timeoutIncr;
            } else {
                done(null, null);
            }
        };

        process.nextTick(nextTry);

        return promise;
    },

    waitForFreeBus: function(timeout) {
        var options = {
            tries: 1,
            timeout: timeout || 10000,
        };

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.command === 0x0500) {
                done(null, rxDatagram);
            }
        };

        return this.transceive(null, options);
    },

    releaseBus: function(address, options) {
        options = _.defaults({}, options, {
            tries: 2,
            timeout: 1500
        });

        var txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x0600,
            valueId: 0,
            value: 0
        }).toLiveBuffer();

        options.filterPacket = function(rxPacket, done) {
            done(null, rxPacket);
        };

        return this.transceive(txDatagram, options);
    },

    getValueById: function(address, valueId, options) {
        var _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
        });

        var txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: 0x0300,
            valueId: valueId,
            value: 0
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {

            } else if (rxDatagram.sourceAddress !== address) {

            } else if (rxDatagram.command !== 0x0100) {

            } else if (rxDatagram.valueId !== valueId) {

            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    },

    setValueById: function(address, valueId, value, options) {
        var _this = this;

        options = _.defaults({}, options, {
            timeout: 500,
            timeoutIncr: 500,
            tries: 3,
            save: false
        });

        var txDatagram = new Datagram({
            destinationAddress: address,
            sourceAddress: this.selfAddress,
            command: options.save ? 0x0400 : 0x0200,
            valueId: valueId,
            value: value
        }).toLiveBuffer();

        options.filterDatagram = function(rxDatagram, done) {
            if (rxDatagram.destinationAddress !== _this.selfAddress) {

            } else if (rxDatagram.sourceAddress !== address) {

            } else if (rxDatagram.command !== 0x0100) {

            } else if (rxDatagram.valueId !== valueId) {

            } else {
                done(null, rxDatagram);
            }
        };

        return this.transceive(txDatagram, options);
    }

}, states);



module.exports = Connection;
