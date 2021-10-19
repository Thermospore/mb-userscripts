const esModules = ['node-fetch', 'fetch-blob'].join('|');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
    testEnvironment: 'setup-polly-jest/jest-environment-jsdom',
    moduleNameMapper: {
        '^@lib/(.*)$': '<rootDir>/src/lib/$1',
        '^@test-utils/(.*)$': '<rootDir>/tests/utils/$1',
        '^@src/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['jest-extended/all'],
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!**/meta.ts',
    ],
    transformIgnorePatterns: [
        `/node_modules/(?!${esModules})`,
    ],
};