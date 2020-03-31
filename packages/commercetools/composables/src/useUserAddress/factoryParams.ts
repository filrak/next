import { addCustomerAddress, assignCustomerAddress, removeCustomerAddress, updateCustomerAddress } from '@vue-storefront/commercetools-api';
import { UseUserAddressFactoryParams, UpdatedUserAddresses } from '@vue-storefront/factories';
import { Customer } from '@vue-storefront/commercetools-api/lib//types/GraphQL';
import { Address } from '../types/GraphQL';
import useUser from '../useUser';
import { UpdateUserParams } from '../useUser/factoryParams';
import { UserAddressType } from '@vue-storefront/interfaces';

const userComposable = useUser();

const transformAddresses = (customer: Customer): UpdatedUserAddresses<Address, UpdateUserParams> => ({
  addresses: customer.addresses,
  updateUserParams: { ...customer, clientSideOnly: true }
});

export const params: UseUserAddressFactoryParams<Customer, Address, UserAddressType, { [x: string]: any }, UpdateUserParams> = {
  userComposable,
  addresses: userComposable.user.value && userComposable.user.value.id ? userComposable.user.value.addresses : [],
  addAddress: async (address, type) => {
    const { data } = await addCustomerAddress(userComposable.user.value, address);
    const newAddress = data.updateMyCustomer.addresses.pop();

    const { data: { updateMyCustomer } } = await assignCustomerAddress(
      { ...userComposable.user.value, ...data.updateMyCustomer },
      newAddress,
      type
    );

    return transformAddresses(updateMyCustomer);
  },
  updateAddress: async (address) => {
    const { data } = await updateCustomerAddress(userComposable.user.value, address);

    return transformAddresses(data.updateMyCustomer);
  },
  deleteAddress: async (address) => {
    const { data } = await removeCustomerAddress(userComposable.user.value, address);

    return transformAddresses(data.updateMyCustomer);
  },
  getBillingAddresses: () => {
    const { addresses, billingAddressIds } = userComposable.user.value;

    return (addresses || []).filter(({ id }) => (billingAddressIds || []).includes(id));
  },
  getShippingAddresses: () => {
    const { addresses, shippingAddressIds } = userComposable.user.value;

    return (addresses || []).filter(({ id }) => (shippingAddressIds || []).includes(id));
  },
  searchAddresses: async () => userComposable.user.value.addresses
};
