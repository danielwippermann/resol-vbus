/**
 * @license
 * resol-vbus - A JavaScript library for processing RESOL VBus data
 */
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
            expect(child.prototype.__proto__).to.eql(parent.prototype);
        }

        return child;
    };

    it('should work without parent class', function() {
        var ChildClass = testExtend(null, {

            protoProp1: true

        }, {

            staticProp1: true

        });

        expect(ChildClass.staticProp1).to.eql(true);
        expect(ChildClass.prototype.protoProp1).to.eql(true);
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

        expect(ChildClass.staticProp1).to.eql(true);
        expect(ChildClass.staticProp2).to.eql(true);
        expect(ChildClass.prototype.protoProp1).to.eql(true);
        expect(ChildClass.prototype.protoProp2).to.eql(true);
    });

});
