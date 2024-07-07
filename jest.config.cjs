// jest.config.js

module.exports = {
    // Jest configuration options
    verbose: true,
    testEnvironment: 'node',
    testRegex: '/*.test.js$',
    moduleNameMapper: {
        '^@/(.*)$': './src/$1'
    },
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    collectCoverage: true,
    coverageDirectory: './coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!**/node_modules/**',
        '!**/__tests__/**'
    ],
    coverageReporters: ['html', 'text-summary']
};
