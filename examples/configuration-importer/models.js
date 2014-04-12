/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');


var vbus = require('../..');



var extend = vbus.extend;



var models = {};



var BaseModel = extend(null, {

}, {

    extend: function(protoProps, staticProps) {
        var result = extend(this, protoProps, staticProps);
        result.prototype.constructor = result;
        return result;
    },

});



models.MenuSystemModel = BaseModel.extend({

    languages: null,

    translationGroups: null,

    strings: null,

    types: null,

    values: null,

    constraints: null,

    presets: null,

    masks: null,

    linesTemplates: null,

    menus: null,

    implHeaders: null,

    implInitializers: null,

    constructor: function() {
        BaseModel.apply(this, arguments);

        this.languages = [];
        this.translationGroups = [];
        this.strings = [];
        this.types = [];
        this.values = [];
        this.constraints = [];
        this.presets = [];
        this.masks = [];
        this.linesTemplates = [];
        this.menus = [];
        this.implHeaders = [];
        this.implInitializers = [];
    },

});



models.TextModel = BaseModel.extend({

    lang: null,

    text: null,

});



models.LanguageModel = BaseModel.extend({

    id: null,

    texts: null,

    constructor: function() {
        BaseModel.apply(this, arguments);

        this.texts = [];
    },

});



models.TranslationGroupModel = BaseModel.extend({

    from: null,

    to: null,

    translations: null,

    constructor: function() {
        BaseModel.apply(this, arguments);

        this.translations = [];
    },

});



models.TranslationModel = BaseModel.extend({

    texts: null,

    constructor: function() {
        BaseModel.apply(this, arguments);

        this.texts = [];
    },

});



models.StringModel = BaseModel.extend({

    id: null,

    texts: null,

    constructor: function() {
        BaseModel.apply(this, arguments);

        this.texts = [];
    },

});



models.TypeValueModel = BaseModel.extend({

    id: null,

    value: null,

});



models.TypeQuantValueModel = models.TypeValueModel.extend({

    step: 0,

    roundtrip: false,

});



models.TypeValueTextModel = BaseModel.extend({

    value: null,

    texts: null,

    constructor: function() {
        BaseModel.apply(this, arguments);

        this.texts = [];
    },

});



models.TypeModel = BaseModel.extend({

    id: null,

    base: null,

    isBuiltIn: false,

    size: 0,

    externalDescriptorFunc: false,

    externalDisplayFunc: false,

    bitSize: 0,

    roundtrip: false,

    storeFactors: null,

    displayFactors: null,

    minimums: null,

    maximums: null,

    defaults: null,

    quants: null,

    valueTexts: null,

    unit: null,

    selectorValueRef: null,

    instance: null,

    constructor: function() {
        BaseModel.apply(this, arguments);

        this.storeFactors = [];
        this.displayFactors = [];
        this.minimums = [];
        this.maximums = [];
        this.defaults = [];
        this.quants = [];
        this.valueTexts = [];
    },

});



models.ValueModel = BaseModel.extend({

    id: null,

    idHash: 0,

    index: 0,

    storage: null,

    type: null,

    priority: 0,

    structValueRef: null,

    forceUse: false,

    compoundValueRef: null,

    valueTexts: null,

    externalDescriptorFunc: false,

    enableValueRef: null,

    constructor: function() {
        BaseModel.apply(this, arguments);

        this.type = new models.TypeModel();
        this.valueTexts = [];
    },

});



models.ConstraintModel = BaseModel.extend({

    condition: null,

});



models.MaskModel = BaseModel.extend({

    id: null,

    visible: null,

    handler: null,

    decoration: null,

    level: null,

    indent: null,

});



models.LineModel = BaseModel.extend({

    id: null,

    texts: null,

    textRef: null,

    lineRef: null,

    extraRef: null,

    mask: null,

    maskVal: null,

    constructor: function() {
        BaseModel.apply(this, arguments);

        this.texts = [];
    },

});



models.MenuModel = BaseModel.extend({

    id: null,

    type: null,

    lines: null,

    isBuiltIn: false,

    constructor: function() {
        BaseModel.apply(this, arguments);

        this.lines = [];
    },

});



_.forEach(models, function(Model, modelName) {
    Model.modelName = modelName;
    Model.prototype.modelName = modelName;
});



module.exports = models;
