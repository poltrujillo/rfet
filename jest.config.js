module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
};
  