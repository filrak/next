const path = require('path');
const apiExtractor = require('@microsoft/api-extractor');
const fs = require('fs');

const baseConfig = require('./baseconfig');
const integrationMap = {
  'about-you': 'ay',
  commercetools: 'ct',
  boilerplate: 'bp'
};

const pathResolver = (arg) => path.resolve(__dirname, arg);

const configFileName = 'api-extractor.json';
const integrations = ['about-you'];
const modules = ['api-client', 'composables'];
const rootPath = pathResolver('../../../packages');

function createApiDoc(integration) {
  modules.forEach((module) => {
    const moduleRootPath = pathResolver(`${rootPath}/${integration}/${module}`);
    let mainEntryPointFilePath = pathResolver(`${moduleRootPath}/lib/index.d.ts`);

    if (!fs.existsSync(moduleRootPath)) {
      console.error(`The module ${module} does not exist for integration: ${integration}.`);
    } else {
      if (!fs.existsSync(pathResolver(`${moduleRootPath}/api`))) {
        fs.mkdirSync(pathResolver(`${moduleRootPath}/api`));
      }
      if (!fs.existsSync(pathResolver(`${moduleRootPath}/api/temp`))) {
        fs.mkdirSync(pathResolver(`${moduleRootPath}/api/temp`));
      }
      if (!fs.existsSync(pathResolver(`${moduleRootPath}/lib/index.d.ts`))) {
        if (!fs.existsSync(pathResolver(`${moduleRootPath}/lib/src/index.d.ts`))) {
          console.error(`Entrypoint for ${module} not found. Try running yarn build:${integrationMap[integration]}:${module} before.`);
          process.exit(1);
        }
        mainEntryPointFilePath = pathResolver(`${moduleRootPath}/lib/src/index.d.ts`);

        const config = {
          ...baseConfig,
          mainEntryPointFilePath,
          projectFolder: moduleRootPath,
          apiReport: {
            enabled: true,
            reportFolder: pathResolver(`${moduleRootPath}/api`),
            reportTempFolder: pathResolver(`${moduleRootPath}/api/temp`)
          },
          docModel: {
            enabled: true,
            apiJsonFilePath: pathResolver(`${moduleRootPath}/api.json`)
          }
        };

        fs.writeFileSync(configFileName, JSON.stringify(config), 'utf8', () => { });

        const apiExtractorJsonPath = path.join(__dirname, `./${configFileName}`);
        const extractorConfig = apiExtractor.ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);
        const extractorResult = apiExtractor.Extractor.invoke(extractorConfig, {
          localBuild: true,
          showVerboseMessages: true
        });

        if (extractorResult.succeeded) {
          console.log('API Extractor completed successfully.');
          fs.unlinkSync(path.join(__dirname, `./${configFileName}`));
        } else {
          console.log(`API Extractor completed with ${extractorResult.errorCount} errors` + ` and ${extractorResult.warningCount} warnings.`);
          fs.unlinkSync(path.join(__dirname, `./${configFileName}`));
          process.exit(1);
        }
      }
    }
  });
}

integrations.forEach((integration) => {
  createApiDoc(integration);
});
