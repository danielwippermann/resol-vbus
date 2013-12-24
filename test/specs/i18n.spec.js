/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
'use strict';



var I18N = require('./resol-vbus').I18N;



describe('I18N', function() {

    describe('constructor', function() {

        it('should be a constructor function', function() {
            expect(I18N).to.be.a('function');

            var i18n = new I18N();

            expect(i18n).to.be.an.instanceOf(I18N);
        });

        it('should have reasonable defaults', function() {
            var i18n = new I18N();

            expect(i18n.language).to.equal('en');
        });

        it('should copy the language argument', function() {
            var i18n = new I18N('de');

            expect(i18n.language).to.equal('de');
        });

    });

    describe('#t', function() {

        it('should be a method', function() {
            var i18n = new I18N();

            expect(i18n.t).to.be.a('function');
        });

        it('should work correctly for known keys', function() {
            var i18n = new I18N();

            var text = i18n.t('specification.unknownDevice');

            expect(text).to.equal('Unknown Device (0x%1$04X)');
        });

        it('should work correctly for unknown keys', function() {
            var i18n = new I18N();

            var text = i18n.t('debug.doNotTranslateThisKey');

            expect(text).to.equal('debug.doNotTranslateThisKey');
        });

        it('should work correctly for known keys in German', function() {
            var i18n = new I18N('de');

            var text = i18n.t('specification.unknownDevice');

            expect(text).to.equal('Unbekanntes Gerät (0x%1$04X)');
        });

    });

    describe('#moment', function() {

        it('should be a method', function() {
            expect(I18N.prototype.moment).to.be.a('function');
        });

        it('should work correctly', function() {
            var i18n = new I18N();

            var m = i18n.moment(1387888153828);

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('12/24/2013 1:29 PM');
        });

        it('should work correctly in German', function() {
            var i18n = new I18N('de');

            var m = i18n.moment(1387888153828);

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('24.12.2013 13:29 Uhr');
        });

        it('should work correctly in an unknown language', function() {
            var i18n = new I18N('?');

            var m = i18n.moment(1387888153828);

            expect(m).to.be.an('object');
            expect(m.format).to.be.a('function');
            expect(m.format('L LT')).to.equal('12/24/2013 1:29 PM');
        });

    });

    describe('#numeral', function() {

        it('should be a method', function() {
            expect(I18N.prototype.numeral).to.be.a('function');
        });

        it('should work correctly', function() {
            var i18n = new I18N();

            var n = i18n.numeral(1234.5);

            expect(n).to.be.an('object');
            expect(n.format).to.be.a('function');
            expect(n.format('0,0.0')).to.equal('1,234.5');
        });

        it('should work correctly in German', function() {
            var i18n = new I18N('de');

            var n = i18n.numeral(1234.5);

            expect(n).to.be.an('object');
            expect(n.format).to.be.a('function');
            expect(n.format('0,0.0')).to.equal('1 234,5');
        });
        
        it('should work correctly in an unknown language', function() {
            var i18n = new I18N('?');

            var n = i18n.numeral(1234.5);

            expect(n).to.be.an('object');
            expect(n.format).to.be.a('function');
            expect(n.format('0,0.0')).to.equal('1,234.5');
        });

    });

});
