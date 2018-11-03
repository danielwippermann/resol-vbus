/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    utils,
} = require('./resol-vbus');


const expect = require('./expect');



describe('utils', () => {

    describe('roundNumber', () => {

        it('should be a function', () => {
            expect(utils.roundNumber).to.be.a('function');
        });

        it('should work correctly', () => {
            let result = utils.roundNumber(55.55, -1);
            expect(result).to.equal(55.6);

            result = utils.roundNumber(55.549, -1);
            expect(result).to.equal(55.5);

            result = utils.roundNumber(1.005, -2);
            expect(result).to.equal(1.01);

            result = utils.roundNumber(-24.700000000000003, -1);
            expect(result).to.equal(-24.7);

            let number;

            result = utils.roundNumber(number, 10);
            expect(result).to.equal(undefined);

            result = utils.roundNumber(10, number);
            expect(result).to.equal(10);

            result = utils.roundNumber(10, 0);
            expect(result).to.equal(10);

            result = utils.roundNumber(NaN, 0);
            expect(result).not.to.equal(NaN);

            result = utils.roundNumber(10, 1.2);
            expect(result).not.to.equal(NaN);
        });

    });

});
