import { BapiClient } from '@aboutyou/backbone';
import getProductApi from './getProduct';

let api = null;

let methods = {
  getProduct: getProductApi
};

function override(overrides) {
  methods = { ...methods,
    ...overrides };
}

function setup() {
  api = new BapiClient({
    host: 'https://mop.azure-api.net/bapi/',
    auth: { username: 'aboutyou', password: 'OmNErAb96Y5Qn75SFhXr' },
    shopId: 121
  });
}

/** just because you can't simply do "export x as y..." */
const getProduct = methods.getProduct;

export {
  getProduct,
  override,
  setup,
  api
};

