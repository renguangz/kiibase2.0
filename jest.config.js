/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
