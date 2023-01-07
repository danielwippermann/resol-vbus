/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const index = require('./resol-vbus');


const {
    expect,
    expectOwnPropertyNamesToEqual,
} = require('./test-utils');



describe('RESOL VBus', () => {

    it('should export correctly', () => {
        expectOwnPropertyNamesToEqual(index, [
            'VERSION',
            'utils',
            'I18N',
            'SpecificationFile',
            'Specification',
            'Header',
            'Packet',
            'Datagram',
            'Telegram',
            'HeaderSet',
            'HeaderSetConsolidator',
            'Connection',
            'SerialConnection',
            'TcpConnection',
            'DataSource',
            'SerialDataSource',
            'TcpDataSource',
            'DataSourceProvider',
            'SerialDataSourceProvider',
            'TcpDataSourceProvider',
            'Converter',
            'VBusRecordingConverter',
            'TextConverter',
            'DLxJsonConverter',
            'ConfigurationOptimizer',
            'ConfigurationOptimizerFactory',
            'BaseConfigurationOptimizer',
            'Customizer',
            'ConnectionCustomizer',
            'TcpConnectionEndpoint',
            'FileListReader',
        ]);
    });

});
