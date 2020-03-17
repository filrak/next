jest.mock('@vue-storefront/factories', () => ({
  useUserFactory: jest.fn(() => () => {})
}));
jest.mock('@vue-storefront/commercetools-api', () => ({
  getMe: jest.fn()
}));

describe('useUser', () => {

});
