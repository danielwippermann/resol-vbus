const browserIndex = require('../../src/browser-index');
const index = require('../../src/index');


describe('RESOL VBus browser index', () => {

    it('should be an object', () => {
        expect(typeof browserIndex).toBe('object');
        expect(Object.getOwnPropertyNames(browserIndex).sort()).toEqual([
            'Connection',
            'Converter',
            'DLxJsonConverter',
            'Datagram',
            'Header',
            'HeaderSet',
            'HeaderSetConsolidator',
            'I18N',
            'Packet',
            'Specification',
            'SpecificationFile',
            'Telegram',
            'TextConverter',
            'VBusRecordingConverter',
            'VERSION',
            'utils',
        ]);
        expect(browserIndex.Connection).toBe(index.Connection);
        expect(browserIndex.Converter).toBe(index.Converter);
        expect(browserIndex.DLxJsonConverter).toBe(index.DLxJsonConverter);
        expect(browserIndex.Datagram).toBe(index.Datagram);
        expect(browserIndex.Header).toBe(index.Header);
        expect(browserIndex.HeaderSet).toBe(index.HeaderSet);
        expect(browserIndex.HeaderSetConsolidator).toBe(index.HeaderSetConsolidator);
        expect(browserIndex.I18N).toBe(index.I18N);
        expect(browserIndex.Packet).toBe(index.Packet);
        expect(browserIndex.Specification).toBe(index.Specification);
        expect(browserIndex.SpecificationFile).toBe(index.SpecificationFile);
        expect(browserIndex.Telegram).toBe(index.Telegram);
        expect(browserIndex.TextConverter).toBe(index.TextConverter);
        expect(browserIndex.VBusRecordingConverter).toBe(index.VBusRecordingConverter);
        expect(browserIndex.VERSION).toBe(index.VERSION);
        expect(browserIndex.utils).toBe(index.utils);
    });

});
