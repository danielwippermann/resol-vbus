/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

class BaseModel {

}


class MenuSystemModel extends BaseModel {

    constructor() {
        super();

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
    }

}


class TextModel extends BaseModel {

    constructor() {
        super();

        this.lang = null;
        this.text = null;
    }

}



class LanguageModel extends BaseModel {

    constructor() {
        super();

        this.id = null;
        this.texts = [];
    }

}


class TranslationGroupModel extends BaseModel {

    constructor() {
        super();

        this.from = null;
        this.to = null;
        this.translations = [];
    }

}


class TranslationModel extends BaseModel {

    constructor() {
        super();

        this.texts = [];
    }

}


class StringModel extends BaseModel {

    constructor() {
        super();

        this.id = null;
        this.texts = [];
    }

}


class TypeValueModel extends BaseModel {

    constructor() {
        super();

        this.id = null;
        this.value = null;
    }

}



class TypeQuantValueModel extends TypeValueModel {

    constructor() {
        super();

        this.step = 0;
        this.roundtrip = false;
    }

}


class TypeValueTextModel extends BaseModel {

    constructor() {
        super();

        this.value = null;
        this.texts = [];
    }

}


class TypeModel extends BaseModel {

    constructor() {
        super();

        this.id = null;
        this.base = null;
        this.isBuiltIn = false;
        this.size = 0;
        this.externalDescriptorFunc = false;
        this.externalDisplayFunc = false;
        this.bitSize = 0;
        this.roundtrip = false;
        this.storeFactors = [];
        this.displayFactors = [];
        this.minimums = [];
        this.maximums = [];
        this.defaults = [];
        this.quants = [];
        this.valueTexts = [];
        this.unit = null;
        this.selectorValueRef = null;
        this.instance = null;
    }

}


class ValueModel extends BaseModel {

    constructor() {
        super();

        this.id = null;
        this.idHash = 0;
        this.index = 0;
        this.storage = null;
        this.type = new models.TypeModel();
        this.priority = 0;
        this.structValueRef = null;
        this.forceUse = false;
        this.compoundValueRef = null;
        this.valueTexts = [];
        this.externalDescriptorFunc = false;
        this.enableValueRef = null;
    }

}


class ConstraintModel extends BaseModel {

    constructor() {
        super();

        this.condition = null;
    }

}


class MaskModel extends BaseModel {

    constructor() {
        super();

        this.id = null;
        this.visible = null;
        this.handler = null;
        this.decoration = null;
        this.level = null;
        this.indent = null;
    }

}


class LineModel extends BaseModel {

    constructor() {
        super();

        this.id = null;
        this.texts = [];
        this.textRef = null;
        this.lineRef = null;
        this.extraRef = null;
        this.mask = null;
        this.maskVal = null;
    }

}


class MenuModel extends BaseModel {

    constructor() {
        super();

        this.id = null;
        this.type = null;
        this.lines = [];
        this.isBuiltIn = false;
    }

}


const models = {
    MenuSystemModel,
    TextModel,
    LanguageModel,
    TranslationGroupModel,
    TranslationModel,
    StringModel,
    TypeValueModel,
    TypeQuantValueModel,
    TypeValueTextModel,
    TypeModel,
    ValueModel,
    ConstraintModel,
    MaskModel,
    LineModel,
    MenuModel,
};

for (const modelName of Object.getOwnPropertyNames(models)) {
    const Model = models [modelName];
    Model.modelName = modelName;
    Model.prototype.modelName = modelName;
}


module.exports = models;
