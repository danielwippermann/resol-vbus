const argParserModule = require('../../src/arg-parser');

const {
    expect,
    expectObjectOwnPropertyNamesToEqual,
} = require('./test-utils');

describe('arg-parser', () => {

    it('should export correctly', () => {
        expectObjectOwnPropertyNamesToEqual(argParserModule, [
            'ArgParser',
        ]);
    });

    describe('ArgParser', () => {

        const { ArgParser } = argParserModule;

        it('should be a class', () => {
            expectObjectOwnPropertyNamesToEqual(ArgParser.prototype, [
                'constructor',
                'consume',
                'consumeArgument',
                'next',
                'printUsage',
            ]);
        });

        describe('constructor', () => {

            it('should work correctly', () => {
                const argv = [];

                const args = new ArgParser(argv);

                expectObjectOwnPropertyNamesToEqual(args, [
                    'argv',
                    'index',
                ]);

                expect(args.argv).toBe(argv);
                expect(args.index).toBe(0);
            });

        });

        describe('consume', () => {

            it('should work correctly', () => {
                const argv = [
                    {},
                    {},
                ];

                const args = new ArgParser(argv);

                expect(args.index).toBe(0);

                const result1 = args.consume();

                expect(result1).toBe(argv [0]);
                expect(args.index).toBe(1);

                const result2 = args.consume();

                expect(result2).toBe(argv [1]);
                expect(args.index).toBe(2);

                const result3 = args.consume();

                expect(result3).toBe(null);
                expect(args.index).toBe(2);
            });

        });

        describe('consumeArgument', () => {

            it('should work correctly', () => {
                const argv = [
                    'arg',
                    '--opt',
                ];

                const args = new ArgParser(argv);

                expect(args.index).toBe(0);

                const result1 = args.consumeArgument();

                expect(result1).toBe(argv [0]);
                expect(args.index).toBe(1);

                const result2 = args.consumeArgument();

                expect(result2).toBe(null);
                expect(args.index).toBe(1);

                args.consume();

                expect(args.index).toBe(2);

                const result3 = args.consumeArgument();

                expect(result3).toBe(null);
                expect(args.index).toBe(2);
            });

        });

        describe('[Symbol.iterator]', () => {

            it('should work correctly', () => {
                const argv = [
                    'arg',
                    '--opt',
                ];

                const args = new ArgParser(argv);

                const it = args [Symbol.iterator]();

                expect(typeof it.next).toBe('function');

                expect(it).toBe(args);
            });

        });

        describe('next', () => {

            it('should work correctly', () => {
                const argv = [
                    'arg',
                    '--opt',
                ];

                const args = new ArgParser(argv);

                const result1 = args.next();

                expect(result1.done).toBe(false);
                expect(result1.value).toBe(argv [0]);

                const result2 = args.next();

                expect(result2.done).toBe(false);
                expect(result2.value).toBe(argv [1]);

                const result3 = args.next();

                expect(result3.done).toBe(true);
                expect(result3.value).toBe(null);
            });

        });

        describe('printUsage', () => {

            it('should work correctly', () => {
                // can't test correctly, since it calls `process.exit`
            });

        });

    });

});
