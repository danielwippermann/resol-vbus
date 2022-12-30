/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const index = require('./resol-vbus');


const expect = require('./expect');



describe('RESOL VBus', () => {

    it('should be an object', () => {
        expect(index).to.be.an('object');
    });

});
