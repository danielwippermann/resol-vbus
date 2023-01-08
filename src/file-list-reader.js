/*! resol-vbus | Copyright (c) 2022-present, Daniel Wippermann | MIT license */

const fs = require('fs/promises');
const path = require('path');
const { Readable } = require('stream');


const {
    applyDefaultOptions,
    normalizeDatecode,
} = require('./utils');


class FileListReader extends Readable {

    constructor(options) {
        super();

        applyDefaultOptions(this, options, /** @lends FileListReader.prototype */ {

            dirname: null,

            minDatecode: null,

            maxDatecode: null,

        });

        this.minDatecode = normalizeDatecode(this.minDatecode);
        this.maxDatecode = normalizeDatecode(this.maxDatecode);

        this.files = null;
        this.fileIndex = 0;
    }

    _read() {
        const runner = async () => {
            if (this.files == null) {
                this.files = await FileListReader.getListOfFiles(this.dirname, this.minDatecode, this.maxDatecode);
                this.fileIndex = 0;
            }

            if (this.fileIndex < this.files.length) {
                const filename = this.files [this.fileIndex];
                this.fileIndex += 1;

                const chunk = await fs.readFile(filename);
                this.push(chunk);
            } else {
                this.push(null);
            }
        };

        runner().then(null, err => {
            this.emit('error', err);
        });
    }

    static async getListOfFiles(dirname, minDatecode, maxDatecode) {
        const entries = await fs.readdir(dirname, { withFileTypes: true });
        const files = [];
        for (const entry of entries) {
            if (!entry.isFile()) {
                // nop
            } else if (!(/^2\d{7}(_\w+)?\.vbus$/i.test(entry.name))) {
                // nop
            } else {
                const datecode = entry.name.slice(0, 8);
                if ((minDatecode != null) && (datecode < minDatecode)) {
                    // nop
                } else if ((maxDatecode != null) && (datecode > maxDatecode)) {
                    // nop
                } else {
                    files.push(path.resolve(dirname, entry.name));
                }
            }
        }
        files.sort();
        return files;
    }

}


module.exports = FileListReader;
