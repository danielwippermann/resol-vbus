/*! resol-vbus | Copyright (c) 2013-present, Daniel Wippermann | MIT license */

var rawConfiguration = {
    "languages": [
        {
            "texts": [
                {
                    "text": "Deutsch",
                    "lang": "de"
                }
            ],
            "id": "de"
        },
        {
            "texts": [
                {
                    "text": "English",
                    "lang": "en"
                }
            ],
            "id": "en"
        },
        {
            "texts": [
                {
                    "text": "Italiano",
                    "lang": "it"
                }
            ],
            "id": "it"
        },
        {
            "texts": [
                {
                    "text": "Francais",
                    "lang": "fr"
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
                "maximums": "9",
                "defaults": "1"
            },
            "valueTexts": [],
            "id": "Schema",
            "idHash": 1222011281,
            "index": 1,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "0",
                "maximums": "2",
                "defaults": "1"
            },
            "valueTexts": [],
            "id": "Vorrang",
            "idHash": 1733041791,
            "index": 21
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "1",
                "maximums": "30",
                "defaults": "2"
            },
            "valueTexts": [],
            "id": "t_st",
            "idHash": 4276058,
            "index": 22
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
                "rootTypeId": "Number",
                "storeFactors": "0,01",
                "displayFactors": "0,01",
                "minimums": "0",
                "maximums": "99,99"
            },
            "valueTexts": [],
            "id": "Programmnummer",
            "idHash": 364897945,
            "index": 25
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "0,01",
                "displayFactors": "0,01",
                "minimums": "0",
                "maximums": "99,99",
                "defaults": "1.04"
            },
            "valueTexts": [],
            "id": "Versionsnummer",
            "idHash": 959361357,
            "index": 32
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
            "idHash": 1887930473,
            "index": 38
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
            "idHash": 1887930474,
            "index": 39
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
            "idHash": 692828871,
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
            "idHash": 692828872,
            "index": 49
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
            "id": "ORoehrenkollektor",
            "idHash": 1763255801,
            "index": 57
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
            "index": 58
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "0,0",
                "maximums": "90,0",
                "defaults": "5,0"
            },
            "valueTexts": [],
            "id": "dT3Min_ein",
            "idHash": 37845290,
            "index": 192
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "0,0",
                "maximums": "90,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "dT3Min_aus",
            "idHash": 37841335,
            "index": 193
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "0,0",
                "maximums": "95,0",
                "defaults": "60,0"
            },
            "valueTexts": [],
            "id": "dT3Max_ein",
            "idHash": 1884105004,
            "index": 194
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "0,0",
                "maximums": "95,0",
                "defaults": "58,0"
            },
            "valueTexts": [],
            "id": "dT3Max_aus",
            "idHash": 1884101049,
            "index": 195
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "6,0"
            },
            "valueTexts": [],
            "id": "dT1ein",
            "idHash": 1867547493,
            "index": 384,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "6,0"
            },
            "valueTexts": [],
            "id": "dT2ein",
            "idHash": 1867583430,
            "index": 385,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "6,0"
            },
            "valueTexts": [],
            "id": "dT3ein",
            "idHash": 1867619367,
            "index": 386,
            "externalDescriptorFunc": true
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
                "maximums": "19,5",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "dT1aus",
            "idHash": 1867543538,
            "index": 400
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
                "maximums": "19,5",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "dT2aus",
            "idHash": 1867579475,
            "index": 401
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
                "maximums": "19,5",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "dT3aus",
            "idHash": 1867615412,
            "index": 402
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "1,5",
                "maximums": "30,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "dT1soll",
            "idHash": 1500034819,
            "index": 408
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "1,5",
                "maximums": "30,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "dT2soll",
            "idHash": 1501220740,
            "index": 409
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "1,5",
                "maximums": "30,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "dT3soll",
            "idHash": 1502406661,
            "index": 410
        },
        {
            "type": {
                "quants": [
                    "1,0"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "1,0",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "2,0"
            },
            "valueTexts": [],
            "id": "dT1Anstieg",
            "idHash": 437440628,
            "index": 412
        },
        {
            "type": {
                "quants": [
                    "1,0"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "1,0",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "2,0"
            },
            "valueTexts": [],
            "id": "dT2Anstieg",
            "idHash": 106210645,
            "index": 413
        },
        {
            "type": {
                "quants": [
                    "1,0"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "1,0",
                "minimums": "1,0",
                "maximums": "20,0",
                "defaults": "2,0"
            },
            "valueTexts": [],
            "id": "dT3Anstieg",
            "idHash": 1922464310,
            "index": 414
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "1",
                "minimums": "4",
                "maximums": "95",
                "defaults": "60"
            },
            "valueTexts": [],
            "id": "TSp1Max",
            "idHash": 197068558,
            "index": 432
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "1",
                "minimums": "4",
                "maximums": "95",
                "defaults": "60"
            },
            "valueTexts": [],
            "id": "TSp2Max",
            "idHash": 197104495,
            "index": 433
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "1",
                "minimums": "110",
                "maximums": "200",
                "defaults": "140"
            },
            "valueTexts": [],
            "id": "TKol1Not",
            "idHash": 496292796,
            "index": 448,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "1",
                "minimums": "110",
                "maximums": "200",
                "defaults": "140"
            },
            "valueTexts": [],
            "id": "TKol2Not",
            "idHash": 496328733,
            "index": 449,
            "externalDescriptorFunc": true
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "1",
                "minimums": "100",
                "maximums": "190",
                "defaults": "120"
            },
            "valueTexts": [],
            "id": "TKol1Max",
            "idHash": 496291249,
            "index": 464
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "1",
                "minimums": "100",
                "maximums": "190",
                "defaults": "120"
            },
            "valueTexts": [],
            "id": "TKol2Max",
            "idHash": 496327186,
            "index": 465
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
            "index": 480
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
            "index": 481
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "10,0",
                "maximums": "90,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "TKol1Min",
            "idHash": 496291503,
            "index": 496
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "10,0",
                "maximums": "90,0",
                "defaults": "10,0"
            },
            "valueTexts": [],
            "id": "TKol2Min",
            "idHash": 496327440,
            "index": 497
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
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "-10,0",
                "maximums": "10,0",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "TKol1Frost",
            "idHash": 1435078105,
            "index": 528
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "-10,0",
                "maximums": "10,0",
                "defaults": "4,0"
            },
            "valueTexts": [],
            "id": "TKol2Frost",
            "idHash": 1474213498,
            "index": 529
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
                    "00:01"
                ],
                "rootTypeId": "Time",
                "storeFactors": "00:01",
                "displayFactors": "00:01",
                "minimums": "00:00",
                "maximums": "720",
                "defaults": "24"
            },
            "valueTexts": [],
            "id": "periodeDesinfektion",
            "idHash": 1343451819,
            "index": 2561
        },
        {
            "type": {
                "quants": [
                    "1"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "1",
                "minimums": "0",
                "maximums": "95",
                "defaults": "60"
            },
            "valueTexts": [],
            "id": "temperaturDesinfektion",
            "idHash": 1925586124,
            "index": 2562
        },
        {
            "type": {
                "quants": [
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
            "index": 2563
        },
        {
            "type": {
                "quants": [
                    "01:00"
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
            "index": 2564
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "0,0",
                "maximums": "95,0",
                "defaults": "40,0"
            },
            "valueTexts": [],
            "id": "TTh1ein",
            "idHash": 226742973,
            "index": 3584
        },
        {
            "type": {
                "quants": [
                    "0,5"
                ],
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "0,0",
                "maximums": "95,0",
                "defaults": "45,0"
            },
            "valueTexts": [],
            "id": "TTh1aus",
            "idHash": 226739018,
            "index": 3585
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
            "index": 3586
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
            "index": 3587
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
            "index": 3588
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
            "index": 3589
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
            "index": 3590
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
            "index": 3591
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
            "idHash": 2937485,
            "index": 3840
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "0,1",
                "displayFactors": "0,1",
                "minimums": "0,0",
                "maximums": "20,0",
                "defaults": "6,0"
            },
            "valueTexts": [],
            "id": "VolMax",
            "idHash": 1353765751,
            "index": 3844
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
            "idHash": 322874518,
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
            "idHash": 506476676,
            "index": 3847
        },
        {
            "type": {
                "rootTypeId": "Number",
                "storeFactors": "1",
                "displayFactors": "1",
                "minimums": "0",
                "maximums": "2"
            },
            "valueTexts": [],
            "id": "DebugRelais",
            "idHash": 1440413735,
            "index": 12545
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
            "id": "DebugLight",
            "idHash": 492198751,
            "index": 12546
        }
    ],
    "constraints": [],
    "presets": null,
    "masks": null,
    "linesTemplates": null,
    "menus": null,
    "implHeaders": null,
    "implInitializers": null
};



module.exports = rawConfiguration;
