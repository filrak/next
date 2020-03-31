import { Customer } from '../../types/GraphQL';
import { UpdateMyCustomerResponse } from '../../types/Api';
import { apolloClient } from '../../index';
import updateMyCustomer from '../updateMyCustomer/defaultMutation';

interface PersonalDetails {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const generateActions = (personalDetails: PersonalDetails): any[] => {
  const actions = [];

  personalDetails.email && actions.push({
    changeEmail: {
      email: personalDetails.email
    }
  });

  personalDetails.firstName && actions.push({
    setFirstName: {
      firstName: personalDetails.firstName
    }
  });

  personalDetails.lastName && actions.push({
    setLastName: {
      lastName: personalDetails.lastName
    }
  });

  return actions;
};

const updateCustomerPersonalDetails = (customer: Customer, personalDetails: PersonalDetails): Promise<UpdateMyCustomerResponse> => apolloClient.mutate({
  mutation: updateMyCustomer,
  variables: {
    version: customer.version,
    actions: generateActions(personalDetails)
  }
});

export default updateCustomerPersonalDetails;
