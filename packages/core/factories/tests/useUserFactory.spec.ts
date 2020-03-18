import { useUserFactory } from '../src';

const factoryParams = {
  cart: jest.fn(),
  loadUser: jest.fn(),
  logOut: jest.fn(),
  updateUser: jest.fn(),
  register: jest.fn(),
  logIn: jest.fn(),
  changePassword: jest.fn()
} as any;

const useUserMethods = useUserFactory(factoryParams)();
const consoleErrorSpy = jest.spyOn(console, 'error');
describe('useUserFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('updateUser method', () => {
    it('return updated user data', async () => {
      const paramsToUpdate = { name: 'Test'};
      (factoryParams.updateUser as jest.Mock).mockReturnValueOnce(paramsToUpdate);
      await useUserMethods.updateUser(paramsToUpdate);
      expect(useUserMethods.user.value).toEqual(paramsToUpdate);
      expect(useUserMethods.loading.value).toBe(false);
    });
    it('console error is called', async () => {
      consoleErrorSpy.mockImplementationOnce(() => {});
      (factoryParams.updateUser as jest.Mock).mockImplementationOnce(() => {
        throw 'Error';
      });
      await useUserMethods.updateUser('');
      expect(consoleErrorSpy).toBeCalledWith('useUser:Factory:updateUser', 'Error');
      expect(useUserMethods.loading.value).toBe(false);
    });
  });
  describe('register method', () => {
    it('return registered user', async () => {
      const userToRegister = { email: 'John', password: '123456', firstName: 'Diego', lastName: 'Ramirez'};
      (factoryParams.register as jest.Mock).mockReturnValueOnce(userToRegister);
      await useUserMethods.register(userToRegister);
      expect(useUserMethods.user.value).toEqual(userToRegister);
      expect(useUserMethods.loading.value).toBe(false);
    });
    it('console error is called', async () => {
      consoleErrorSpy.mockImplementationOnce(() => {});
      (factoryParams.register as jest.Mock).mockImplementationOnce(() => {
        throw 'Error';
      });
      // @ts-ignore
      await useUserMethods.register({});
      expect(consoleErrorSpy).toBeCalledWith('useUser:Factory:register', 'Error');
      expect(useUserMethods.loading.value).toBe(false);
    });
  });
  describe('login method', () => {
    it('return logged user', async () => {
      const userToLogin = { username: 'John', password: '123456'};
      (factoryParams.logIn as jest.Mock).mockReturnValueOnce({
        updatedUser: userToLogin,
        updatedCart: []
      });
      await useUserMethods.login(userToLogin);
      expect(useUserMethods.user.value).toEqual(userToLogin);
      expect(factoryParams.cart.value).toEqual([]);
      expect(useUserMethods.loading.value).toBe(false);
    });
    it('console error is called', async () => {
      consoleErrorSpy.mockImplementationOnce(() => {});
      (factoryParams.logIn as jest.Mock).mockImplementationOnce(() => {
        throw 'Error';
      });
      // @ts-ignore
      await useUserMethods.login({});
      expect(consoleErrorSpy).toBeCalledWith('useUser:Factory:logIn', 'Error');
      expect(useUserMethods.loading.value).toBe(false);
    });
  });
  describe('logout method', () => {
    it('return logout user', async () => {
      (factoryParams.logOut as jest.Mock).mockReturnValueOnce(null);

      await useUserMethods.logout();

      expect(factoryParams.logOut).toHaveBeenCalled();
      expect(useUserMethods.user.value).toEqual({});
      expect(factoryParams.cart.value).toEqual(null);
    });
    it('console error is called', async () => {
      consoleErrorSpy.mockImplementationOnce(() => {});
      (factoryParams.logOut as jest.Mock).mockImplementationOnce(() => {
        throw 'Error';
      });
      // @ts-ignore
      await useUserMethods.logout({});
      expect(consoleErrorSpy).toBeCalledWith('useUser:Factory:logOut', 'Error');
    });
  });
  describe('changePassword method', () => {
    it('return logout user', async () => {
      const changePasswordData = {currentUser: {email: 'tonny@dot.com', password: '123456'}, currentPassword: '123456', newPassword: '654321'};
      (factoryParams.changePassword as jest.Mock).mockReturnValueOnce(changePasswordData);

      await useUserMethods.changePassword(changePasswordData.currentPassword, changePasswordData.newPassword);

      expect(useUserMethods.user.value).toEqual(changePasswordData);
      expect(useUserMethods.loading.value).toBe(false);
    });
    it('console error is called', async () => {
      consoleErrorSpy.mockImplementationOnce(() => {});
      (factoryParams.changePassword as jest.Mock).mockImplementationOnce(() => {
        throw 'Error';
      });
      // @ts-ignore
      await useUserMethods.changePassword();
      expect(consoleErrorSpy).toBeCalledWith('useUser:Factory:changePassword', 'Error');
      expect(useUserMethods.loading.value).toBe(false);
    });
  });
});
