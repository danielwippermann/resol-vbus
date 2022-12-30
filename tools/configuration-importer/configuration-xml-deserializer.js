/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

const _ = require('lodash');


const models = require('./models');

const XmlDeserializer = require('./xml-deserializer');



class ConfigurationXmlDeserializer extends XmlDeserializer {

    _deserializeText(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'lang':
                model.lang = this._getStringValue(child);
                break;
            case null:
                model.text = this._getStringValue(child);
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeLanguage(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'id':
                model.id = this._getStringValue(child);
                break;
            case 'partial':
                model.partial = this._getBooleanValue(child);
                break;
            case 'text':
                model.texts.push(this._deserializeText(child, new models.TextModel()));
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeTranslationGroup(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'from':
                model.from = this._getStringValue(child);
                break;
            case 'to':
                model.to = this._getStringValue(child);
                break;
            case 'translation':
                model.translations.push(this._deserializeTranslation(child, new models.TranslationModel()));
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeTranslation(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'text':
                model.texts.push(this._deserializeText(child, new models.TextModel()));
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeString(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'id':
                model.id = this._getStringValue(child);
                break;
            case 'text':
                model.texts.push(this._deserializeText(child, new models.TextModel()));
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeTypeValue(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'id':
                model.id = this._getStringValue(child);
                break;
            case null:
                model.value = this._getStringValue(child);
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeTypeQuantValue(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'id':
                model.id = this._getStringValue(child);
                break;
            case 'step':
                model.step = this._getNumberValue(child);
                break;
            case 'roundtrip':
                model.roundtrip = this._getBooleanValue(child);
                break;
            case null:
                model.value = this._getStringValue(child);
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeTypeValueText(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'id':
                model.id = this._getStringValue(child);
                break;
            case 'value':
                model.value = this._getStringValue(child);
                break;
            case 'text':
                model.texts.push(this._deserializeText(child, new models.TextModel()));
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeType(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'id':
                model.id = this._getStringValue(child);
                break;
            case 'base':
                model.base = this._getStringValue(child);
                break;
            case 'isbuiltin':
                model.isBuiltIn = this._getBooleanValue(child);
                break;
            case 'size':
                model.size = this._getIntegerValue(child);
                break;
            case 'externaldescriptorfunc':
                model.externalDescriptorFunc = this._getBooleanValue(child);
                break;
            case 'externaldisplayfunc':
                model.externalDisplayFunc = this._getBooleanValue(child);
                break;
            case 'bitsize':
                model.bitSize = this._getIntegerValue(child);
                break;
            case 'roundtrip':
                model.roundtrip = this._getBooleanValue(child);
                break;
            case 'storefactor':
                model.storeFactors.push(this._deserializeTypeValue(child, new models.TypeValueModel()));
                break;
            case 'displayfactor':
                model.displayFactors.push(this._deserializeTypeValue(child, new models.TypeValueModel()));
                break;
            case 'minimum':
                model.minimums.push(this._deserializeTypeValue(child, new models.TypeValueModel()));
                break;
            case 'maximum':
                model.maximums.push(this._deserializeTypeValue(child, new models.TypeValueModel()));
                break;
            case 'default':
                model.defaults.push(this._deserializeTypeValue(child, new models.TypeValueModel()));
                break;
            case 'quant':
                model.quants.push(this._deserializeTypeQuantValue(child, new models.TypeQuantValueModel()));
                break;
            case 'valuetext':
                model.valueTexts.push(this._deserializeTypeValueText(child, new models.TypeValueTextModel()));
                break;
            case 'unit':
                model.text = this._getStringValue(child);
                break;
            case 'selectorvalueref':
                model.selectorValueRef = this._getStringValue(child);
                break;
            case 'instance':
                model.instance = this._getStringValue(child);
                break;
            case 'override':
                // nop
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeValue(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'id':
                model.id = this._getStringValue(child);
                break;
            case 'idhash':
                model.idHash = this._getIntegerValue(child);
                break;
            case 'index':
                model.index = this._getIntegerValue(child);
                break;
            case 'storage':
                model.storage = this._getStringValue(child);
                break;
            case 'type':
                this._deserializeType(child, model.type);
                break;
            case 'priority':
                model.priority = this._getIntegerValue(child);
                break;
            case 'structvalueref':
                model.structValueRef = this._getStringValue(child);
                break;
            case 'forceuse':
                model.forceUse = this._getBooleanValue(child);
                break;
            case 'compoundvalueref':
                model.compoundValueRef = this._getStringValue(child);
                break;
            case 'valuetext':
                model.valueTexts.push(this._deserializeString(child, new models.StringModel()));
                break;
            case 'externaldescriptorfunc':
                model.externalDescriptorFunc = this._getBooleanValue(child);
                break;
            case 'enablevalueref':
                model.enableValueRef = this._getStringValue(child);
                break;
            case 'allowparameterization':
                model.allowParameterization = this._getBooleanValue(child);
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeConstraint(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'condition':
                model.condition = this._getStringValue(child);
                break;
            case 'leftvalueref':
                model.leftValueRef = this._getStringValue(child);
                break;
            case 'rightvalueref':
                model.rightValueRef = this._getStringValue(child);
                break;
            case 'relation':
                model.relation = this._getStringValue(child);
                break;
            case 'diff':
                model.diff = this._getStringValue(child);
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeMask(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'id':
                model.id = this._getStringValue(child);
                break;
            case 'visible':
                model.visible = this._getStringValue(child);
                break;
            case 'handler':
                model.handler = this._getStringValue(child);
                break;
            case 'decoration':
                model.decoration = this._getStringValue(child);
                break;
            case 'level':
                model.level = this._getStringValue(child);
                break;
            case 'indent':
                model.indent = this._getStringValue(child);
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeLine(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'id':
                model.id = this._getStringValue(child);
                break;
            case 'text':
                model.texts.push(this._deserializeText(child, new models.TextModel()));
                break;
            case 'textref':
                model.textRef = this._getStringValue(child);
                break;
            case 'valueref':
                model.valueRef = this._getStringValue(child);
                break;
            case 'extraref':
                model.extraRef = this._getStringValue(child);
                break;
            case 'mask':
                model.mask = this._getStringValue(child);
                break;
            case 'maskval':
                model.maskVal = this._getStringValue(child);
                break;
            case 'actiontype':
                model.actionType = this._getStringValue(child);
                break;
            case 'action':
                this._filterProperties(child, function(key, child) {
                    switch (key) {
                    case 'type':
                        model.actionType = this._getStringValue(child);
                        break;
                    case 'valueref':
                        model.actionValueRef = this._getStringValue(child);
                        break;
                    default:
                        this._reportUnexpectedProperty(parent, key);
                        break;
                    }
                });
                break;
            case 'actioninfo':
                model.actionInfo = this._getStringValue(child);
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeMenu(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'id':
                model.id = this._getStringValue(child);
                break;
            case 'type':
                model.type = this._getStringValue(child);
                break;
            case 'line':
                model.lines.push(this._deserializeLine(child, new models.LineModel()));
                break;
            case 'isbuiltin':
                model.isBuiltIn = this._getBooleanValue(child);
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    _deserializeMenuSystem(parent, model) {
        this._filterProperties(parent, function(key, child) {
            switch (key) {
            case 'language':
                model.languages.push(this._deserializeLanguage(child, new models.LanguageModel()));
                break;
            case 'translationgroup':
                model.translationGroups.push(this._deserializeTranslationGroup(child, new models.TranslationGroupModel()));
                break;
            case 'string':
                model.strings.push(this._deserializeString(child, new models.StringModel()));
                break;
            case 'type':
                model.types.push(this._deserializeType(child, new models.TypeModel()));
                break;
            case 'value':
                model.values.push(this._deserializeValue(child, new models.ValueModel()));
                break;
            case 'constraint':
                model.constraints.push(this._deserializeConstraint(child, new models.ConstraintModel()));
                break;
            case 'preset':
                model.presets.push(this._deserializePreset(child, new models.PresetModel()));
                break;
            case 'mask':
                model.masks.push(this._deserializeMask(child, new models.MaskModel()));
                break;
            case 'linestemplate':
                model.linesTemplates.push(this._deserializeLinesTemplate(child, new models.LinesTemplateModel()));
                break;
            case 'menu':
                model.menus.push(this._deserializeMenu(child, new models.MenuModel()));
                break;
            case 'implheader':
                model.implHeaders.push(this._getStringValue(child));
                break;
            case 'implinitializer':
                model.implInitializers.push(this._getStringValue(child));
                break;
            case 'languages':
            case 'translationgroups':
            case 'strings':
            case 'types':
            case 'values':
            case 'constraints':
            case 'presets':
            case 'masks':
            case 'linestemplates':
            case 'menus':
            case 'implheaders':
            case 'implinitializers':
                this._deserializeMenuSystem(child, model);
                break;
            case 'override':
            case 'vbusspecification':
                // nop
                break;
            default:
                this._reportUnexpectedProperty(parent, key);
                break;
            }
        });

        return model;
    }

    deserializeMenuSystem(root, model) {
        if (model === undefined) {
            model = new models.MenuSystemModel();
        }
        return this._deserializeMenuSystem(root.menuSystem, model);
    }

    _reportUnexpectedProperty(parent, key) {
        if (key !== null) {
            if (!_.has(this, 'errorMap')) {
                this.errorMap = {};
            }
            const errorKey = this.stack.join('::') + ' -> ' + key;
            if (!_.has(this.errorMap, errorKey)) {
                this.errorMap [errorKey] = true;
                console.log('--> ' + errorKey);
                // console.log(new Error().stack);
                // console.log(JSON.stringify(parent));

            }
        }
    }

}


module.exports = ConfigurationXmlDeserializer;
