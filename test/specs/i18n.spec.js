/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const {
    I18N,
} = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
    expectTypeToBe,
    itShouldBeAClass,
} = require('./test-utils');



function expectFormattedObjectToBe(m, format, expected) {
    expectTypeToBe(m, 'object');
    expectTypeToBe(m.format, 'function');
    expect(m.format(format)).toBe(expected);
}


describe('I18N', () => {

    itShouldBeAClass(I18N, null, {
        language: null,
        languageData: null,
        timezone: null,
        constructor: Function,
        sprintf: Function,
        vsprintf: Function,
        t: Function,
        moment: Function,
        momentUtc: Function,
        momentTz: Function,
        momentTzZone: Function,
        numeral: Function,
    }, {

    });

    describe('constructor', () => {

        it('should have reasonable defaults', () => {
            const i18n = new I18N();

            expectOwnPropertyNamesToEqual(i18n, [
                'language',
                'languageData',
            ]);

            expect(i18n.language).toBe('en');
        });

        it('should copy the language argument', () => {
            const i18n = new I18N('de');

            expect(i18n.language).toBe('de');
        });

    });

    describe('#sprintf', () => {

        it('should work correctly', () => {
            const i18n = new I18N();

            const result = i18n.sprintf('%04d_%04x_%s', 0x300, 0x300, 'Test');

            expect(result).toBe('0768_0300_Test');
        });

    });

    describe('#vsprintf', () => {

        it('should work correctly', () => {
            const i18n = new I18N();

            const result = i18n.vsprintf('%04d_%04x_%s', [ 0x300, 0x300, 'Test' ]);

            expect(result).toBe('0768_0300_Test');
        });

    });

    describe('#t', () => {

        it('should work correctly for known keys', () => {
            const i18n = new I18N();

            const text = i18n.t('specification.unknownDevice');

            expect(text).toBe('Unknown Device (0x%1$04X)');
        });

        it('should work correctly for unknown keys', () => {
            const i18n = new I18N();

            const text = i18n.t('debug.doNotTranslateThisKey');

            expect(text).toBe('debug.doNotTranslateThisKey');
        });

        it('should work correctly for known keys in German', () => {
            const i18n = new I18N('de');

            const text = i18n.t('specification.unknownDevice');

            expect(text).toBe('Unbekanntes Gerät (0x%1$04X)');
        });

        it('should work correctly for known keys with sprintf placeholders', () => {
            const i18n = new I18N();

            const text = i18n.t('specification.unknownDevice', 0x1234);

            expect(text).toBe('Unknown Device (0x1234)');
        });

    });

    describe('#moment', () => {

        it('should work correctly', () => {
            const i18n = new I18N();
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.moment(1387888153828);

            expectFormattedObjectToBe(m, 'L LT', '12/24/2013 1:29 PM');
        });

        it('should work correctly in German', () => {
            const i18n = new I18N('de');
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.moment(1387888153828);

            expectFormattedObjectToBe(m, 'L LT', '24.12.2013 13:29');
        });

        it('should work correctly in an unknown language', () => {
            const i18n = new I18N('?');
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.moment(1387888153828);

            expectFormattedObjectToBe(m, 'L LT', '12/24/2013 1:29 PM');
        });

    });

    describe('#momentUtc', () => {

        it('should work correctly', () => {
            const i18n = new I18N();
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.momentUtc(1387888153828);

            expectFormattedObjectToBe(m, 'L LT', '12/24/2013 12:29 PM');
        });

        it('should work correctly in German', () => {
            const i18n = new I18N('de');
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.momentUtc(1387888153828);

            expectFormattedObjectToBe(m, 'L LT', '24.12.2013 12:29');
        });

        it('should work correctly in an unknown language', () => {
            const i18n = new I18N('?');
            i18n.timezone = 'Europe/Berlin';

            const m = i18n.momentUtc(1387888153828);

            expectFormattedObjectToBe(m, 'L LT', '12/24/2013 12:29 PM');
        });

    });

    describe('#momentTz', () => {

        it('should work correctly', () => {
            const i18n = new I18N();

            let m = i18n.momentTz(1387888153828, 'Europe/Berlin');

            expectFormattedObjectToBe(m, 'L LT', '12/24/2013 1:29 PM');

            m = i18n.momentTz(1387888153828, 'America/Los_Angeles');

            expectFormattedObjectToBe(m, 'L LT', '12/24/2013 4:29 AM');
        });

        it('should work correctly in German', () => {
            const i18n = new I18N('de');

            let m = i18n.momentTz(1387888153828, 'Europe/Berlin');

            expectFormattedObjectToBe(m, 'L LT', '24.12.2013 13:29');

            m = i18n.momentTz(1387888153828, 'America/Los_Angeles');

            expectFormattedObjectToBe(m, 'L LT', '24.12.2013 04:29');
        });

        it('should work correctly in an unknown language', () => {
            const i18n = new I18N('?');

            let m = i18n.momentTz(1387888153828, 'Europe/Berlin');

            expectFormattedObjectToBe(m, 'L LT', '12/24/2013 1:29 PM');

            m = i18n.momentTz(1387888153828, 'America/Los_Angeles');

            expectFormattedObjectToBe(m, 'L LT', '12/24/2013 4:29 AM');
        });

    });

    describe('#momentTzZone', () => {

        it('should work correctly', () => {
            const i18n = new I18N();

            const m = i18n.momentTz(1387888153828, 'Europe/Berlin');

            const z = i18n.momentTzZone('Europe/Berlin');

            expectTypeToBe(z, 'object');
            expectTypeToBe(z.abbr, 'function');
            expectTypeToBe(z.offset, 'function');

            expect(z.abbr(m)).toBe('CET');
            expect(z.utcOffset(m)).toBe(-60);
        });

    });

    describe('#numeral', () => {

        it('should work correctly', () => {
            const i18n = new I18N();

            const n = i18n.numeral(1234.5);

            expectFormattedObjectToBe(n, '0,0.0', '1,234.5');
        });

        it('should work correctly in German', () => {
            const i18n = new I18N('de');

            const n = i18n.numeral(1234.5);

            expectFormattedObjectToBe(n, '0,0.0', '1 234,5');
        });

        it('should work correctly in an unknown language', () => {
            const i18n = new I18N('?');

            const n = i18n.numeral(1234.5);

            expectFormattedObjectToBe(n, '0,0.0', '1,234.5');
        });

    });

});
