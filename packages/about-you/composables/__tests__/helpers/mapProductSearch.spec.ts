import { getProduct } from '@vue-storefront/about-you-api';
import mapProductSearch from '../../src/helpers/mapProductSearch';

jest.mock('@vue-storefront/about-you-api', () => ({
  getProduct: jest.fn(() => {})
}));

describe('[about-you-helpers] mapProductSearch', () => {
  it('return products and it total length', async () => {
    const params = {
      ids: 123,
      with: 10,
      where: 45,
      sort: 0,
      pagination: {
        page: 1
      },
      masterKey: 321,
      term: ''
    };
    getProduct.mockReturnValueOnce([params]);
    const products = await mapProductSearch(params);

    expect(getProduct).toHaveBeenCalled();
    expect(products).toEqual({data: [params], total: 1});
  });
});

