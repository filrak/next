const baseConfig = require('./../jest.base.config');

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['./tests/setup.ts'],
  moduleNameMapper: {
    'api-client(.*)$': '<rootDir>$1'
  }
};
