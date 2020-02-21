import gql from 'graphql-tag';
import { CartFragment, CustomerFragment, OrderFragment } from './../../fragments';

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
  ${OrderFragment}

  query getMe($locale: Locale!) {
    me {
      activeCart {
        ...DefaultCart
      }
      customer {
        ...DefaultCustomer
      }
      orders {
        results {
          ...DefaultOrder
        }
      }
    }
  }
`;

export { basicProfile, fullProfile };
