/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    ConfigurationOptimizerFactory,
} = require('../resol-vbus');


const expect = require('../expect');
const _ = require('../lodash');
const testUtils = require('../test-utils');



const optimizerPromise = ConfigurationOptimizerFactory.createOptimizerByDeviceAddress(0x1050);



describe('ResolDeltaSolEV2100ConfigurationOptimizer', () => {

    describe('using ConfigurationOptimizerFactory', () => {

        it('should work correctly', async () => {
            const optimizer = await testUtils.expectPromise(optimizerPromise);

            expect(optimizer).an('object');
        });

    });

    describe('#completeConfiguration', () => {

        it('should work correctly', async () => {
            const optimizer = await optimizerPromise;

            const config = await testUtils.expectPromise(optimizer.completeConfiguration());

            expect(config).an('array').lengthOf(925);
        });

    });

    describe('#optimizeLoadConfiguration', () => {

        it('should work correctly after', async () => {
            const optimizer = await optimizerPromise;

            let config = await testUtils.expectPromise(optimizer.completeConfiguration());

            config = await testUtils.expectPromise(optimizer.optimizeLoadConfiguration(config));

            expect(config).an('array');

            let valueIds = _.reduce(config, (memo, value) => {
                if (value.pending) {
                    memo.push(value.valueId);
                }
                return memo;
            }, []);

            expect(valueIds).lengthOf(925);

            _.forEach(config, (value) => {
                if (value.pending) {
                    value.pending = false;
                    value.transceived = true;
                    value.value = null;
                }
            });

            config = await testUtils.expectPromise(optimizer.optimizeLoadConfiguration(config));

            expect(config).an('array');

            valueIds = _.reduce(config, (memo, value) => {
                if (value.pending) {
                    memo.push(value.valueId);
                }
                return memo;
            }, []);

            expect(valueIds).lengthOf(0);
        });

    });

});
