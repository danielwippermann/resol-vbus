import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        include: ['test/specs/**/*.spec.js'],
        fileParallelism: false,
        reporters: ['default'],
        coverage: {
            include: ['src/**/*.js', '!src/configuration-optimizers/*-data.js', 'test/specs/test-utils.js'],
            provider: 'v8',
            reporter: ['text', 'lcov'],
        },
    },
});
