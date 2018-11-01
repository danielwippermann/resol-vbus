/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const I18N = require('./resol-vbus').I18N;



describe('I18N', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(I18N).to.be.a('function');

            const i18n = new I18N();

            expect(i18n).to.be.an.instanceOf(I18N);
        });

        it('should have reasonable defaults', function() {
            const i18n = new I18N();

            expect(i18n.language).to.equal('en');
        });

        it('should copy the language argument', function() {
            const i18n = new I18N('de');

            expect(i18n.language).to.equal('de');
        });

    });

    describe('#sprintf', function() {

        it('should be a method', function() {
            expect(I18N.prototype.sprintf).to.be.a('function');
        });

        it('should work correctly', function() {
            const i18n = new I18N();

            const result = i18n.sprintf('%04d_%04x_%s', 0x300, 0x300, 'Test');

            expect(result).to.equal('0768_0300_Test');
        });

    });

    describe('#vsprintf', function() {

        it('should be a method', function() {
            expect(I18N.prototype.sprintf).to.be.a('function');
        });

        it('should work correctly', function() {
            const i18n = new I18N();

            const result = i18n.vsprintf('%04d_%04x_%s', [ 0x300, 0x300, 'Test' ]);

            expect(result).to.equal('0768_0300_Test');
        });

    });

    describe('#t', function() {

        it('should be a method', function() {
            expect(I18N.prototype.t).to.be.a('function');
        });

        it('should work correctly for known keys', function() {
            const i18n = new I18N();

            const text = i18n.t('specification.unknownDevice');

            expect(text).to.equal('Unknown Device (0x%1$04X)');
        });

        it('should work correctly for unknown keys', function() {
            const i18n = new I18N();

            const text = i18n.t('debug.doNotTranslateThisKey');

            expect(text).to.equal('debug.doNotTranslateThisKey');
        });

        it('should work correctly for known keys in German', function() {
            const i18n = new I18N('de');

            const text = i18n.t('specification.unknownDevice');

            expect(text).to.equal('Unbekanntes Gerät (0x%1$04X)');
        });

        it('should work correctly for known keys with sprintf placeholders', function() {
            const i18n = new I18N();

            const text = i18n.t('specification.unknownDevice', 0x1234);

            expect(text).to.equal('Unknown Device (0x1234)');
        });

    });

    describe('#moment', function() {

        it('should be a method', function() {
            expect(I18N.prototype.moment).to.be.a('function');
        });

        it('should work correctly', function() {
            const i18n = new I18N();
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.moment(1387888153828);

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('12/24/2013 1:29 PM');
        });

        it('should work correctly in German', function() {
            const i18n = new I18N('de');
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.moment(1387888153828);

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('24.12.2013 13:29');
        });

        it('should work correctly in an unknown language', function() {
            const i18n = new I18N('?');
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.moment(1387888153828);

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('12/24/2013 1:29 PM');
        });

    });

    describe('#momentUtc', function() {

        it('should be a method', function() {
            expect(I18N.prototype.momentUtc).to.be.a('function');
        });

        it('should work correctly', function() {
            const i18n = new I18N();
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.momentUtc(1387888153828);

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('12/24/2013 12:29 PM');
        });

        it('should work correctly in German', function() {
            const i18n = new I18N('de');
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.momentUtc(1387888153828);

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('24.12.2013 12:29');
        });

        it('should work correctly in an unknown language', function() {
            const i18n = new I18N('?');
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.momentUtc(1387888153828);

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('12/24/2013 12:29 PM');
        });

    });

    describe('#momentTz', function() {

        it('should be a method', function() {
            expect(I18N.prototype.momentTz).to.be.a('function');
        });

        it('should work correctly', function() {
            const i18n = new I18N();

            let m = i18n.momentTz(1387888153828, 'Europe/Berlin');

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('12/24/2013 1:29 PM');

            m = i18n.momentTz(1387888153828, 'America/Los_Angeles');

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('12/24/2013 4:29 AM');
        });

        it('should work correctly in German', function() {
            const i18n = new I18N('de');

            let m = i18n.momentTz(1387888153828, 'Europe/Berlin');

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');

            m = i18n.momentTz(1387888153828, 'America/Los_Angeles');

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('24.12.2013 04:29');
        });

        it('should work correctly in an unknown language', function() {
            const i18n = new I18N('?');

            let m = i18n.momentTz(1387888153828, 'Europe/Berlin');

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('12/24/2013 1:29 PM');

            m = i18n.momentTz(1387888153828, 'America/Los_Angeles');

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('12/24/2013 4:29 AM');
        });

    });

    describe('#momentTzZone', function() {

        it('should be a method', function() {
            expect(I18N.prototype.momentTzZone).to.be.a('function');
        });

        it('should work correctly', function() {
            const i18n = new I18N();

            const m = i18n.momentTz(1387888153828, 'Europe/Berlin');

            const z = i18n.momentTzZone('Europe/Berlin');

            expect(z).to.be.an('object');
            expect(z).property('abbr').a('function');
            expect(z).property('offset').a('function');

            expect(z.abbr(m)).equal('CET');
            expect(z.utcOffset(m)).equal(-60);
        });

    });

    describe('#numeral', function() {

        it('should be a method', function() {
            expect(I18N.prototype.numeral).to.be.a('function');
        });

        it('should work correctly', function() {
            const i18n = new I18N();

            const n = i18n.numeral(1234.5);

            expect(n).to.be.an('object');
            expect(n.format).to.be.a('function');
            expect(n.format('0,0.0')).to.equal('1,234.5');
        });

        it('should work correctly in German', function() {
            const i18n = new I18N('de');

            const n = i18n.numeral(1234.5);

            expect(n).to.be.an('object');
            expect(n.format).to.be.a('function');
            expect(n.format('0,0.0')).to.equal('1 234,5');
        });

        it('should work correctly in an unknown language', function() {
            const i18n = new I18N('?');

            const n = i18n.numeral(1234.5);

            expect(n).to.be.an('object');
            expect(n.format).to.be.a('function');
            expect(n.format('0,0.0')).to.equal('1,234.5');
        });

    });

});
