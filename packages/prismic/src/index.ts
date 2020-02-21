import usePrismic from './composables/usePrismic';
import PrismicJS from 'prismic-javascript';
import { ApiOptions } from 'prismic-javascript/d.ts/Api';
import { getPages, getBlocks, getPageId, getSlices } from './helpers';

interface SetupConfig {
  endpoint: any;
  apiOptions?: ApiOptions;
}

const prismic = PrismicJS;
let apiOptions = null;
let endpoint = null;

const setup = (setupConfig: SetupConfig) => {
  apiOptions = setupConfig ? setupConfig.apiOptions || null : null;
  endpoint = setupConfig ? setupConfig.endpoint || null : null;

  return prismic.client(endpoint, apiOptions);
};

export {
  setup,
  prismic,
  apiOptions,
  endpoint,
  usePrismic,
  getPages,
  getBlocks,
  getSlices,
  getPageId
};
