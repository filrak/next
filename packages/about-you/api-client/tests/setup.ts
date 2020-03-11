import { setup } from './../src/index';

jest.mock('@aboutyou/backbone', () => ({
  BapiClient: jest.fn(() => ({
    categories: {},
    products: {},
    masters: {},
    search: {}
  }))
}));

setup({
  host: '',
  shopId: 1
});
