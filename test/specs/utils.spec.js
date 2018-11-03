/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const {
    utils: {
        roundNumber,
    },
} = require('./resol-vbus');


const expect = require('./expect');



describe('utils', () => {

    describe('roundNumber', () => {

        it('should be a function', () => {
            expect(roundNumber).to.be.a('function');
        });

        it('should work correctly', () => {
            let result = roundNumber(55.55, -1);
            expect(result).to.equal(55.6);

            result = roundNumber(55.549, -1);
            expect(result).to.equal(55.5);

            result = roundNumber(1.005, -2);
            expect(result).to.equal(1.01);

            result = roundNumber(-24.700000000000003, -1);
            expect(result).to.equal(-24.7);

            let number;

            result = roundNumber(number, 10);
            expect(result).to.equal(undefined);

            result = roundNumber(10, number);
            expect(result).to.equal(10);

            result = roundNumber(10, 0);
            expect(result).to.equal(10);

            result = roundNumber(NaN, 0);
            expect(result).not.to.equal(NaN);

            result = roundNumber(10, 1.2);
            expect(result).not.to.equal(NaN);
        });

    });

});
