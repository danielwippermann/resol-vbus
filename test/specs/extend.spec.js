/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var extend = require('./resol-vbus').extend;



describe('extend', function() {

    it('should be a function', function() {
        expect(extend).to.be.a('function');
    });

    var testExtend = function(parent, protoProps, staticProps) {
        if (parent) {
            expect(parent).to.be.a('function');
        }
        if (protoProps) {
            expect(protoProps).to.be.an('object');
        }
        if (staticProps) {
            expect(staticProps).to.be.an('object');
        }

        var child = extend(parent, protoProps, staticProps);

        expect(child).to.be.a('function');

        expect(child.extend).to.be.a('function');

        if (parent) {
            expect(Object.getPrototypeOf(child.prototype)).to.equal(parent.prototype);
        }

        return child;
    };

    it('should work without parent class', function() {
        var ChildClass = testExtend(null, {

            protoProp1: true

        }, {

            staticProp1: true

        });

        expect(ChildClass.staticProp1).to.equal(true);
        expect(ChildClass.prototype.protoProp1).to.equal(true);

        var instance = new ChildClass();

        expect(instance).to.be.an('object');
        expect(instance).to.be.an.instanceOf(ChildClass);
    });

    it('should work without parent class but with a constructor', function() {
        var childClassConstructor = sinon.spy();

        var ChildClass = testExtend(null, {

            protoProp1: true,

            constructor: childClassConstructor,

        }, {

            staticProp1: true

        });

        expect(ChildClass.staticProp1).to.equal(true);
        expect(ChildClass.prototype.protoProp1).to.equal(true);

        var instance = new ChildClass();

        expect(instance).to.be.an('object');
        expect(instance).to.be.an.instanceOf(ChildClass);
        expect(childClassConstructor.callCount).to.equal(1);
    });

    it('should work with parent class', function() {
        var ParentClass = testExtend(null, {

            protoProp1: true

        }, {

            staticProp1: true

        });

        var ChildClass = testExtend(ParentClass, {

            protoProp2: true

        }, {

            staticProp2: true

        });

        expect(ChildClass.staticProp1).to.equal(true);
        expect(ChildClass.staticProp2).to.equal(true);
        expect(ChildClass.prototype.protoProp1).to.equal(true);
        expect(ChildClass.prototype.protoProp2).to.equal(true);

        var instance = new ChildClass();

        expect(instance).to.be.an('object');
        expect(instance).to.be.an.instanceOf(ChildClass);
    });

    it('should work with parent class and constructors', function() {
        var parentClassConstructor = sinon.spy();

        var ParentClass = testExtend(null, {

            protoProp1: true,

            constructor: parentClassConstructor,

        }, {

            staticProp1: true

        });

        var childClassConstructor = sinon.spy(function() {
            ParentClass.call(this);
        });
        
        var ChildClass = testExtend(ParentClass, {

            protoProp2: true,

            constructor: childClassConstructor,

        }, {

            staticProp2: true

        });

        expect(ChildClass.staticProp1).to.equal(true);
        expect(ChildClass.staticProp2).to.equal(true);
        expect(ChildClass.prototype.protoProp1).to.equal(true);
        expect(ChildClass.prototype.protoProp2).to.equal(true);

        var instance = new ChildClass();

        expect(instance).to.be.an('object');
        expect(instance).to.be.an.instanceOf(ChildClass);
        expect(childClassConstructor.callCount).to.equal(1);
        expect(parentClassConstructor.callCount).to.equal(1);
    });

});
