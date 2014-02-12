/*! resol-vbus | Copyright (c) 2013-2014, Daniel Wippermann | MIT license */
'use strict';



var _ = require('lodash');



var unitCodesByUnitFamily = {
    'Energy': [ 'WattHours', 'KilowattHours', 'MegawattHours', 'Btus', 'KiloBtus', 'MegaBtus', 'GramsCO2Gas', 'KilogramsCO2Gas', 'TonsCO2Gas', 'GramsCO2Oil', 'KilogramsCO2Oil', 'TonsCO2Oil' ],
    'Pressure': [ 'Bars' ],
    'Temperature': [ 'DegreesCelsius', 'DegreesFahrenheit' ],
    'Time': [ 'Seconds', 'Minutes', 'Hours', 'Days' ],
    'VolumeFlow': [ 'LitersPerMinute', 'LitersPerHour', 'CubicMetersPerHour', 'GallonsPerMinute', 'GallonsPerHour' ],
};


var unitsByUnitCode = {
    'Bars': [ ' bar', ' Bar' ],
    'Btus': [ ' BTU', ' Btu' ],
    'CubicMeters': [ ' m³' ],
    'CubicMetersPerHour': [ ' m³/h', ' qm/h' ],
    'Days': [ ' d' ],
    'DegreesAngular': [ ' °' ],
    'DegreesCelsius': [ ' °C' ],
    'DegreesFahrenheit': [ ' °F' ],
    'DegreesKelvin': [ ' K' ],
    'GallonsPerHour': [ ' gal/h' ],
    'GallonsPerMinute': [ ' gal/min' ],
    'GramsCO2Gas': [ ' g CO₂ (Gas)' ],
    'GramsCO2Oil': [ ' g CO₂ (Oil)' ],
    'Hectopascals': [ ' hPa' ],
    'Hertz': [ ' Hz' ],
    'Hours': [ ' h' ],
    'KiloBtus': [ ' MBTU' ],
    'KilogramsCO2Gas': [ ' kg CO₂ (Gas)' ],
    'KilogramsCO2Oil': [ ' kg CO₂ (Oil)' ],
    'KilogramsPerCubicMeter': [ ' kg/m³' ],
    'KilogramsPerHour': [ ' kg/h' ],
    'KilowattHours': [ ' kWh' ],
    'KiloWattHoursPerSquareMeterPerDay': [ ' kWh/(m²*d)' ],
    'Kilowatts': [ ' kW', 'kW' ],
    'Liters': [ ' l', ' L' ],
    'LitersPerHour': [' l/h' ],
    'LitersPerMinute': [ ' l/min' ],
    'LitersPerSquareMeterPerDay': [ ' l/(m²*d)' ],
    'MegaBtus': [ ' MMBTU' ],
    'MegawattHours': [ ' MWh' ],
    'MetersPerSecond': [ ' m/s' ],
    'Milliamperes': [ ' mA' ],
    'Milliseconds': [ ' ms' ],
    'Minutes': [ ' min', ' Min.' ],
    'None': [ '', ' ', null ],
    'Ohms': [ ' Ω', ' Ohm' ],
    'Percent': [ '%', ' %' ],
    'Seconds': [ ' s', ' sec' ],
    'SquareMeters': [ ' m²' ],
    'TonsCO2Gas': [ ' t CO₂ (Gas)' ],
    'TonsCO2Oil': [ ' t CO₂ (Oil)' ],
    'Volts': [ ' V' ],
    'WattHours': [ ' Wh' ],
    'Watts': [ ' W' ],
    'WattsPerSquareMeter': [ ' W/m²', ' W/qm' ],
};


var textChanges = {
    'Drehzahl Relais 1.1 ': 'Drehzahl Relais 1.1',
    'Drehzahl Relais 1.2 ': 'Drehzahl Relais 1.2',
    'Drehzahl Relais 2.1 ': 'Drehzahl Relais 2.1',
    'Drehzahl Relais 2.2 ': 'Drehzahl Relais 2.2',
    'Drehzahl Relais 3.1 ': 'Drehzahl Relais 3.1',
    'Drehzahl Relais 3.2 ': 'Drehzahl Relais 3.2',
    'Drehzahl Relais 4.1 ': 'Drehzahl Relais 4.1',
    'Drehzahl Relais 4.2 ': 'Drehzahl Relais 4.2',
    'Drehzahl Relais 5.1 ': 'Drehzahl Relais 5.1',
    'Drehzahl Relais 5.2 ': 'Drehzahl Relais 5.2',
    'Extern Reglerfreigabe': 'Externe Reglerfreigabe',
    'Füllung': 'Befüllung',
    'Manualbetrieb 1': 'Handbetrieb 1',
    'Manualbetrieb 2': 'Handbetrieb 2',
    'P1 ': 'P1',
    'P2 ': 'P2',
    'Pumpen Relais:': 'Pumpenrelais:',
    'SV Version': 'SW-Version',
    'Sensor-Benutzt-Maske #1': 'Sensorbenutzungs-Maske #1',
    'Sensor-Benutzt-Maske #2': 'Sensorbenutzungs-Maske #2',
    'Sensorbenutzungsmaske': 'Sensorbenutzungs-Maske',
    'Sensorbruchmaske': 'Sensorbruch-Maske',
    'Sensorbruchnummer': 'Sensorbruch-Nummer',
    'Sensordefektmaske': 'Sensordefekt-Maske',
    'Sensorkurzschlussmaske': 'Sensorkurzschluss-Maske',
    'Sensorkurzschlussnummer': 'Sensorkurzschluss-Nummer',
    'Speicher Leer': 'Speicher leer',
    'Speicher Maximaltemperatur': 'Speichermaximaltemperatur',
    'Speicher Nottemperatur': 'Speichernottemperatur',
    'Warmwasser Solltemperatur': 'Warmwassersolltemperatur',
    'ΔT Kolektor-Speicher': 'ΔT Kollektor-Speicher'
};


var forEachUnitCode = function(iterator) {
    _.forEach(_.keys(unitsByUnitCode).sort(), iterator);
};


var getUnitCodeByUnit = function(unit) {
    var unitCode = _.findKey(unitsByUnitCode, function(units) {
        return _.contains(units, unit);
    });
    if (!unitCode) {
        throw new Error('Unknown unit ' + JSON.stringify(unit));
    }
    return unitCode;
};


var getUnitByUnitCode = function(unitCode) {
    var units = unitsByUnitCode [unitCode];
    if (!units) {
        throw new Error('Unknown unit code ' + JSON.stringify(unitCode));
    }
    return units [0];
};


var getUnitFamilyByUnitCode = function(unitCode) {
    var unitFamily = _.findKey(unitCodesByUnitFamily, function(unitCodes) {
        return _.contains(unitCodes, unitCode);
    });
    return unitFamily;
};


var getRefText = function(texts) {
    var result = null;
    _.forEach(texts, function(text) {
        if (text.lang === 'ref') {
            result = text.text;
        }
        return (result === null);
    });
    if (result === null) {
        throw new Error('No ref text found for ' + JSON.stringify(texts));
    }
    if (_.has(textChanges, result)) {
        result = textChanges [result];
    }
    return result;
};



module.exports = {

    forEachUnitCode: forEachUnitCode,
    getUnitCodeByUnit: getUnitCodeByUnit,
    getUnitByUnitCode: getUnitByUnitCode,
    getUnitFamilyByUnitCode: getUnitFamilyByUnitCode,
    getRefText: getRefText,

};
