// DEPENDENCIES
const path = require('path');
const apiExtractor = require('@microsoft/api-extractor');
const fs = require('fs');

const pathResolver = (arg) => path.resolve(__dirname, arg);

const configFileName = 'api-extractor.json';
const integrations = ['about-you', 'commercetools'];
const modules = ['api-client', 'composables'];
const rootPath = pathResolver('../../../../packages');

const baseConfig = require('./baseconfig');

function createApiDoc(integration) {
  modules.forEach((module) => {
    const moduleRootPath = pathResolver(`${rootPath}/${integration}/${module}`);
    let mainEntryPointFilePath = pathResolver(`${moduleRootPath}/lib/index.d.ts`);

    // check of module exists
    if (!fs.existsSync(moduleRootPath)) {
      console.log(`Module: ${module} does not exist for Integration: ${integration}`);
      process.exitCode = 0;
    } else {
      if (!fs.existsSync(pathResolver(`${moduleRootPath}/docs`))) {
        fs.mkdirSync(pathResolver(`${moduleRootPath}/docs`));
      }
      if (!fs.existsSync(pathResolver(`${moduleRootPath}/docs/temp`))) {
        fs.mkdirSync(pathResolver(`${moduleRootPath}/docs/temp`));
      }
      if (!fs.existsSync(pathResolver(mainEntryPointFilePath))) {
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
        console.log('API Extractor completed successfully');
        fs.unlinkSync(path.join(__dirname, `../${configFileName}`));
        process.exitCode = 0;
      } else {
        console.log(`API Extractor completed with ${extractorResult.errorCount} errors` + ` and ${extractorResult.warningCount} warnings`);
        fs.unlinkSync(path.join(__dirname, `../${configFileName}`));
        process.exitCode = 1;
      }
    }
  });
}

integrations.forEach((integration) => {
  createApiDoc(integration);
});
