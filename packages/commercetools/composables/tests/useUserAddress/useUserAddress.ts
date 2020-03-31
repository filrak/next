import useUserAddress from '../../src/useUserAddress';

const defaultUserAddresses = Object.freeze({
  billingAddressIds: ['1'],
  shippingAddressIds: ['2', '3'],
  addresses: [
    {
      id: '1',
      country: 'EN'
    },
    {
      id: '2',
      country: 'EN'
    },
    {
      id: '3',
      country: 'EN'
    }
  ]
});

const mockResponse = (customerData) => ({
  data: {
    updateMyCustomer: customerData
  }
});

jest.mock('@vue-storefront/commercetools-api', () => ({
  addCustomerAddress: async (customer, address) => mockResponse({
    ...defaultUserAddresses,
    addresses: [
      ...defaultUserAddresses.addresses,
      address
    ]
  }),
  assignCustomerAddress: async (customer, address) => mockResponse({
    ...defaultUserAddresses,
    billingAddressIds: [
      ...defaultUserAddresses.billingAddressIds,
      address.id
    ]
  }),
  removeCustomerAddress: async (customer, address) => mockResponse({
    ...defaultUserAddresses,
    addresses: defaultUserAddresses.addresses.filter(a => a.id !== address.id)
  }),
  updateCustomerAddress: async (customer, address) => mockResponse({
    ...defaultUserAddresses,
    addresses: defaultUserAddresses.addresses.map(a => a.id === address.id ? address : a)
  })
}));

describe('[commercetools-composables] useUserAddress', () => {
  it('creates properties', () => {
    const { addresses, loading } = useUserAddress();

    expect(Array.isArray(addresses.value)).toBeTruthy();
    expect(addresses.value).toHaveLength(0);
    expect(loading.value).toBeFalsy();
  });

  it('should add a new address', async () => {
    const { addAddress } = useUserAddress();

    const { user, addresses } = await addAddress({ id: '4', country: 'EN' } as any, 'billing');

    expect(addresses).toHaveLength(4);
    expect(addresses[3].id).toEqual('4');
    expect(user.billingAddressIds).toHaveLength(2);
    expect(user.billingAddressIds[1]).toEqual('4');
  });

  it('should remove an address', async () => {
    const { deleteAddress } = useUserAddress();

    const { addresses } = await deleteAddress({ id: '1' } as any);

    expect(addresses).toHaveLength(2);
  });

  it('should update an address', async () => {
    const { updateAddress } = useUserAddress();

    const { addresses } = await updateAddress({ id: '1', country: 'PL' } as any);

    expect(addresses).toHaveLength(3);
    expect(addresses[0].country).toBe('PL');
  });

  it('should return billing addresses', async () => {
    const { getBillingAddresses } = useUserAddress();

    const addresses = getBillingAddresses();

    expect(addresses).toHaveLength(1);
    expect(addresses[0].id).toEqual('1');
  });

  it('should return shipping addresses', async () => {
    const { getShippingAddresses } = useUserAddress();

    const addresses = getShippingAddresses();

    expect(addresses).toHaveLength(2);
    expect(addresses[0].id).toEqual('2');
    expect(addresses[1].id).toEqual('3');
  });
});
