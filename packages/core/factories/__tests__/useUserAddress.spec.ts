import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);
import { useUserAddressFactory, UseUserAddressFactoryParams } from '../src';
import { UseUserAddress } from '@vue-storefront/interfaces';

let useUserAddress: () => UseUserAddress<any, any>;

let params: UseUserAddressFactoryParams<any, any>;
let inputAddresses: any = [];

const transform = (addresses: any[]) => ({
  addresses,
  updateUserParams: {}
});

const createComposable = (overrideParams?: UseUserAddressFactoryParams<any, any>) => {
  params = overrideParams || {
    userComposable: {
      updateUser: async () => {}
    } as any,
    addresses: inputAddresses,
    searchAddresses: jest.fn().mockResolvedValueOnce(['address1', 'address2', 'address3']),
    addAddress: jest.fn().mockResolvedValueOnce(transform(['address1', 'address2', 'address3', 'address4'])),
    deleteAddress: jest.fn().mockResolvedValueOnce(transform(['address1', 'address2'])),
    getBillingAddresses: jest.fn().mockReturnValueOnce(['address1']),
    getShippingAddresses: jest.fn().mockReturnValueOnce(['address2', 'address3']),
    updateAddress: jest.fn().mockResolvedValueOnce(transform(['address1', 'updatedAddress', 'address3']))
  };

  useUserAddress = useUserAddressFactory<any, any>(params);
};

describe('[CORE - factories] useUserAddressFactory', () => {
  beforeEach(() => {
    inputAddresses = [];
    jest.clearAllMocks();
    createComposable();
  });

  describe('initial setup', () => {
    it('should have proper initial properties', () => {
      const { addresses, loading } = useUserAddress();

      expect(Array.isArray(addresses.value)).toBeTruthy();
      expect(addresses.value).toHaveLength(0);
      expect(loading.value).toBeFalsy();
    });
  });

  describe('error handling', () => {
    it('should throw an error', async () => {
      createComposable({
        ...params,
        addAddress: async () => {
          throw new Error('mocked error');
        }
      });

      const { addAddress } = useUserAddress();

      let errorMessage = '';

      try {
        await addAddress('any', 'any');
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).toBe('mocked error');
    });
  });

  describe('computed', () => {
    it('should have correct totalAddresses', async () => {
      const { searchAddresses, totalAddresses } = useUserAddress();

      await searchAddresses();

      expect(totalAddresses.value).toEqual(3);
    });
  });

  describe('methods', () => {
    describe('addAddress', () => {
      it('should add an address', async () => {
        const { addAddress, addresses } = useUserAddress();

        await addAddress('any address', 'billing');

        expect(addresses.value).toHaveLength(4);
        expect(addresses.value[3]).toEqual('address4');
      });
    });

    describe('deleteAddress', () => {
      it('should remove an address', async () => {
        const { deleteAddress, addresses } = useUserAddress();

        await deleteAddress('any adresss');

        expect(addresses.value).toHaveLength(2);
      });
    });

    describe('updateAddress', () => {
      it('should update an address', async () => {
        const { updateAddress, addresses } = useUserAddress();

        await updateAddress('any address');

        expect(addresses.value).toHaveLength(3);
        expect(addresses.value[1]).toEqual('updatedAddress');
      });
    });

    describe('getBillingAddresses', () => {
      it('should return billing addresses', async () => {
        const { searchAddresses, getBillingAddresses } = useUserAddress();

        await searchAddresses();

        const addresses = getBillingAddresses();

        expect(addresses).toHaveLength(1);
        expect(addresses[0]).toEqual('address1');
      });
    });

    describe('getShippingAddresses', () => {
      it('should return shipping addresses', async () => {
        const { searchAddresses, getShippingAddresses } = useUserAddress();

        await searchAddresses();

        const addresses = getShippingAddresses();

        expect(addresses).toHaveLength(2);
        expect(addresses[0]).toEqual('address2');
        expect(addresses[1]).toEqual('address3');
      });
    });
  });
});
