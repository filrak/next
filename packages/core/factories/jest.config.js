const baseConfig = require('./../../commercetools/jest.base.config');

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['./tests/setup.ts']
};
