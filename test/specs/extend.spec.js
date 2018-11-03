/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



const { extend } = require('./resol-vbus');


const expect = require('./expect');



describe('extend', () => {

    it('should be a function', () => {
        expect(extend).to.be.a('function');
    });

    const testExtend = function(parent, protoProps, staticProps) {
        if (parent) {
            expect(parent).to.be.a('function');
        }
        if (protoProps) {
            expect(protoProps).to.be.an('object');
        }
        if (staticProps) {
            expect(staticProps).to.be.an('object');
        }

        const child = extend(parent, protoProps, staticProps);

        expect(child).to.be.a('function');

        expect(child.extend).to.be.a('function');

        if (parent) {
            expect(Object.getPrototypeOf(child.prototype)).to.equal(parent.prototype);
        }

        return child;
    };

    it('should work without prototype properties', () => {
        const ChildClass = testExtend(null, null, null);

        const instance = new ChildClass();

        expect(instance).to.be.an('object');
        expect(instance).to.be.an.instanceOf(ChildClass);
    });

    it('should work without parent class', () => {
        const ChildClass = testExtend(null, {

            protoProp1: true

        }, {

            staticProp1: true

        });

        expect(ChildClass.staticProp1).to.equal(true);
        expect(ChildClass.prototype.protoProp1).to.equal(true);

        const instance = new ChildClass();

        expect(instance).to.be.an('object');
        expect(instance).to.be.an.instanceOf(ChildClass);
    });

    it('should work without parent class but with a constructor', () => {
        const childClassConstructor = sinon.spy();

        const ChildClass = testExtend(null, {

            protoProp1: true,

            constructor: childClassConstructor,

        }, {

            staticProp1: true

        });

        expect(ChildClass.staticProp1).to.equal(true);
        expect(ChildClass.prototype.protoProp1).to.equal(true);

        const instance = new ChildClass();

        expect(instance).to.be.an('object');
        expect(childClassConstructor.callCount).to.equal(1);
    });

    it('should work with parent class', () => {
        const ParentClass = testExtend(null, {

            protoProp1: true

        }, {

            staticProp1: true

        });

        const ChildClass = testExtend(ParentClass, {

            protoProp2: true

        }, {

            staticProp2: true

        });

        expect(ChildClass.staticProp1).to.equal(true);
        expect(ChildClass.staticProp2).to.equal(true);
        expect(ChildClass.prototype.protoProp1).to.equal(true);
        expect(ChildClass.prototype.protoProp2).to.equal(true);
    });

    it('should work with parent class and constructors', () => {
        const parentClassConstructor = sinon.spy();

        const ParentClass = testExtend(null, {

            protoProp1: true,

            constructor: parentClassConstructor,

        }, {

            staticProp1: true

        });

        const childClassConstructor = sinon.spy(function() {
            ParentClass.call(this);
        });

        const ChildClass = testExtend(ParentClass, {

            protoProp2: true,

            constructor: childClassConstructor,

        }, {

            staticProp2: true

        });

        expect(ChildClass.staticProp1).to.equal(true);
        expect(ChildClass.staticProp2).to.equal(true);
        expect(ChildClass.prototype.protoProp1).to.equal(true);
        expect(ChildClass.prototype.protoProp2).to.equal(true);

        const instance = new ChildClass();

        expect(instance).to.be.an('object');
        expect(childClassConstructor.callCount).to.equal(1);
        expect(parentClassConstructor.callCount).to.equal(1);
    });

});
