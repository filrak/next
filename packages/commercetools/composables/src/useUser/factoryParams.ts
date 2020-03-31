import { UseUserFactoryParams } from '@vue-storefront/factories';
import { Customer } from '@vue-storefront/commercetools-api/lib//types/GraphQL';
import { authenticate } from './authenticate';
import {
  updateCustomerPersonalDetails,
  customerSignMeUp as apiCustomerSignMeUp,
  customerSignMeIn as apiCustomerSignMeIn,
  customerSignOut as apiCustomerSignOut,
  getMe as apiGetMe,
  customerChangeMyPassword as apiCustomerChangeMyPassword
} from '@vue-storefront/commercetools-api';
import useCart from '../useCart';

export type UpdateUserParams = Customer & { clientSideOnly?: boolean };

export const params: UseUserFactoryParams<Customer, UpdateUserParams, any> = {
  loadUser: async () => {
    try {
      const profile = await apiGetMe({ customer: true });
      return profile.data.me.customer;
    } catch (err) {
      const error = err.graphQLErrors ? err.graphQLErrors[0].message : err;
      if (error.includes('Resource Owner Password Credentials Grant')) {
        return null;
      }
      throw new Error(error);
    }
  },
  logOut: async () => {
    await useCart().refreshCart();
    await apiCustomerSignOut();
  },
  updateUser: async ({ currentUser, updatedUserData }): Promise<Customer> => {
    if (updatedUserData.clientSideOnly) {
      return Promise.resolve({currentUser, updatedUserData} as any);
    }

    const { firstName, lastName, email } = updatedUserData;

    const { data } = await updateCustomerPersonalDetails(currentUser, { firstName, lastName, email });

    return {
      ...currentUser,
      ...data.updateMyCustomer
    };
  },
  register: async ({email, password, firstName, lastName}) => {
    return await authenticate({email, password, firstName, lastName}, apiCustomerSignMeUp);
  },
  logIn: async ({ username, password }) => {
    const customerLogin = { email: username, password };
    await useCart().refreshCart();
    return await authenticate(customerLogin, apiCustomerSignMeIn);
  },
  changePassword: async function changePassword({currentUser, currentPassword, newPassword}) {
    try {
      const userResponse = await apiCustomerChangeMyPassword(currentUser.version, currentPassword, newPassword);
      // we do need to re-authenticate user to acquire new token - otherwise all subsequent requests will fail as unauthorized
      await this.logOut();
      const userLogged = await authenticate({ email: userResponse.data.user.email, password: newPassword }, apiCustomerSignMeIn);
      return userLogged.value;
    } catch (err) {
      console.error(err.graphQLErrors ? err.graphQLErrors[0].message : err);
    }
  }
};

