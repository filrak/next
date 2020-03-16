import { setup } from './../src/index';

jest.mock('@aboutyou/backbone', () => ({
  BapiClient: jest.fn(() => ({
    basket: {}
  }))
}));

setup();

