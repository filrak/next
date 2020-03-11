import useProduct from '../../src/useProduct';

const mockedResponse = [
  {
    id: 4004080,
    isActive: true,
    isSoldOut: false,
    isNew: true,
    createdAt: '2018-09-17T14:34:37+02:00',
    updatedAt: '2018-09-17T14:34:37+02:00',
    masterKey: '298022-74',
    images: []
  }
];

jest.mock('@vue-storefront/about-you-api', () => ({
  getProduct: () =>
    Promise.resolve({
      data: mockedResponse
    })
}));

describe('[about-you-composables] useProduct', () => {
  it('creates properties', () => {
    const { products, loading } = useProduct({});

    expect(products.value).toEqual([]);
    expect(loading.value).toEqual(false);
  });

  it('returns product response', async () => {
    const { search, products } = useProduct({});

    await search({ term: 'product-slug' });

    expect(products.value).toEqual(mockedResponse);
  });
});
