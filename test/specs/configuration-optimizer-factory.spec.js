/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    ConfigurationOptimizerFactory,
    utils: { promisify },
} = require('./resol-vbus');


const expect = require('./expect');



describe('ConfigurationOptimizerFactory', () => {

    describe('.createOptimizerByDeviceAddress', () => {

        it('should be a method', () => {
            expect(ConfigurationOptimizerFactory).property('createOptimizerByDeviceAddress').a('function');
        });

        it('should have unique addresses for registered optimizers', () => {
            return new Promise((resolve, reject) => {
                const knownAddresses = {};

                const optimizerClasses = ConfigurationOptimizerFactory._optimizerClasses;

                let index = 0;

                const nextOptimizer = function() {
                    if (index < optimizerClasses.length) {
                        const OptimizerClass = optimizerClasses [index++];

                        const address = OptimizerClass.deviceAddress;
                        if (address !== null) {
                            const addressKey = address.toString(16);

                            promisify(() => {
                                expect(address).a('number').above(0);

                                expect(knownAddresses).not.property(addressKey);

                                knownAddresses [addressKey] = true;

                                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(address);
                            }).then((optimizer) => {
                                expect(optimizer).an('object');

                                nextOptimizer();
                            }).then(null, (err) => {
                                reject(err);
                            });
                        } else {
                            nextOptimizer();
                        }
                    } else {
                        resolve();
                    }
                };

                nextOptimizer();
            });
        });

        it('should work correctly for unknown devices', () => {
            return promisify(() => {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x0050);
            }).then((optimizer) => {
                expect(optimizer).equal(null);
            });
        });

        it('should work correctly for RESOL DeltaSol BX Plus', () => {
            return promisify(() => {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7112);
            }).then((optimizer) => {
                expect(optimizer).a('object');
            });
        });

        it('should work correctly for RESOL DeltaSol CS Plus', () => {
            return promisify(() => {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x2211);
            }).then((optimizer) => {
                expect(optimizer).a('object');
            });
        });

        it('should work correctly for RESOL DeltaSol MX', () => {
            return promisify(() => {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x7E11);
            }).then((optimizer) => {
                expect(optimizer).a('object');
            });
        });

        it('should work correctly for RESOL DeltaSol SLT', () => {
            return promisify(() => {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x1001);
            }).then((optimizer) => {
                expect(optimizer).a('object');
            });
        });

        it('should work correctly for RESOL DeltaTherm HC', () => {
            return promisify(() => {
                return ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x5400);
            }).then((optimizer) => {
                expect(optimizer).a('object');
            });
        });



    });

});
