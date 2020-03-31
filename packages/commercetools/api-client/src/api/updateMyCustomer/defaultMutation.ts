import gql from 'graphql-tag';
import { CustomerFragment, AddressFragment } from '../../fragments';

export default gql`
  ${AddressFragment}
  ${CustomerFragment}

  mutation updateMyCustomer($version: Long!, $actions: [MyCustomerUpdateAction!]!, $storeKey: KeyReferenceInput) {
    updateMyCustomer(version: $version, actions: $actions, storeKey: $storeKey) {
      shippingAddressIds
      billingAddressIds
      addresses {
        ...DefaultAddress
      }
      ...DefaultCustomer
    }
  }
`;
