const path = require('path');
const apiExtractor = require('@microsoft/api-extractor');
const fs = require('fs');
const consola = require('consola');
const chalk = require('chalk');

const baseConfig = require('./baseconfig');
const integrationMap = {
  'about-you': 'ay',
  commercetools: 'ct',
  boilerplate: 'bp'
};

const pathResolver = (arg) => path.resolve(__dirname, arg);

const configFileName = 'api-extractor.json';
const integrations = ['about-you', 'commercetools'];
const modules = ['api-client', 'composables'];
const rootPath = pathResolver('../../../../packages');

const log = {
  info: (message) => consola.info(chalk.bold('API-EXTRACTOR:'), message),
  success: (message) => consola.success(chalk.bold('API-EXTRACTOR:'), message),
  error: (message) => consola.error(chalk.bold('API-EXTRACTOR:'), message)
};

function createApiDoc(integration) {
  modules.forEach((module) => {
    const moduleRootPath = pathResolver(`${rootPath}/${integration}/${module}`);
    let mainEntryPointFilePath = pathResolver(`${moduleRootPath}/lib/index.d.ts`);

    if (!fs.existsSync(moduleRootPath)) {
      log.error(`The module ${module} does not exist for integration: ${integration}.`);
    } else {
      if (!fs.existsSync(pathResolver(`${moduleRootPath}/docs`))) {
        fs.mkdirSync(pathResolver(`${moduleRootPath}/docs`));
      }
      if (!fs.existsSync(pathResolver(`${moduleRootPath}/docs/temp`))) {
        fs.mkdirSync(pathResolver(`${moduleRootPath}/docs/temp`));
      }
      if (!fs.existsSync(pathResolver(`${moduleRootPath}/lib/index.d.ts`))) {
        if (!fs.existsSync(pathResolver(`${moduleRootPath}/lib/src/index.d.ts`))) {
          log.error(`Entrypoint for ${module} not found. Try running yarn build:${integrationMap[integration]}:${module} before.`);
          process.exit(1);
        }
        mainEntryPointFilePath = pathResolver(`${moduleRootPath}/lib/src/index.d.ts`);
      }

      const config = {
        ...baseConfig,
        mainEntryPointFilePath,
        projectFolder: moduleRootPath,
        apiReport: {
          enabled: true,
          reportFolder: pathResolver(`${moduleRootPath}/docs`),
          reportTempFolder: pathResolver(`${moduleRootPath}/docs/temp`)
        },
        docModel: {
          enabled: true,
          apiJsonFilePath: pathResolver(`${moduleRootPath}/api.json`)
        }
      };

      fs.writeFileSync(configFileName, JSON.stringify(config), 'utf8', () => {});

      const apiExtractorJsonPath = path.join(__dirname, `../${configFileName}`);
      const extractorConfig = apiExtractor.ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);
      const extractorResult = apiExtractor.Extractor.invoke(extractorConfig, {
        localBuild: true,
        showVerboseMessages: true
      });

      if (extractorResult.succeeded) {
        log.success('API Extractor completed successfully.');
        fs.unlinkSync(path.join(__dirname, `../${configFileName}`));
      } else {
        log.error(`API Extractor completed with ${extractorResult.errorCount} errors` + ` and ${extractorResult.warningCount} warnings.`);
        fs.unlinkSync(path.join(__dirname, `../${configFileName}`));
        process.exit(1);
      }
    }
  });
}

integrations.forEach((integration) => {
  createApiDoc(integration);
});
