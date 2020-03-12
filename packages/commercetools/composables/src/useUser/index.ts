import { UseUser } from '@vue-storefront/interfaces';
import { ref, Ref } from '@vue/composition-api';
import {
  customerSignMeUp as apiCustomerSignMeUp,
  customerSignMeIn as apiCustomerSignMeIn,
  customerSignOut as apiCustomerSignOut,
  getMe as apiGetMe,
  customerChangeMyPassword as apiCustomerChangeMyPassword
} from '@vue-storefront/commercetools-api';
import {
  Customer,
  CustomerSignMeUpDraft,
  CustomerSignMeInDraft,
  Cart
} from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';
import {
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/factories';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft;

export const error: Ref<any> = ref({});

const authenticate = async (userData: UserData, fn) => {
  try {
    const userResponse = await fn(userData);
    return {
      user: userResponse.data.user.customer,
      cart: userResponse.data.user.cart
    };
  } catch (err) {
    console.error(err.graphQLErrors ? err.graphQLErrors[0].message : err);
  }
};

const params: UseUserFactoryParams<Customer, Cart, any> = {
  getUser: async (customer = true) => {
    const profile = await apiGetMe({ customer });
    return profile.data.me.customer;
  },

  updateUser: async (currentUser: Customer): Promise<Customer> => {
    // Change code below if the apiClient receive userUpdate method
    return Promise.resolve(currentUser);
  },

  register: async userData => {
    const registeredUser = await authenticate(userData, apiCustomerSignMeUp);
    return registeredUser.user;
  },

  login: async ({ username, password }) => {
    const customerLoginDraft = { email: username, password };
    const user = await authenticate(customerLoginDraft, apiCustomerSignMeIn);
    return ({user: user.user, cart: user.cart});
  },

  logout: async () => {
    await apiCustomerSignOut();
  },

  changePassword: async (user: Customer, currentPassword: string, newPassword: string) => {
    try {
      const userResponse = await apiCustomerChangeMyPassword(user.version, currentPassword, newPassword);
      // we do need to re-authenticate user to acquire new token - otherwise all subsequent requests will fail as unauthorized
      await this.logout();
      const userLogged = await authenticate({ email: userResponse.data.user.email, password: newPassword }, apiCustomerSignMeIn);
      return userLogged.user.value;
    } catch (err) {
      console.error(err.graphQLErrors ? err.graphQLErrors[0].message : err);
    }
  }
};

const useUser: () => UseUser<Customer, any> = useUserFactory<Customer, Cart, any>(
  params
);
export default useUser;
