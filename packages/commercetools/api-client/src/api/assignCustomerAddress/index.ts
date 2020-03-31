import { Customer, Address } from '../../types/GraphQL';
import { UpdateMyCustomerResponse } from '../../types/Api';
import updateMyCustomer from '../updateMyCustomer/defaultMutation';
import { apolloClient } from '../..';

const getActionKey = (type: 'billing' | 'shipping'): string => {
  switch (type) {
    case 'billing':
      return 'addBillingAddressId';
    case 'shipping':
      return 'addShippingAddressId';
    default:
      throw new Error('Unknown action type');
  }
};

const assignCustomerAddress = (customer: Customer, address: Address, type: 'billing' | 'shipping'): Promise<UpdateMyCustomerResponse> => apolloClient.mutate({
  mutation: updateMyCustomer,
  variables: {
    version: customer.version,
    actions: [{
      [getActionKey(type)]: {
        addressId: address.id
      }
    }]
  }
});

export default assignCustomerAddress;
