import useCategory from './../../src/useCategory';

const mockedResponse = [
  { name: 'cat1', id: 'bbb' },
  { name: 'cat2', id: 'aaa' },
  { name: 'cat3', id: 'fcd' }
];

jest.mock('@vue-storefront/about-you-api', () => ({
  getCategory: () =>
    Promise.resolve({
      data: mockedResponse
    })
}));

describe('[about-you-composables] useCategory', () => {
  it('creates properties', () => {
    const { categories, loading } = useCategory('test-category');

    expect(categories.value).toEqual([]);
    expect(loading.value).toEqual(false);
  });

  it('returns category response', async () => {
    const { search, categories, loading } = useCategory('test-category');

    expect(loading.value).toBeFalsy();
    await search({ path: ['category-slug'] });

    expect(categories.value).toEqual(mockedResponse);
    expect(loading.value).toBeFalsy();
  });
});
