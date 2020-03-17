import { ref, Ref, watch, computed } from '@vue/composition-api';
import { UseUser } from '@vue-storefront/interfaces';

export type UseUserFactoryParams<USER, CART, UPDATE_USER_PARAMS> = {
  cart: Ref<CART>;
  loadUser: () => Promise<USER>;
  logOut: (params?: {currentUser?: USER}) => Promise<void>;
  updateUser: (params: {currentUser: USER; paramsToUpdate: UPDATE_USER_PARAMS}) => Promise<USER>;
  register: (params: { email: string; password: string; firstName?: string; lastName?: string }) => Promise<USER>;
  logIn: (params: { username: string; password: string }) => Promise<({updatedUser: USER; updatedCart: CART})>;
  changePassword: (params: {currentUser: USER; currentPassword: string; newPassword: string}) => Promise<USER>;
};

export function useUserFactory<USER, CART, UPDATE_USER_PARAMS>(
  factoryParams: UseUserFactoryParams<USER, CART, UPDATE_USER_PARAMS>
) {
  const user: Ref<USER> = ref({});
  const loading: Ref<boolean> = ref(false);
  const isAuthenticated = computed(
    () => user.value && Object.keys(user.value).length > 0
  );

  return function useUser(): UseUser<USER, UPDATE_USER_PARAMS> {
    watch(user, async () => {
      if (isAuthenticated.value) {
        return;
      }
      loading.value = true;
      try {
        user.value = await factoryParams.loadUser();
        loading.value = false;
      } catch (err) {
        console.log('useUser:Factory:Watch', err);
        loading.value = false;
      }
    });

    const updateUser = async (params: UPDATE_USER_PARAMS) => {
      loading.value = true;
      try {
        user.value = await factoryParams.updateUser({currentUser: user.value, paramsToUpdate: params});
        loading.value = false;
      } catch (err) {
        console.error('useUser:Factory:updateUser', err);
        loading.value = false;
      }
    };

    const register = async (registerUserData: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    }) => {
      loading.value = true;
      try {
        user.value = await factoryParams.register(registerUserData);
        loading.value = false;
      } catch (err) {
        console.error('useUser:Factory:register', err);
        loading.value = false;
      }
    };

    const login = async (loginUserData: {
      username: string;
      password: string;
    }) => {
      loading.value = true;
      try {
        const { updatedUser, updatedCart } = await factoryParams.logIn(loginUserData);
        user.value = updatedUser;
        factoryParams.cart.value = updatedCart;
      } catch (err) {
        console.error('useUser:Factory:logIn', err);
        loading.value = false;
      }
    };

    const logout = async () => {
      try {
        await factoryParams.logOut();
        user.value = {} as USER;
        factoryParams.cart.value = null;
      } catch (err) {
        console.error('useUser:Factory:logOut', err);
      }
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
      loading.value = true;
      try {
        user.value = await factoryParams.changePassword({currentUser: user.value, currentPassword, newPassword});
        loading.value = false;
      } catch (err) {
        console.error('useUser:Factory:changePassword', err);
        loading.value = false;
      }
    };

    return {
      user: computed(
        () => user.value
      ),
      updateUser,
      register,
      login,
      logout,
      isAuthenticated,
      changePassword,
      loading: computed(() => loading.value)
    };
  };
}
