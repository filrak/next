import { Customer, AddressInput } from '../../types/GraphQL';
import { apolloClient } from '../../index';
import updateMyCustomer from '../updateMyCustomer/defaultMutation';
import { UpdateMyCustomerResponse } from '../../types/Api';

const addCustomerAddress = (customer: Customer, address: AddressInput): Promise<UpdateMyCustomerResponse> => apolloClient.mutate({
  mutation: updateMyCustomer,
  variables: {
    version: customer.version,
    actions: [{
      addAddress: { address }
    }]
  },
  fetchPolicy: 'no-cache'
});

export default addCustomerAddress;
