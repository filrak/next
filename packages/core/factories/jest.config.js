const baseConfig = require('../../commercetools/composables/jest.config');

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['./tests/setup.ts']
};
