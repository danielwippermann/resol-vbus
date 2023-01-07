/*! resol-vbus | Copyright (c) 2023-present, Daniel Wippermann | MIT license */

class ArgParser {

    constructor(argv) {
        this.argv = argv;
        this.index = 0;
    }

    consume() {
        if (this.index >= this.argv.length) {
            return null;
        }
        const arg = this.argv [this.index];
        this.index += 1;
        return arg;
    }

    consumeArgument() {
        const arg = this.consume();
        if (arg == null) {
            return null;
        } else if (arg.startsWith('--')) {
            this.index -= 1;
            return null;
        } else {
            return arg;
        }
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        const value = this.consume();
        return {
            done: (value == null),
            value,
        };
    }

    /* istanbul ignore next */
    printUsage(message, usage) {
        console.log([
            message ? [ message, '' ] : [],
            usage,
        ].flat(Infinity).join('\n'));

        process.exit(message ? 1 : 0);
    }

}


module.exports = {
    ArgParser,
};
