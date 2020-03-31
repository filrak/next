import { UseUserAddress, UserAddressType, UseUser } from '@vue-storefront/interfaces';
import { Ref, ref, computed } from '@vue/composition-api';

export interface UpdatedUserAddresses<ADDRESS, UPDATE_USER_PARAMS> {
  addresses: ADDRESS[];
  updateUserParams?: UPDATE_USER_PARAMS;
}

export type UseUserAddressFactoryParams<
  USER,
  ADDRESS,
  ADDRESS_TYPE = UserAddressType,
  SEARCH_PARAMS = { [x: string]: any },
  UPDATE_USER_PARAMS = any,
> = {
  addresses: ADDRESS[];
  searchAddresses: (params?: SEARCH_PARAMS) => Promise<ADDRESS[]>;
  addAddress: (address: ADDRESS, type: ADDRESS_TYPE) => Promise<UpdatedUserAddresses<ADDRESS, UPDATE_USER_PARAMS>>;
  deleteAddress: (address: ADDRESS) => Promise<UpdatedUserAddresses<ADDRESS, UPDATE_USER_PARAMS>>;
  updateAddress: (address: ADDRESS) => Promise<UpdatedUserAddresses<ADDRESS, UPDATE_USER_PARAMS>>;
  getBillingAddresses: () => ADDRESS[];
  getShippingAddresses: () => ADDRESS[];
  userComposable?: UseUser<USER, UPDATE_USER_PARAMS>;
}

export function useUserAddressFactory<USER, ADDRESS, ADDRESS_TYPE = UserAddressType, SEARCH_PARAMS = { [x: string]: any }, UPDATE_USER_PARAMS = any> (factoryParams: UseUserAddressFactoryParams<USER, ADDRESS, ADDRESS_TYPE, SEARCH_PARAMS>) {
  const loading: Ref<boolean> = ref(false);

  const updateData = async (data: UpdatedUserAddresses<ADDRESS, UPDATE_USER_PARAMS>) => {
    factoryParams.addresses.length = 0;
    data.addresses.forEach(address => factoryParams.addresses.push(address));

    if (factoryParams.userComposable && data.updateUserParams) {
      await factoryParams.userComposable.updateUser(data.updateUserParams);
    }

    loading.value = false;
  };

  const logError = (error: any) => {
    console.log(error);
    loading.value = false;

    throw error;
  };

  const searchAddresses = async (params) => {
    loading.value = true;

    const addresses = await factoryParams.searchAddresses(params);

    updateData({ addresses });

    loading.value = false;
  };

  const getBillingAddresses = () => factoryParams.getBillingAddresses();

  const getShippingAddresses = () => factoryParams.getShippingAddresses();

  const addAddress = async (address: ADDRESS, type: ADDRESS_TYPE) => {
    loading.value = true;

    await factoryParams.addAddress(address, type)
      .then(updateData)
      .catch(logError);
  };

  const deleteAddress = async (address) => {
    loading.value = true;

    await factoryParams.deleteAddress(address)
      .then(updateData)
      .catch(logError);
  };

  const updateAddress = async (address) => {
    loading.value = true;
    await factoryParams.updateAddress(address)
      .then(updateData)
      .catch(logError);
  };

  return function useUserAddress(): UseUserAddress<ADDRESS, ADDRESS_TYPE> {
    return {
      addresses: computed(() => factoryParams.addresses),
      totalAddresses: computed(() => factoryParams.addresses.length),
      searchAddresses,
      addAddress,
      updateAddress,
      deleteAddress,
      getBillingAddresses,
      getShippingAddresses,
      loading
    };
  };
}
