jest.mock('@vue-storefront/factories', () => ({
  useUserFactory: jest.fn(() => () => {})
}));
jest.mock('@vue-storefront/commercetools-api', () => ({
  getMe: jest.fn()
}));

import { getMe as apiGetMe } from '@vue-storefront/commercetools-api';
import useUser from '../../src/useUser';
import {
  useUserFactory
} from '@vue-storefront/factories';

describe('useUser', () => {
  it('loadUser param returns customer from API', async () => {
    const customer = { firstName: 'loaded customer', lastName: 'loaded customer' };

    (apiGetMe as jest.Mock).mockReturnValueOnce({ data: { me: { customer } }});
    useUser();

    const factoryParams = (useUserFactory as jest.Mock).mock.calls[0][0];
    expect(await factoryParams.loadUser()).toBe(customer);
  });
  it('logOut return empty object', async () => {

  });
  it('register function return new user', () => {
    // const customer = { firstName: 'loaded customer', lastName: 'loaded customer' };
  });
});
