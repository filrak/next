import { useUserFactory } from '../src/';
import { params } from '../../../commercetools/composables/src/useUser/factoryParams';

jest.mock('../../../commercetools/composables/src/useUser/factoryParams', () => ({
  params: {
    cart: jest.fn(),
    loadUser: jest.fn(),
    logOut: jest.fn(),
    updateUser: jest.fn(),
    register: jest.fn(),
    logIn: jest.fn(),
    changePassword: jest.fn()
  }
}));

describe('useUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('creates properties', () => {
    const { user } = useUserFactory(params);
    expect(user.value).toEqual(null);
  });
});
