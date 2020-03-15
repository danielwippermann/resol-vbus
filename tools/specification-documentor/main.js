const { sprintf } = require('sprintf-js');


const vbus = require('../..');



const language = 'de';


function flatten(...values) {
    function flattenReducer(memo, arg) {
        if (Array.isArray(arg)) {
            memo = arg.reduce(flattenReducer, memo);
        } else {
            memo.push(arg);
        }
        return memo;
    }

    return flattenReducer([], values);
}


function escapeString(input) {
    return (input || '').replace(/([()[\]])/g, '\\$1');
}


function generateDeviceName(specFile, selfAddress, selfMask, anyName) {
    const specData = specFile.specificationData;

    const invMask = ((~selfMask) & 0x7F7F);
    const startAddress = selfAddress & selfMask;
    const endAddress = startAddress | invMask;

    let device = null, address = startAddress;
    while (address <= endAddress) {
        device = specData.getDeviceSpecification(address, 0);
        if (device) {
            break;
        }
        address += 1;
    }

    let name = (device && device.name) || 'Unknown device';
    name = name.replace(/\s*#\d+\b/, '');
    name = escapeString(name);

    if (selfMask === 0xFFFF) {
        name += sprintf(' (0x%04X)', selfAddress);
    } else if (selfMask === 0x0000) {
        name = anyName;
    } else {
        name += sprintf(' (0x%04X - 0x%04X)', address, endAddress);
    }

    return name;
}


function generatePacketTitle(specFile, packet) {
    const destinationName = generateDeviceName(specFile, packet.destinationAddress, packet.destinationMask, 'Any destination');
    const sourceName = generateDeviceName(specFile, packet.sourceAddress, packet.sourceMask, 'any source');

    return sprintf('%s <= %s, command 0x%04X', destinationName, sourceName, packet.command);
}


async function generatePacketStructureMarkdown(vsfFilename) {
    let specFile;
    if (vsfFilename) {
        specFile = await vbus.SpecificationFile.loadFromFile(vsfFilename);
    } else {
        specFile = vbus.SpecificationFile.getDefaultSpecificationFile();
    }

    const specData = specFile.specificationData;

    const lines = [];

    lines.push([
        '---',
        'layout: docs',
        'title: VBus Packets',
        '---',
        '',
        '',
        '',
        '## Table of Contents',
        '',
    ]);

    specFile.packetTemplates.forEach(packet => {
        const packetSpec = specData.getPacketSpecification(packet.destinationAddress, packet.sourceAddress, packet.command);
        const title = generatePacketTitle(specFile, packet);

        lines.push(sprintf('- [%s](#%s)', title, packetSpec.packetId));
    });

    lines.push([
        '',
        '',
        '',
        '## Known device addresses',
        '',
        '| Address | Mask | Name |',
        '|:-:|:-:|:--|',
    ]);

    specFile.deviceTemplates.forEach(device => {
        const deviceSpec = specData.getDeviceSpecification(device.selfAddress, 0);
        lines.push(sprintf('| 0x%04X | %s |', device.selfAddress, escapeString(deviceSpec.name)));
    });

    lines.push([
        '',
        '',
        '',
        '## Known packets (VBus Protocol Version 1.0)',
        '',
    ]);

    specFile.packetTemplates.forEach(packet => {
        const packetSpec = specData.getPacketSpecification(packet.destinationAddress, packet.sourceAddress, packet.command);

        const title = generatePacketTitle(specFile, packet);

        const fields = packetSpec.packetFields.reduce((memo, field) => {
            return field.parts.reduce((memo, part) => {
                memo.push(Object.assign({}, field, part, {
                    field,
                    part,
                    fieldFactor: field.factor,
                    partFactor: part.factor,
                    fieldPartFactor: field.factor * part.factor,
                }));
                return memo;
            }, memo);
        }, []).sort((l, r) => {
            let result = l.offset - r.offset;
            if (result === 0) {
                result = l.mask - r.mask;
            }
            return result;
        });

        lines.push([
            sprintf('### <a name="%s"></a>%s', packetSpec.packetId, title),
            '',
            '| Offset | Mask | Name | Factor | Unit |',
            '|:-:|:-:|:--|:-:|:-:|',
        ]);

        fields.forEach((field) => {
            const mask = (field.mask !== 0xFF) ? sprintf('0x%02X', field.mask) : '';

            const factorText = sprintf('%.' + field.type.precision + 'f', field.fieldPartFactor);

            const unitText = field.type && field.type.unit && field.type.unit.unitText;

            lines.push(sprintf('| %d | %s | %s | %s | %s |', field.offset, mask, escapeString(field.name [language]), factorText, escapeString(unitText)));
        });

        lines.push([
            '',
            '',
            '',
        ]);
    });

    lines.push([
        `> Based on VSF dated ${specFile.datecode}`,
        '',
    ]);

    return flatten([ lines ]).join('\n');
}


async function generatePacketFieldListMarkdown(vsfFilename) {
    let specFile;
    if (vsfFilename) {
        specFile = await vbus.SpecificationFile.loadFromFile(vsfFilename);
    } else {
        specFile = vbus.SpecificationFile.getDefaultSpecificationFile();
    }
    const specData = specFile.specificationData;

    const lines = [];

    lines.push([
        '---',
        'layout: docs',
        'title: VBus Packets',
        '---',
        '',
        '',
        '',
        '## Table of Contents',
        '',
    ]);

    specFile.packetTemplates.forEach(packet => {
        const packetSpec = specData.getPacketSpecification(packet.destinationAddress, packet.sourceAddress, packet.command);
        const title = generatePacketTitle(specFile, packet);

        lines.push(sprintf('- [%s](#%s)', title, packetSpec.packetId));
    });

    lines.push([
        '',
        '',
        '',
        '## Known device addresses',
        '',
        '| Address | Name |',
        '|:-:|:-:|:--|',
    ]);

    specFile.deviceTemplates.forEach(device => {
        const deviceSpec = specData.getDeviceSpecification(device.selfAddress, 0);
        lines.push(sprintf('| 0x%04X | %s |', device.selfAddress, escapeString(deviceSpec.name)));
    });

    lines.push([
        '',
        '',
        '',
        '## Known packets (VBus Protocol Version 1.0)',
        '',
    ]);

    specFile.packetTemplates.forEach(packet => {
        const packetSpec = specData.getPacketSpecification(packet.destinationAddress, packet.sourceAddress, packet.command);

        const title = generatePacketTitle(specFile, packet);

        // var fields = packetSpec.packetFields.reduce(function(memo, field) {
        //     return field.parts.reduce(function(memo, part) {
        //         memo.push(Object.assign({}, field, part, {
        //             field,
        //             part,
        //             fieldFactor: field.factor,
        //             partFactor: part.factor,
        //             fieldPartFactor: field.factor * part.factor,
        //         }));
        //         return memo;
        //     }, memo);
        // }, []).sort(function(l, r) {
        //     var result = l.offset - r.offset;
        //     if (result === 0) {
        //         result = l.mask - r.mask;
        //     }
        //     return result;
        // });

        lines.push([
            sprintf('### <a name="%s"></a>%s', packetSpec.packetId, title),
            '',
            '| ID | Name | Factor | Unit |',
            '|:--|:--|:-:|:-:|',
        ]);

        packetSpec.packetFields.forEach((field) => {
            const factorText = sprintf('%.' + field.type.precision + 'f', field.factor);

            const unitText = field.type && field.type.unit && field.type.unit.unitText;

            lines.push(sprintf('| %s| %s | %s | %s |', escapeString(`00_${packetSpec.packetId.slice(0, 9)}_10_${packetSpec.packetId.slice(10)}_${field.fieldId}`), escapeString(field.name [language]), factorText, escapeString(unitText)));
        });

        lines.push([
            '',
            '',
            '',
        ]);
    });

    lines.push([
        `> Based on VSF dated ${specFile.datecode}`,
        '',
    ]);

    return flatten([ lines ]).join('\n');
}


function reportUsageError() {
    console.log(`USAGE: ${process.argv [1]} [--packetStructure|--packetFields]`);
    process.exit(1);
}


async function main(args) {
    if (args.length < 1) {
        reportUsageError();
    } else if (args [0] === '--packetStructure') {
        return generatePacketStructureMarkdown(args [1]);
    } else if (args [0] === '--packetFields') {
        return generatePacketFieldListMarkdown(args [1]);
    } else {
        reportUsageError();
    }
}


main(process.argv.slice(2)).then(contents => {
    console.log(contents);
}, err => {
    console.log(err);
});
