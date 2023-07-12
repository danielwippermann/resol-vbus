const crypto = require('crypto');
const fs = require('fs/promises');
const util = require('util');

const xml2js = require('xml2js');

const vbus = require('../..');

function promisify(fn) {
    return new Promise((resolve, reject) => {
        fn((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function flatten(...args) {
    return args.flat(10);
}

function hashString(input) {
    const hasher = crypto.createHash('sha256');
    hasher.update(input);
    return hasher.digest('hex').slice(0, 8);
}

function usage(message) {
    console.log(flatten([
        message ? [ message, '' ] : [],
        'USAGE: rsc-scheme-converter <input RSC file> <input image file> <output JS file>',
        '',
    ]).join('\n'));

    process.exit(message ? 1 : 0);
}

async function main(args) {
    let inputRscFilename = null;
    let inputImageFilename = null;
    let outputJsFilename = null;

    let argIdx = 0;
    while (argIdx < args.length) {
        const arg = args [argIdx];
        argIdx += 1;

        if (arg === '--help') {
            usage();
        } else if (arg.startsWith('-')) {
            usage(`Unknown option: ${arg}`);
        } else if (inputRscFilename == null) {
            inputRscFilename = arg;
        } else if (inputImageFilename == null) {
            inputImageFilename = arg;
        } else if (outputJsFilename == null) {
            outputJsFilename = arg;
        } else {
            usage(`Unexpected argument: ${arg}`);
        }
    }

    if (inputRscFilename == null) {
        usage('No input RSC file provided');
    } else if (inputImageFilename == null) {
        usage('No input image file provided');
    } else if (outputJsFilename == null) {
        usage('No output JS file provided');
    }

    const rscContents = await fs.readFile(inputRscFilename, 'utf-8');
    const rscRootObject = await promisify(cb => xml2js.parseString(rscContents, cb));

    const imageContents = await fs.readFile(inputImageFilename, 'base64');

    const plugins = rscRootObject.serviceCenterProject.plugin;

    const loggingViewPlugin = plugins.find(plugin => plugin.$.id === 'de.resol.servicecenter.vbuslogging.VBusLoggingView');
    if (!loggingViewPlugin) {
        throw new Error(`No VBusLoggingView plugin found in RSC file`);
    }

    const docContents = loggingViewPlugin.$.designerDocument;
    const docRootObject = await promisify(cb => xml2js.parseString(docContents, cb));

    const docObject = docRootObject.designerDocument;
    const width = docObject.width [0];
    const height = docObject.height [0];
    const docFields = docObject.designerVBusField;

    const spec = vbus.Specification.getDefaultSpecification();
    const specFile = vbus.SpecificationFile.getDefaultSpecificationFile();

    const fields = docFields.map(docField => {
        const x = +(docField.x [0]);
        const y = +(docField.y [0]);
        const width = +(docField.width [0]);
        const height = +(docField.height [0]);
        const text = docField.text [0];
        const font = docField.font [0];
        const textColor = docField.textColor [0];
        const type = +(docField.type [0]);
        const destination = +(docField.destination [0]);
        const source = +(docField.source [0]);
        const command = +(docField.command [0]);
        // const fieldId = +(docField.fieldId [0]);
        const channel = +(docField.channel [0]);
        const tooltip = docField.tooltip [0];

        const fontName = font.name [0];
        const fontHeight = +(font.height [0]);
        const fontStyle = +(font.style [0]);

        const textColorR = +(textColor.r [0]);
        const textColorG = +(textColor.g [0]);
        const textColorB = +(textColor.b [0]);

        if (type !== 0) {
            throw new Error(`Unexpected type`);
        }

        if (fontStyle !== 0) {
            throw new Error(`Unexpected font style`);
        }

        const packetSpec = spec.getPacketSpecification(channel, destination, source, command);
        if (!packetSpec) {
            throw new Error(`Unknown packet`);
        }

        // const pt = specFile.getPacketTemplate(destination, source, command);
        // if (!pt) {
        //     throw new Error(`Unable to find packet template`);
        // }

        const fields = packetSpec.packetFields.filter(field => {
            return tooltip.includes(`\\n${field.name.de} [`);
        });

        if (fields.length === 0) {
            throw new Error(`Unable to find field`);
        } else if (fields.length > 1) {
            throw new Error(`Multiple fields found`);
        }

        const packetFieldSpec = fields [0];

        // const style = `font: ${fontHeight}px "${fontName}"; color: rgb(${textColorR}, ${textColorG}, ${textColorB})`;
        const style = {
            font: `${fontHeight}px "${fontName}"`,
            color: `rgb(${textColorR}, ${textColorG}, ${textColorB})`,
        };
        const styleHash = hashString(JSON.stringify(style)).toUpperCase();

        return {
            x,
            y: y + fontHeight,
            width,
            height,
            text,
            fontName,
            fontHeight,
            fontStyle,
            textColorR,
            textColorG,
            textColorB,
            packetSpec,
            packetFieldSpec,
            style,
            styleHash,
        };
    });

    const styles = fields.reduce((memo, field) => {
        if (!memo.some(entry => entry.styleHash === field.styleHash)) {
            memo.push({
                style: field.style,
                styleHash: field.styleHash,
            });
        }
        return memo;
    }, []);

    const output = [
        `initializeResolVBusLiveView({`,
        `  width: ${width},`,
        `  height: ${height},`,
        `  backgroundImageUrl: 'data:image/jpg;base64,${imageContents}',`,
        '',
        `  render(r) {`,
        styles.map(style => {
            return [
                `    const style_${style.styleHash} = ${util.inspect(style.style)};`,
            ];
        }),
        fields.map(field => {
            const packetFieldId = `${field.packetSpec.packetId}_${field.packetFieldSpec.fieldId}`;

            return [
                '',
                `    // ${field.packetSpec.fullName}: ${field.packetFieldSpec.name.en}`,
                `    r.drawVBusField('${packetFieldId}', ${field.x}, ${field.y}, style_${field.styleHash});`
            ]
        }),
        `  },`,
        `});`,
        '',
    ];

    await fs.writeFile(outputJsFilename, flatten(output).join('\n'));
    // console.log(flatten(output).join('\n'));
}

main(process.argv.slice(2)).then(null, err => {
    console.error(err);
    process.exit(1);
});
