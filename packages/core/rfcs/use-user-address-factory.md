# UseUserAddressFactory with Commerce Tools composable use case

## Motivation

We need to extend useUserAddress type to show and modify user addresses.
Also, some eCommerce platforms requires updating user entity with every address modification (for example: CommerceTools).

## Composable interface
```TS
export interface UseUserAddress<ADDRESS, SEARCH_PARAMS, ADDRESS_OPTIONS = unknown> {
  addresses: ComputedProperty<ADDRESS[]>;
  shippingAddresses: ComputedProperty<ADDRESS[]>;
  billingAddresses: ComputedProperty<ADDRESS[]>;
  loadAddresses: (params?: SEARCH_PARAMS) => Promise<void>;
  addAddress: (address: ADDRESS, options?: ADDRESS_OPTIONS) => Promise<void>;
  updateAddress: (address: ADDRESS, options?: ADDRESS_OPTIONS) => Promise<void>;
  deleteAddress: (address: ADDRESS, options?: ADDRESS_OPTIONS) => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

## Factory params interface
```TS
// factory params schema
export type UseUserAddressFactoryParams<ADDRESS, SEARCH_PARAMS, ADDRESS_OPTIONS = unknown> = {
  loadAddresses: (params?: SEARCH_PARAMS) => Promise<ADDRESS[]>;
  getBillingAddresses: (addresses: ADDRESS[]) => ADDRESS[];
  getShippingAddresses: (addresses: ADDRESS[]) => ADDRESS[];
  addAddress: (address: ADDRESS, options?: ADDRESS_OPTIONS) => Promise<ADDRESS[]>;
  updateAddress: (address: ADDRESS, options?: ADDRESS_OPTIONS) => Promise<ADDRESS[]>;
  deleteAddress: (address: ADDRESS, options?: ADDRESS_OPTIONS) => Promise<ADDRESS[]>;
}
```

##  Other changes requirements:
We need to add a possibility to update a user
```TS
// FACTORY INTERFACE
export interface UseUser
<
  USER,
  UPDATE_USER_PARAMS
> {
  // ...leave all the stuff as they are now

  // needed to add this:
  setUser: (newUser: USER) => void;
}
```

```TS
// FACTORY IMPLEMENTATION
export function useUserFactory<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS extends { email: string; password: string }>(
  factoryParams: UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS>
) {
  // ...leave all the stuff as they are now

  // needed to add this:
  const setUser = (newUser: USER) => {
    user.value = newUser;
  };

  return {
      user: computed(() => user.value),
      setUser,  // required to be added
      updateUser,
      register,
      login,
      logout,
      isAuthenticated,
      changePassword,
      refreshUser,
      loading: computed(() => loading.value)
    };
}
```

## Commerce Tools Integration
In order to integrate CT we need a user instance to update it. It's required, because addresses are being updated through user update endpoint.

Below example when adding an address:

### Factory params
```TS
import { setUser } from './useUser';

const factoryParams = {
  addAddress: async (address) => {
    const { user } = await apiAddAddress(address);

    setUser(user);

    return user.addresses;
  }
};
```

### Factory content
```TS
export function useUserAddressFactory = (factoryParams) => {
  const addresses: ref([]);
  const loading: ref(false);

  return function useUserAddress(): UseUserAddress<ADDRESS, SEARCH_PARAMS, ADDRESS_OPTIONS> {
    const addAddress: async (address) => {
      loading.value = true;
      addresses.value = await factoryParams.addAddress(address);
      loading.value = false;
    }

    // and other methods

    return {
      addresses: computed(() => addresses.value);
      addAddress,
      // ...And other stuff mentioned in interfaces section
    }
  }
};
```
