import { useUserFactory } from '../src/useUserFactory';
import { params as factoryParams } from '../../../commercetools/composables/src/useUser/factoryParams';

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

const useUserMethods = useUserFactory(factoryParams)();

describe('useUserFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUser method', () => {
    it('updateUser return updated user data', async () => {
      const paramsToUpdate = { name: 'Test'};

      await useUserMethods.updateUser(paramsToUpdate);
      (factoryParams.updateUser as jest.Mock).mockReturnValueOnce(paramsToUpdate);

      expect(useUserMethods.user.value).toEqual(paramsToUpdate);
      expect(useUserMethods.loading.value).toBe(false);
    });
    it('console error is called', () => {});
  });

  describe('register method', () => {
    it('', () => {

    });
  });
});
