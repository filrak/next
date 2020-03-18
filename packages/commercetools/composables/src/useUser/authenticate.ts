import {CustomerSignMeInDraft, CustomerSignMeUpDraft} from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft;

export const authenticate = async (userData: UserData, fn) => {
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
