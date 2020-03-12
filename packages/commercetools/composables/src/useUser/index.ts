import { UseUser } from '@vue-storefront/interfaces';
import { cart } from '../useCart/';
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
  cart,
  loadUser: async () => {
    const profile = await apiGetMe();
    return profile.data.me.customer;
  },
  logOut: async () => {
    return await apiCustomerSignOut();
  },
  updateUser: async ({currentUser, paramsToUpdate}): Promise<Customer> => {
    // Change code below if the apiClient receive userUpdate method
    console.log('useUser:UpdateUser', paramsToUpdate);
    return Promise.resolve(currentUser);
  },
  register: async ({email, password, firstName, lastName}) => {
    const registeredUser = await authenticate({email, password, firstName, lastName}, apiCustomerSignMeUp);
    return registeredUser.user;
  },
  logIn: async ({ username, password }) => {
    const customerLoginDraft = { email: username, password };
    const user = await authenticate(customerLoginDraft, apiCustomerSignMeIn);
    return ({updatedUser: user.user, updatedCart: user.cart});
  },
  changePassword: async ({currentUser, currentPassword, newPassword}) => {
    try {
      const userResponse = await apiCustomerChangeMyPassword(currentUser.version, currentPassword, newPassword);
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
