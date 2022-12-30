/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

var rawConfiguration = {
    "languages": [
        {
            "texts": [
                {
                    "text": "Referenzsprache",
                    "lang": "ref"
                }
            ],
            "id": "ref",
            "partial": false
        },
        {
            "texts": [
                {
                    "text": "Deutsch",
                    "lang": "all"
                }
            ],
            "id": "de",
            "partial": false
        },
        {
            "texts": [
                {
                    "text": "English",
                    "lang": "all"
                }
            ],
            "id": "en",
            "partial": false
        },
        {
            "texts": [
                {
                    "text": "Francais",
                    "lang": "all"
                }
            ],
            "id": "fr",
            "partial": false
        },
        {
            "texts": [
                {
                    "text": "Italiano",
                    "lang": "all"
                }
            ],
            "id": "it",
            "partial": false
        },
        {
            "texts": [
                {
                    "text": "Espagnol",
                    "lang": "all"
                }
            ],
            "id": "es",
            "partial": false
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
                "maximums": "10",
                "defaults": "1"
            },
            "valueTexts": [],
            "id": "Schema",
            "idHash": 1222011281,
            "index": 1,
            "priority": 10,
            "externalDescriptorFunc": true
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
                "rootTypeId": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TemperatureSelector",
            "idHash": 335728719,
            "index": 10,
            "storage": "persistent",
            "allowParameterization": true
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
            "idHash": 1733041791,
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
            "idHash": 4276058,
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
            "idHash": 141111980,
            "index": 23
        },
        {
            "type": {
                "quants": [
                    "5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "10",
                "maximums": "100",
                "defaults": "30"
            },
            "valueTexts": [],
            "id": "MinDrehzahl1",
            "idHash": 692828871,
            "index": 48,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "10",
                "maximums": "100",
                "defaults": "30"
            },
            "valueTexts": [],
            "id": "MinDrehzahl2",
            "idHash": 692828872,
            "index": 49,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "10",
                "maximums": "100",
                "defaults": "100"
            },
            "valueTexts": [],
            "id": "MaxDrehzahl1",
            "idHash": 651148297,
            "index": 50,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "10",
                "maximums": "100",
                "defaults": "100"
            },
            "valueTexts": [],
            "id": "MaxDrehzahl2",
            "idHash": 651148298,
            "index": 51,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dtSystemCoolOn",
            "idHash": 1038613223,
            "index": 58,
            "storage": "abstract"
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
            "idHash": 1473404209,
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
            "idHash": 1473404216,
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
            "idHash": 2061981477,
            "index": 61,
            "storage": "abstract"
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
            "idHash": 1377419503,
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
            "idHash": 1377419510,
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
            "idHash": 1242329976,
            "index": 64
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "THolyCool",
            "idHash": 276473981,
            "index": 65,
            "storage": "abstract"
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
            "idHash": 432457791,
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
            "idHash": 432457794,
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
            "idHash": 1436170647,
            "index": 68,
            "storage": "abstract"
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
            "idHash": 621742049,
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
            "idHash": 621742056,
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
            "idHash": 1396396684,
            "index": 71
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0,
                        "id": "Off"
                    },
                    {
                        "value": 1,
                        "id": "1to12"
                    },
                    {
                        "value": 2,
                        "id": "2to40"
                    },
                    {
                        "value": 3,
                        "id": "2to40fast"
                    }
                ],
                "rootTypeId": "SensorGrundfosDigital_Vt{0}_FlowRange",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "Sensor_Regler_GdS1_FlowRange",
            "idHash": 1838702956,
            "index": 74,
            "structValueRef": "Sensor_Regler_GdS1"
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
            "id": "Wmz1_Aktiviert",
            "idHash": 2062559073,
            "index": 81,
            "structValueRef": "Wmz1"
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": "0",
                        "id": "OFF"
                    },
                    {
                        "value": "1",
                        "id": "Vorlauf"
                    },
                    {
                        "value": "2",
                        "id": "Ruecklauf"
                    }
                ],
                "rootTypeId": "WmzX_Struct_Vt{0}_VolumenstromSensor",
                "defaults": "2"
            },
            "valueTexts": [],
            "id": "Wmz1_VolumenstromSensor",
            "idHash": 1352777507,
            "index": 85,
            "externalDescriptorFunc": true,
            "structValueRef": "Wmz1"
        },
        {
            "type": {
                "quants": [
                    "0.5"
                ],
                "valueTexts": [
                    {
                        "value": "-99.9"
                    }
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "0.5",
                "maximums": "100,0",
                "defaults": "6.0"
            },
            "valueTexts": [],
            "id": "Wmz1_VolumenstromMax",
            "idHash": 830890895,
            "index": 89,
            "structValueRef": "Wmz1"
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
            "id": "Wmz1_Frostschutzart",
            "idHash": 1986503652,
            "index": 90,
            "structValueRef": "Wmz1"
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
            "id": "Wmz1_Frostschutzgehalt",
            "idHash": 401904914,
            "index": 91,
            "structValueRef": "Wmz1"
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT3Min_ein",
            "idHash": 37845290,
            "index": 192,
            "storage": "abstract"
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
            "idHash": 411334700,
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
            "idHash": 411334703,
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
            "idHash": 37841335,
            "index": 195,
            "storage": "abstract"
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
            "idHash": 407027705,
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
            "idHash": 407027708,
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
            "idHash": 1884105004,
            "index": 198,
            "storage": "abstract"
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
            "idHash": 943468718,
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
            "idHash": 943468721,
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
            "idHash": 1884101049,
            "index": 201,
            "storage": "abstract"
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
            "idHash": 939161723,
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
            "idHash": 939161726,
            "index": 203,
            "compoundValueRef": "dT3Max_aus"
        },
        {
            "type": {
                "rootTypeId": "HysteresisProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "dT1ein",
            "idHash": 1867547493,
            "index": 384,
            "storage": "abstract"
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
            "idHash": 92208431,
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
            "idHash": 92208438,
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
            "idHash": 1867583430,
            "index": 387,
            "storage": "abstract"
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
            "idHash": 131343824,
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
            "idHash": 131343831,
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
            "idHash": 1867619367,
            "index": 390,
            "storage": "abstract",
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
            "idHash": 170479217,
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
            "idHash": 170479224,
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
            "idHash": 1867543538,
            "index": 400,
            "storage": "abstract"
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
            "idHash": 87901436,
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
            "idHash": 87901443,
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
            "idHash": 1867579475,
            "index": 403,
            "storage": "abstract"
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
            "idHash": 127036829,
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
            "idHash": 127036836,
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
            "idHash": 1867615412,
            "index": 406,
            "storage": "abstract"
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
            "idHash": 166172222,
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
            "idHash": 166172229,
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
            "idHash": 1500034819,
            "index": 410,
            "storage": "abstract"
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
            "idHash": 1450348621,
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
            "idHash": 1450348628,
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
            "idHash": 1501220740,
            "index": 413,
            "storage": "abstract"
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
            "idHash": 594332942,
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
            "idHash": 594332949,
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
            "idHash": 1502406661,
            "index": 416,
            "storage": "abstract"
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
            "idHash": 1885800911,
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
            "idHash": 1885800918,
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
            "idHash": 437440628,
            "index": 420,
            "storage": "abstract"
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
            "idHash": 1778960894,
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
            "idHash": 1778960901,
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
            "idHash": 106210645,
            "index": 423,
            "storage": "abstract"
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
            "idHash": 1846762271,
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
            "idHash": 1846762278,
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
            "idHash": 1922464310,
            "index": 426,
            "storage": "abstract"
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
            "idHash": 1914563648,
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
            "idHash": 1914563655,
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
            "idHash": 197104495,
            "index": 437,
            "storage": "abstract"
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
            "idHash": 2045917105,
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
            "idHash": 2045917108,
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
            "idHash": 197068558,
            "index": 443,
            "storage": "abstract",
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
            "idHash": 2006781712,
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
            "idHash": 2006781715,
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
            "idHash": 496292796,
            "index": 447,
            "storage": "abstract",
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
            "idHash": 1444462398,
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
            "idHash": 1444462401,
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
            "idHash": 496328733,
            "index": 450,
            "storage": "abstract",
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
            "idHash": 1483597791,
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
            "idHash": 1483597794,
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
            "idHash": 496291249,
            "index": 454,
            "storage": "abstract"
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
            "idHash": 1442777715,
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
            "idHash": 1442777718,
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
            "idHash": 496327186,
            "index": 457,
            "storage": "abstract"
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
            "idHash": 1481913108,
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
            "idHash": 1481913111,
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
            "idHash": 4957516,
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
            "idHash": 4993453,
            "index": 462
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TKol1Min",
            "idHash": 496291503,
            "index": 496,
            "storage": "abstract"
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
            "idHash": 1443054321,
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
            "idHash": 1443054324,
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
            "idHash": 496327440,
            "index": 499,
            "storage": "abstract"
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
            "idHash": 1482189714,
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
            "idHash": 1482189717,
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
            "idHash": 4957770,
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
            "idHash": 4993707,
            "index": 513
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TKol1Frost",
            "idHash": 1435078105,
            "index": 528,
            "storage": "abstract"
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
            "idHash": 1579447451,
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
            "idHash": 1579447454,
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
            "idHash": 1474213498,
            "index": 531,
            "storage": "abstract"
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
            "idHash": 1248217468,
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
            "idHash": 1248217471,
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
            "idHash": 1096071220,
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
            "idHash": 1135206613,
            "index": 545
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0,
                        "id": "Off"
                    },
                    {
                        "value": 1,
                        "id": "Auto"
                    },
                    {
                        "value": 2,
                        "id": "On"
                    }
                ],
                "rootTypeId": "Tristate",
                "defaults": "1"
            },
            "valueTexts": [],
            "id": "Handbetrieb1",
            "idHash": 1887930473,
            "index": 552
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": 0,
                        "id": "Off"
                    },
                    {
                        "value": 1,
                        "id": "Auto"
                    },
                    {
                        "value": 2,
                        "id": "On"
                    }
                ],
                "rootTypeId": "Tristate",
                "defaults": "1"
            },
            "valueTexts": [],
            "id": "Handbetrieb2",
            "idHash": 1887930474,
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
            "idHash": 2932063,
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
            "idHash": 1472079570,
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
            "idHash": 1343451819,
            "index": 2561
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "temperaturDesinfektion",
            "idHash": 1925586124,
            "index": 2562,
            "storage": "abstract"
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
            "idHash": 1019251790,
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
            "idHash": 1019251793,
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
            "idHash": 97142205,
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
            "idHash": 286946993,
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
            "idHash": 1335744,
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
            "idHash": 223128334,
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
            "idHash": 1355629639,
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
            "idHash": 1182089963,
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
            "idHash": 361663165,
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
            "idHash": 1272619885,
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
            "idHash": 226742973,
            "index": 3584,
            "storage": "abstract"
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
            "idHash": 2109964927,
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
            "idHash": 2109964930,
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
            "idHash": 354548302,
            "index": 3587
        },
        {
            "type": {
                "rootTypeId": "TemperatureProxy",
                "selectorValueRef": "TemperatureSelector"
            },
            "valueTexts": [],
            "id": "TTh1aus",
            "idHash": 226739018,
            "index": 3588,
            "storage": "abstract"
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
            "idHash": 2105657932,
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
            "idHash": 2105657935,
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
            "idHash": 354544347,
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
            "idHash": 1646016271,
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
            "idHash": 1646012316,
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
            "idHash": 790000592,
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
            "idHash": 789996637,
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
            "id": "ORoehrenkollektor",
            "idHash": 1763255801,
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
            "idHash": 1834032287,
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
            "idHash": 344792808,
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
            "idHash": 344807206,
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
            "idHash": 1784331894,
            "index": 3907
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": "0",
                        "id": "OnOff"
                    },
                    {
                        "value": "1",
                        "id": "Puls"
                    },
                    {
                        "value": "2",
                        "id": "PwmSolar"
                    },
                    {
                        "value": "3",
                        "id": "PwmHeizung"
                    }
                ],
                "rootTypeId": "VtPum{}",
                "defaults": "2"
            },
            "valueTexts": [],
            "id": "Pum1",
            "idHash": 3006019,
            "index": 12549
        },
        {
            "type": {
                "valueTexts": [
                    {
                        "value": "0",
                        "id": "OnOff"
                    },
                    {
                        "value": "1",
                        "id": "Puls"
                    },
                    {
                        "value": "2",
                        "id": "PwmSolar"
                    },
                    {
                        "value": "3",
                        "id": "PwmHeizung"
                    }
                ],
                "rootTypeId": "VtPum{}",
                "defaults": "0"
            },
            "valueTexts": [],
            "id": "Pum2",
            "idHash": 3006020,
            "index": 12550
        }
    ],
    "constraints": [
        {
            "condition": "dT1ein_R > dT1aus_R"
        },
        {
            "condition": "dT3ein_K < dT3soll_K"
        },
        {
            "condition": "dT3Min_ein_K < dT3Min_aus_K"
        },
        {
            "condition": "dT2ein_K > dT2aus_K"
        },
        {
            "condition": "dtSystemCoolOn_K > dtSystemCoolOff_K"
        },
        {
            "condition": "dT3Max_ein_R > dT3Max_aus_R"
        },
        {
            "condition": "dT3Min_ein_R < dT3Min_aus_R"
        },
        {
            "condition": "TKol1Max_C < TKol1Not_C -10"
        },
        {
            "condition": "dT3Min_aus_K > dT3Min_ein_K"
        },
        {
            "condition": "dT1ein_K < dT1soll_K"
        },
        {
            "condition": "dT3ein_K > dT3aus_K"
        },
        {
            "condition": "dT3Min_aus_R > dT3Min_aus_R"
        },
        {
            "condition": "dT3ein_R > dT3aus_R"
        },
        {
            "condition": "dT2ein_R < dT2soll_R"
        },
        {
            "condition": "dtSystemCoolOn_R > dtSystemCoolOff_R"
        },
        {
            "condition": "dT1ein_K > dT1aus_K"
        },
        {
            "condition": "dT3ein_R < dT3soll_R"
        },
        {
            "condition": "TTh1aus != TTh1ein"
        },
        {
            "condition": "dT3Max_ein_K > dT3Max_aus_K"
        },
        {
            "condition": "TTh1ein != TTh1aus"
        },
        {
            "condition": "MaxDrehzahl2 > MinDrehzahl2 + 0"
        },
        {
            "condition": "TKol2Max_F < TKol2Not_F -20"
        },
        {
            "condition": "TKol3Max_F < TKol3Not_F -20"
        },
        {
            "condition": "MaxDrehzahl1 > MinDrehzahl1 + 0"
        },
        {
            "condition": "TKol1Max_F < TKol1Not_F -20"
        },
        {
            "condition": "TKol2Max_C < TKol2Not_C -10"
        },
        {
            "condition": "dT2ein_R > dT2aus_R"
        },
        {
            "condition": "dT2ein_K < dT2soll_K"
        },
        {
            "condition": "dT1ein_R < dT1soll_R"
        },
        {
            "condition": "TKol3Max_C < TKol3Not_C -10"
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
