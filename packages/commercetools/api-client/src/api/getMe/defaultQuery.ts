import gql from 'graphql-tag';
import { CartFragment, CustomerFragment, AddressFragment } from './../../fragments';

const basicProfile = gql`
  ${CartFragment}

  query getMe($locale: Locale!) {
    me {
      activeCart {
        ...DefaultCart
      }
    }
  }
`;

const fullProfile = gql`
  ${CartFragment}
  ${CustomerFragment}
  ${AddressFragment}

  query getMe($locale: Locale!) {
    me {
      activeCart {
        ...DefaultCart
      }
      customer {
        ...DefaultCustomer
        addresses {
          ...DefaultAddress
        }
        defaultBillingAddress {
          ...DefaultAddress
        }
        defaultShippingAddress {
          ...DefaultAddress
        }
        shippingAddressIds
        billingAddressIds
      }
    }
  }
`;

export { basicProfile, fullProfile };
