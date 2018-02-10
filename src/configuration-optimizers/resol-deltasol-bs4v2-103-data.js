/*! resol-vbus | Copyright (c) 2013-2018, Daniel Wippermann | MIT license */
'use strict';



var rawConfiguration = {
    "languages": [
        {
            "texts": [
                {
                    "text": "Referenzsprache",
                    "lang": "ref"
                }
            ],
            "id": "ref"
        },
        {
            "texts": [
                {
                    "text": "Deutsch",
                    "lang": "all"
                }
            ],
            "id": "de"
        },
        {
            "texts": [
                {
                    "text": "English",
                    "lang": "all"
                }
            ],
            "id": "en"
        },
        {
            "texts": [
                {
                    "text": "Francais",
                    "lang": "all"
                }
            ],
            "id": "fr"
        }
    ],
    "translationGroups": null,
    "strings": null,
    "types": null,
    "values": [
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "1",
                "maximums": "3",
                "defaults": "1"
            },
            "valueTexts": [],
            "id": "Schema",
            "index": 1
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    },
                    {
                        "value": 2
                    },
                    {
                        "value": 3
                    },
                    {
                        "value": 4
                    },
                    {
                        "value": 5
                    },
                    {
                        "value": 6
                    }
                ],
                "rootTypeId": "Prio",
                "defaults": "5"
            },
            "valueTexts": [],
            "id": "Vorrang",
            "index": 21,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "0",
                "maximums": "30",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "t_st",
            "index": 22,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "1",
                "maximums": "30",
                "defaults": "15"
            },
            "valueTexts": [],
            "id": "t_umw",
            "index": 23
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "0,01",
                "displayFactors": "0,01",
                "minimums": "0",
                "maximums": "99,99",
                "defaults": "0,00"
            },
            "valueTexts": [],
            "id": "Versionsnummer",
            "index": 32
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    }
                ],
                "rootTypeId": "VtProductID"
            },
            "valueTexts": [],
            "id": "ProductID",
            "index": 39
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "0",
                "maximums": "9999",
                "defaults": "4"
            },
            "valueTexts": [],
            "id": "Variantenummer",
            "index": 41,
            "forceUse": true
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "0",
                "maximums": "255"
            },
            "valueTexts": [],
            "id": "UnitSensor",
            "index": 45,
            "forceUse": true
        },
        {
            "type": {
                "quants": [
                    "5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "30",
                "maximums": "100",
                "defaults": "30"
            },
            "valueTexts": [],
            "id": "MinDrehzahl1",
            "index": 48
        },
        {
            "type": {
                "quants": [
                    "5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "30",
                "maximums": "100",
                "defaults": "30"
            },
            "valueTexts": [],
            "id": "MinDrehzahl2",
            "index": 49
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dtSystemCoolOn",
            "index": 58,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1,0",
                "maximums": "30,0",
                "defaults": "20,0"
            },
            "valueTexts": [],
            "id": "dtSystemCoolOn_K",
            "index": 59,
            "compoundValueRef": "dtSystemCoolOn"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "2,0",
                "maximums": "60,0",
                "defaults": "40,0"
            },
            "valueTexts": [],
            "id": "dtSystemCoolOn_R",
            "index": 60,
            "compoundValueRef": "dtSystemCoolOn"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dtSystemCoolOff",
            "index": 61,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "0,5",
                "maximums": "29,5",
                "defaults": "15,0"
            },
            "valueTexts": [],
            "id": "dtSystemCoolOff_K",
            "index": 62,
            "compoundValueRef": "dtSystemCoolOff"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1,0",
                "maximums": "59,0",
                "defaults": "30,0"
            },
            "valueTexts": [],
            "id": "dtSystemCoolOff_R",
            "index": 63,
            "compoundValueRef": "dtSystemCoolOff"
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "OHolyCool",
            "index": 64
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "THolyCool",
            "index": 65,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "20,0",
                "maximums": "80,0",
                "defaults": "40,0"
            },
            "valueTexts": [],
            "id": "THolyCool_C",
            "index": 66,
            "compoundValueRef": "THolyCool"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "70,0",
                "maximums": "175,0",
                "defaults": "110,0"
            },
            "valueTexts": [],
            "id": "THolyCool_F",
            "index": 67,
            "compoundValueRef": "THolyCool"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dTSpread",
            "index": 68,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "1,0"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1",
                "minimums": "20,0",
                "maximums": "90,0",
                "defaults": "40,0"
            },
            "valueTexts": [],
            "id": "dTSpread_K",
            "index": 69,
            "compoundValueRef": "dTSpread"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1",
                "minimums": "40,0",
                "maximums": "160,0",
                "defaults": "70,0"
            },
            "valueTexts": [],
            "id": "dTSpread_R",
            "index": 70,
            "compoundValueRef": "dTSpread"
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "ORueckkuehlung",
            "index": 71
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT3Min_ein",
            "index": 192,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "0,0",
                "maximums": "90,0",
                "defaults": "5,0"
            },
            "valueTexts": [],
            "id": "dT3Min_ein_C",
            "index": 193,
            "compoundValueRef": "dT3Min_ein"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "30,0",
                "maximums": "190,0",
                "defaults": "40,0"
            },
            "valueTexts": [],
            "id": "dT3Min_ein_F",
            "index": 194,
            "compoundValueRef": "dT3Min_ein"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT3Min_aus",
            "index": 195,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "0,0",
                "maximums": "90,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "dT3Min_aus_C",
            "index": 196,
            "compoundValueRef": "dT3Min_aus"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "30,0",
                "maximums": "190,0",
                "defaults": "50,0"
            },
            "valueTexts": [],
            "id": "dT3Min_aus_F",
            "index": 197,
            "compoundValueRef": "dT3Min_aus"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT3Max_ein",
            "index": 198,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "0,0",
                "maximums": "95,0",
                "defaults": "60,0"
            },
            "valueTexts": [],
            "id": "dT3Max_ein_C",
            "index": 199,
            "compoundValueRef": "dT3Max_ein"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "30,0",
                "maximums": "200,0",
                "defaults": "140,0"
            },
            "valueTexts": [],
            "id": "dT3Max_ein_F",
            "index": 200,
            "compoundValueRef": "dT3Max_ein"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT3Max_aus",
            "index": 201,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "0,0",
                "maximums": "95,0",
                "defaults": "58,0"
            },
            "valueTexts": [],
            "id": "dT3Max_aus_C",
            "index": 202,
            "compoundValueRef": "dT3Max_aus"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "30,0",
                "maximums": "200,0",
                "defaults": "136,0"
            },
            "valueTexts": [],
            "id": "dT3Max_aus_F",
            "index": 203,
            "compoundValueRef": "dT3Max_aus"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "S1",
            "index": 256,
            "storage": "-3",
            "forceUse": true
        },
        {
            "type": {
                "quants": [
                    "0.1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-888.8",
                "maximums": "888.8"
            },
            "valueTexts": [],
            "id": "S1_C",
            "index": 257,
            "forceUse": true,
            "compoundValueRef": "S1"
        },
        {
            "type": {
                "quants": [
                    "0.1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-888.8",
                "maximums": "888.8"
            },
            "valueTexts": [],
            "id": "S1_F",
            "index": 258,
            "forceUse": true,
            "compoundValueRef": "S1"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "S2",
            "index": 259,
            "storage": "-3",
            "forceUse": true
        },
        {
            "type": {
                "quants": [
                    "0.1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-888.8",
                "maximums": "888.8"
            },
            "valueTexts": [],
            "id": "S2_C",
            "index": 260,
            "forceUse": true,
            "compoundValueRef": "S2"
        },
        {
            "type": {
                "quants": [
                    "0.1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-888.8",
                "maximums": "888.8"
            },
            "valueTexts": [],
            "id": "S2_F",
            "index": 261,
            "forceUse": true,
            "compoundValueRef": "S2"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "S3",
            "index": 262,
            "storage": "-3",
            "forceUse": true
        },
        {
            "type": {
                "quants": [
                    "0.1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-888.8",
                "maximums": "888.8"
            },
            "valueTexts": [],
            "id": "S3_C",
            "index": 263,
            "forceUse": true,
            "compoundValueRef": "S3"
        },
        {
            "type": {
                "quants": [
                    "0.1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-888.8",
                "maximums": "888.8"
            },
            "valueTexts": [],
            "id": "S3_F",
            "index": 264,
            "forceUse": true,
            "compoundValueRef": "S3"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "S4",
            "index": 265,
            "storage": "-3",
            "forceUse": true
        },
        {
            "type": {
                "quants": [
                    "0.1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-888.8",
                "maximums": "888.8"
            },
            "valueTexts": [],
            "id": "S4_C",
            "index": 266,
            "forceUse": true,
            "compoundValueRef": "S4"
        },
        {
            "type": {
                "quants": [
                    "0.1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-888.8",
                "maximums": "888.8"
            },
            "valueTexts": [],
            "id": "S4_F",
            "index": 267,
            "forceUse": true,
            "compoundValueRef": "S4"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT1ein",
            "index": 384,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "6,0"
            },
            "valueTexts": [],
            "id": "dT1ein_K",
            "index": 385,
            "compoundValueRef": "dT1ein"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "2,0",
                "maximums": "40,0",
                "defaults": "12,0"
            },
            "valueTexts": [],
            "id": "dT1ein_R",
            "index": 386,
            "compoundValueRef": "dT1ein"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT2ein",
            "index": 387,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "6,0"
            },
            "valueTexts": [],
            "id": "dT2ein_K",
            "index": 388,
            "compoundValueRef": "dT2ein"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "2,0",
                "maximums": "40,0",
                "defaults": "12,0"
            },
            "valueTexts": [],
            "id": "dT2ein_R",
            "index": 389,
            "compoundValueRef": "dT2ein"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT3ein",
            "index": 390,
            "storage": "-3",
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "6,0"
            },
            "valueTexts": [],
            "id": "dT3ein_K",
            "index": 391,
            "externalDescriptorFunc": true,
            "compoundValueRef": "dT3ein"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "2,0",
                "maximums": "40,0",
                "defaults": "12,0"
            },
            "valueTexts": [],
            "id": "dT3ein_R",
            "index": 392,
            "externalDescriptorFunc": true,
            "compoundValueRef": "dT3ein"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT1aus",
            "index": 400,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "0,5",
                "maximums": "19,5",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "dT1aus_K",
            "index": 401,
            "compoundValueRef": "dT1aus"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1",
                "maximums": "39",
                "defaults": "8,0"
            },
            "valueTexts": [],
            "id": "dT1aus_R",
            "index": 402,
            "compoundValueRef": "dT1aus"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT2aus",
            "index": 403,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "0,5",
                "maximums": "19,5",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "dT2aus_K",
            "index": 404,
            "compoundValueRef": "dT2aus"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1",
                "maximums": "39",
                "defaults": "8,0"
            },
            "valueTexts": [],
            "id": "dT2aus_R",
            "index": 405,
            "compoundValueRef": "dT2aus"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT3aus",
            "index": 406,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "0,5",
                "maximums": "19,5",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "dT3aus_K",
            "index": 407,
            "compoundValueRef": "dT3aus"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1",
                "maximums": "39",
                "defaults": "8,0"
            },
            "valueTexts": [],
            "id": "dT3aus_R",
            "index": 408,
            "compoundValueRef": "dT3aus"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT1soll",
            "index": 410,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1,5",
                "maximums": "30,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "dT1soll_K",
            "index": 411,
            "compoundValueRef": "dT1soll"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "3",
                "maximums": "60,0",
                "defaults": "20,0"
            },
            "valueTexts": [],
            "id": "dT1soll_R",
            "index": 412,
            "compoundValueRef": "dT1soll"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT2soll",
            "index": 413,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1,5",
                "maximums": "30,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "dT2soll_K",
            "index": 414,
            "compoundValueRef": "dT2soll"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "3",
                "maximums": "60,0",
                "defaults": "20,0"
            },
            "valueTexts": [],
            "id": "dT2soll_R",
            "index": 415,
            "compoundValueRef": "dT2soll"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT3soll",
            "index": 416,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1,5",
                "maximums": "30,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "dT3soll_K",
            "index": 417,
            "compoundValueRef": "dT3soll"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "3",
                "maximums": "60,0",
                "defaults": "20,0"
            },
            "valueTexts": [],
            "id": "dT3soll_R",
            "index": 418,
            "compoundValueRef": "dT3soll"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT1Anstieg",
            "index": 420,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "1,0"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "2,0"
            },
            "valueTexts": [],
            "id": "dT1Anstieg_K",
            "index": 421,
            "compoundValueRef": "dT1Anstieg"
        },
        {
            "type": {
                "quants": [
                    "2,0"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1",
                "minimums": "2,0",
                "maximums": "40,0",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "dT1Anstieg_R",
            "index": 422,
            "compoundValueRef": "dT1Anstieg"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT2Anstieg",
            "index": 423,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "1,0"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "2,0"
            },
            "valueTexts": [],
            "id": "dT2Anstieg_K",
            "index": 424,
            "compoundValueRef": "dT2Anstieg"
        },
        {
            "type": {
                "quants": [
                    "2,0"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1",
                "minimums": "2,0",
                "maximums": "40,0",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "dT2Anstieg_R",
            "index": 425,
            "compoundValueRef": "dT2Anstieg"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT3Anstieg",
            "index": 426,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "1,0"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "2,0"
            },
            "valueTexts": [],
            "id": "dT3Anstieg_K",
            "index": 427,
            "compoundValueRef": "dT3Anstieg"
        },
        {
            "type": {
                "quants": [
                    "2,0"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1",
                "minimums": "2,0",
                "maximums": "40,0",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "dT3Anstieg_R",
            "index": 428,
            "compoundValueRef": "dT3Anstieg"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TSp2Max",
            "index": 437,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "4",
                "maximums": "95",
                "defaults": "60"
            },
            "valueTexts": [],
            "id": "TSp2Max_C",
            "index": 438,
            "compoundValueRef": "TSp2Max"
        },
        {
            "type": {
                "quants": [
                    "2"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "40",
                "maximums": "200",
                "defaults": "140"
            },
            "valueTexts": [],
            "id": "TSp2Max_F",
            "index": 439,
            "compoundValueRef": "TSp2Max"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TSp1Max",
            "index": 443,
            "storage": "-3",
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "4",
                "maximums": "95",
                "defaults": "60"
            },
            "valueTexts": [],
            "id": "TSp1Max_C",
            "index": 444,
            "externalDescriptorFunc": true,
            "compoundValueRef": "TSp1Max"
        },
        {
            "type": {
                "quants": [
                    "2"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "40",
                "maximums": "200",
                "defaults": "140"
            },
            "valueTexts": [],
            "id": "TSp1Max_F",
            "index": 445,
            "externalDescriptorFunc": true,
            "compoundValueRef": "TSp1Max"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TKol1Not",
            "index": 447,
            "storage": "-3",
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "80",
                "maximums": "200",
                "defaults": "130"
            },
            "valueTexts": [],
            "id": "TKol1Not_C",
            "index": 448,
            "externalDescriptorFunc": true,
            "compoundValueRef": "TKol1Not"
        },
        {
            "type": {
                "quants": [
                    "2"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "170",
                "maximums": "390",
                "defaults": "270"
            },
            "valueTexts": [],
            "id": "TKol1Not_F",
            "index": 449,
            "externalDescriptorFunc": true,
            "compoundValueRef": "TKol1Not"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TKol2Not",
            "index": 450,
            "storage": "-3",
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "80",
                "maximums": "200",
                "defaults": "130"
            },
            "valueTexts": [],
            "id": "TKol2Not_C",
            "index": 451,
            "externalDescriptorFunc": true,
            "compoundValueRef": "TKol2Not"
        },
        {
            "type": {
                "quants": [
                    "2"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "170",
                "maximums": "390",
                "defaults": "270"
            },
            "valueTexts": [],
            "id": "TKol2Not_F",
            "index": 452,
            "externalDescriptorFunc": true,
            "compoundValueRef": "TKol2Not"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TKol1Max",
            "index": 454,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "70",
                "maximums": "160",
                "defaults": "110"
            },
            "valueTexts": [],
            "id": "TKol1Max_C",
            "index": 455,
            "compoundValueRef": "TKol1Max"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "150",
                "maximums": "320",
                "defaults": "230"
            },
            "valueTexts": [],
            "id": "TKol1Max_F",
            "index": 456,
            "compoundValueRef": "TKol1Max"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TKol2Max",
            "index": 457,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "70",
                "maximums": "160",
                "defaults": "110"
            },
            "valueTexts": [],
            "id": "TKol2Max_C",
            "index": 458,
            "compoundValueRef": "TKol2Max"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "150",
                "maximums": "320",
                "defaults": "230"
            },
            "valueTexts": [],
            "id": "TKol2Max_F",
            "index": 459,
            "compoundValueRef": "TKol2Max"
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "OKol1Max",
            "index": 461
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "OKol2Max",
            "index": 462
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TKol1Min",
            "index": 496,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "10,0",
                "maximums": "90,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "TKol1Min_C",
            "index": 497,
            "compoundValueRef": "TKol1Min"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "50",
                "maximums": "190",
                "defaults": "50"
            },
            "valueTexts": [],
            "id": "TKol1Min_F",
            "index": 498,
            "compoundValueRef": "TKol1Min"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TKol2Min",
            "index": 499,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "10,0",
                "maximums": "90,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "TKol2Min_C",
            "index": 500,
            "compoundValueRef": "TKol2Min"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "50",
                "maximums": "190",
                "defaults": "50"
            },
            "valueTexts": [],
            "id": "TKol2Min_F",
            "index": 501,
            "compoundValueRef": "TKol2Min"
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "OKol1Min",
            "index": 512
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "OKol2Min",
            "index": 513
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TKol1Frost",
            "index": 528,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-40,0",
                "maximums": "10,0",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "TKol1Frost_C",
            "index": 529,
            "compoundValueRef": "TKol1Frost"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-40",
                "maximums": "50",
                "defaults": "40"
            },
            "valueTexts": [],
            "id": "TKol1Frost_F",
            "index": 530,
            "compoundValueRef": "TKol1Frost"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TKol2Frost",
            "index": 531,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-40,0",
                "maximums": "10,0",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "TKol2Frost_C",
            "index": 532,
            "compoundValueRef": "TKol2Frost"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "-40",
                "maximums": "50",
                "defaults": "40"
            },
            "valueTexts": [],
            "id": "TKol2Frost_F",
            "index": 533,
            "compoundValueRef": "TKol2Frost"
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "OKol1Frost",
            "index": 544
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "OKol2Frost",
            "index": 545
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    },
                    {
                        "value": 2
                    }
                ],
                "rootTypeId": "Tristate",
                "defaults": "1"
            },
            "valueTexts": [],
            "id": "Handbetrieb1",
            "index": 552
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    },
                    {
                        "value": 2
                    }
                ],
                "rootTypeId": "Tristate",
                "defaults": "1"
            },
            "valueTexts": [],
            "id": "Handbetrieb2",
            "index": 553
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "OSNO",
            "index": 560
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "ODesinfektion",
            "index": 2560
        },
        {
            "type": {
                "quants": [
                    "24",
                    "1",
                    "0"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "720",
                "defaults": "00:24"
            },
            "valueTexts": [],
            "id": "periodeDesinfektion",
            "index": 2561
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "temperaturDesinfektion",
            "index": 2562,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "0,0",
                "maximums": "95,0",
                "defaults": "60,0"
            },
            "valueTexts": [],
            "id": "temperaturDesinfektion_C",
            "index": 2563,
            "compoundValueRef": "temperaturDesinfektion"
        },
        {
            "type": {
                "quants": [
                    "2"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "1.0",
                "minimums": "30,0",
                "maximums": "200,0",
                "defaults": "140,0"
            },
            "valueTexts": [],
            "id": "temperaturDesinfektion_F",
            "index": 2564,
            "compoundValueRef": "temperaturDesinfektion"
        },
        {
            "type": {
                "quants": [
                    "01:00",
                    "00:01"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "23:59",
                "defaults": "1:00"
            },
            "valueTexts": [],
            "id": "dauerTemperaturDesinfektion",
            "index": 2565
        },
        {
            "type": {
                "quants": [
                    "01:00",
                    "00:01"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "24:00",
                "defaults": "00:00"
            },
            "valueTexts": [],
            "id": "startDesinfektion",
            "index": 2566
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "OSystCol",
            "index": 2569
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "ODrainBack",
            "index": 2768
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "1",
                "maximums": "100",
                "defaults": "60"
            },
            "valueTexts": [],
            "id": "tdT_ein",
            "index": 2769
        },
        {
            "type": {
                "quants": [
                    "0.5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1.0",
                "maximums": "30.0",
                "defaults": "5.0"
            },
            "valueTexts": [],
            "id": "t_fuell",
            "index": 2771
        },
        {
            "type": {
                "quants": [
                    "0.5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "1.0",
                "maximums": "15.0",
                "defaults": "2.0"
            },
            "valueTexts": [],
            "id": "t_stab",
            "index": 2773
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "OBooster",
            "index": 2775,
            "forceUse": true
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TTh1ein",
            "index": 3584,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "0,0",
                "maximums": "95,0",
                "defaults": "40,0"
            },
            "valueTexts": [],
            "id": "TTh1ein_C",
            "index": 3585,
            "compoundValueRef": "TTh1ein"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "30,0",
                "maximums": "200,0",
                "defaults": "110,0"
            },
            "valueTexts": [],
            "id": "TTh1ein_F",
            "index": 3586,
            "compoundValueRef": "TTh1ein"
        },
        {
            "type": {
                "quants": [
                    "00:15"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "23:59"
            },
            "valueTexts": [],
            "id": "t1Th1ein",
            "index": 3587
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TTh1aus",
            "index": 3588,
            "storage": "-3"
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "0,0",
                "maximums": "95,0",
                "defaults": "45,0"
            },
            "valueTexts": [],
            "id": "TTh1aus_C",
            "index": 3589,
            "compoundValueRef": "TTh1aus"
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0.1",
                "displayFactors": "0.1",
                "minimums": "30,0",
                "maximums": "200,0",
                "defaults": "120,0"
            },
            "valueTexts": [],
            "id": "TTh1aus_F",
            "index": 3590,
            "compoundValueRef": "TTh1aus"
        },
        {
            "type": {
                "quants": [
                    "00:15"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "23:59"
            },
            "valueTexts": [],
            "id": "t1Th1aus",
            "index": 3592
        },
        {
            "type": {
                "quants": [
                    "00:15"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "23:59"
            },
            "valueTexts": [],
            "id": "t2Th1ein",
            "index": 3593
        },
        {
            "type": {
                "quants": [
                    "00:15"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "23:59"
            },
            "valueTexts": [],
            "id": "t2Th1aus",
            "index": 3594
        },
        {
            "type": {
                "quants": [
                    "00:15"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "23:59"
            },
            "valueTexts": [],
            "id": "t3Th1ein",
            "index": 3595
        },
        {
            "type": {
                "quants": [
                    "00:15"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "23:59"
            },
            "valueTexts": [],
            "id": "t3Th1aus",
            "index": 3596
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "OWmz",
            "index": 3840
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "0,5",
                "maximums": "100,0",
                "defaults": "6,0"
            },
            "valueTexts": [],
            "id": "VolMax",
            "index": 3845
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "0",
                "maximums": "3",
                "defaults": "1"
            },
            "valueTexts": [],
            "id": "Frostschutzart",
            "index": 3846
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "20",
                "maximums": "70",
                "defaults": "45"
            },
            "valueTexts": [],
            "id": "Frostschutzgehalt",
            "index": 3847
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "ORoehrenkollektor",
            "index": 3897
        },
        {
            "type": {
                "quants": [
                    "00:15"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "23:59",
                "defaults": "07:00"
            },
            "valueTexts": [],
            "id": "tRKstart",
            "index": 3904
        },
        {
            "type": {
                "quants": [
                    "00:15"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "23:59",
                "defaults": "19:00"
            },
            "valueTexts": [],
            "id": "tRKend",
            "index": 3905
        },
        {
            "type": {
                "quants": [
                    "5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "5",
                "maximums": "500",
                "defaults": "30"
            },
            "valueTexts": [],
            "id": "tRKrun",
            "index": 3906
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "1",
                "maximums": "60",
                "defaults": "30"
            },
            "valueTexts": [],
            "id": "tRKinterval",
            "index": 3907
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "OEeprom_Test",
            "index": 12547
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": "0"
                    },
                    {
                        "value": "1"
                    }
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "0",
                "maximums": "1",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "Save",
            "index": 12548
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "Pum1",
            "index": 12549
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0
                    },
                    {
                        "value": 1
                    }
                ],
                "rootTypeId": "State"
            },
            "valueTexts": [],
            "id": "Pum2",
            "index": 12550
        }
    ],
    "constraints": [
        {
            "condition": "TKol2Max_F < TKol2Not_F -20"
        },
        {
            "condition": "dT2ein_R < dT2soll_R"
        },
        {
            "condition": "TKol3Max_F < TKol3Not_F -20"
        },
        {
            "condition": "dT3ein_K > dT3aus_K"
        },
        {
            "condition": "dT1ein_K < dT1soll_K"
        },
        {
            "condition": "TKol2Max_C < TKol2Not_C -10"
        },
        {
            "condition": "TKol3Max_C < TKol3Not_C -10"
        },
        {
            "condition": "dT1ein_K > dT1aus_K"
        },
        {
            "condition": "dT2ein_K > dT2aus_K"
        },
        {
            "condition": "dT3Min_ein_R < dT3Min_aus_R"
        },
        {
            "condition": "dT3Max_ein_K > dT3Max_aus_K"
        },
        {
            "condition": "TKol1Max_F < TKol1Not_F -20"
        },
        {
            "condition": "dtSystemCoolOn_K > dtSystemCoolOff_K"
        },
        {
            "condition": "dtSystemCoolOn_R > dtSystemCoolOff_R"
        },
        {
            "condition": "dT2ein_K < dT2soll_K"
        },
        {
            "condition": "TTh1aus != TTh1ein"
        },
        {
            "condition": "dT2ein_R > dT2aus_R"
        },
        {
            "condition": "TTh1ein != TTh1aus"
        },
        {
            "condition": "dT3Min_ein_K < dT3Min_aus_K"
        },
        {
            "condition": "dT1ein_R < dT1soll_R"
        },
        {
            "condition": "TKol1Max_C < TKol1Not_C -10"
        },
        {
            "condition": "dT3Max_ein_R > dT3Max_aus_R"
        },
        {
            "condition": "dT1ein_R > dT1aus_R"
        },
        {
            "condition": "dT3Min_aus_K > dT3Min_ein_K"
        },
        {
            "condition": "dT3ein_K < dT3soll_K"
        },
        {
            "condition": "dT3ein_R < dT3soll_R"
        },
        {
            "condition": "dT3ein_R > dT3aus_R"
        },
        {
            "condition": "dT3Min_aus_R > dT3Min_aus_R"
        }
    ],
    "presets": null,
    "masks": null,
    "linesTemplates": null,
    "menus": null,
    "implHeaders": null,
    "implInitializers": null
}



module.exports = rawConfiguration;