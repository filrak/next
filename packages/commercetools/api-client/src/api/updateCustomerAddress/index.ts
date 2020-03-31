import { Customer, AddressInput } from '../../types/GraphQL';
import { UpdateMyCustomerResponse } from '../../types/Api';
import { apolloClient } from '../../index';
import updateMyCustomer from '../updateMyCustomer/defaultMutation';

const updateCustomerAddress = (customer: Customer, address: AddressInput): Promise<UpdateMyCustomerResponse> => apolloClient.mutate({
  mutation: updateMyCustomer,
  variables: {
    version: customer.version,
    actions: [{
      changeAddress: {
        addressId: address.id,
        address
      }
    }]
  }
});

export default updateCustomerAddress;
