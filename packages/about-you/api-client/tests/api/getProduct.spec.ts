import getProduct from './../../src/api/getProduct';
import { apiClient } from './../../src/index';

const mockGetById = jest.fn((params) => params);
const mockGetByIds = jest.fn((params) => params);
const mockQuery = jest.fn((params) => params);

const mockGetByKey = jest.fn((params) => params);
const mockSuggestions = jest.fn((params) => params);

apiClient.products.getById = mockGetById;
apiClient.products.getByIds = mockGetByIds;
apiClient.products.query = mockQuery;

apiClient.masters.getByKey = mockGetByKey;
apiClient.search.suggestions = mockSuggestions;

describe('[about-you-api-client] getProduct', () => {
  it('fetches product with default query', async () => {
    const searchParams = {};
    await getProduct(searchParams);

    expect(mockQuery).toHaveBeenCalledWith(searchParams);
  });

  it('fetches product by Ids', async () => {
    const searchParams = { ids: [1], with: {} };
    await getProduct(searchParams);

    expect(mockGetByIds).toHaveBeenCalledWith(searchParams.ids, { with: searchParams.with });
  });

  it('fetches product with masterKey', async () => {
    const searchParams = { masterKey: '123', with: {} };
    await getProduct(searchParams);

    expect(mockGetByKey).toHaveBeenCalledWith(searchParams.masterKey, { with: { products: searchParams.with }});
  });

  it('fetches product with term', async () => {
    const searchParams = { term: 'shirt' };
    await getProduct(searchParams);

    expect(mockSuggestions).toHaveBeenCalledWith(searchParams.term);
  });
});
