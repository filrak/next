import getCategory from '../../../src/api/getCategory';
import { apiClient } from '../../../src/index';

const mockGetByIds = jest.fn((params) => params);
const mockGetByPath = jest.fn((params) => params);
const mockGetRoots = jest.fn((params) => params);

apiClient.categories.getByIds = mockGetByIds;
apiClient.categories.getByPath = mockGetByPath;
apiClient.categories.getRoots = mockGetRoots;

describe('[about-you-api-client] getCategory', () => {
  it('fetches category with default query', async () => {
    const searchParams = {};
    await getCategory(searchParams);

    expect(mockGetRoots).toHaveBeenCalledWith(searchParams);
  });

  it('fetches categoy by ids', async () => {
    const searchParams = { ids: [1], depth: 1 };
    await getCategory(searchParams);

    expect(mockGetByIds).toHaveBeenCalledWith(searchParams.ids, { depth: searchParams.depth });
  });

  it('fetches category with path', async () => {
    const searchParams = { path: [''], with: {} };
    await getCategory(searchParams);

    expect(mockGetByPath).toHaveBeenCalledWith(searchParams.path, { with: searchParams.with });
  });
});
