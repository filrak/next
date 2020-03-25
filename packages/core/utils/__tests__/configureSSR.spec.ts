import { configureSSR, useSSR } from './../src/ssr';

const vm = {
  $isServer: true,
  $ssrContext: {
    nuxt: {
      vsfState: null
    }
  }
};

jest.mock('@vue/composition-api', () => ({
  getCurrentInstance: () => vm
}));

describe('[CORE - utils] configureSSR', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('configures ssr implementation', () => {
    const saveToCacheMock = jest.fn();
    const useSSRMock = jest.fn(() => ({
      cache: 'some state',
      saveToCache: saveToCacheMock
    }));

    configureSSR({ useSSR: useSSRMock });

    const { cache, saveToCache } = useSSR('cache-id');
    saveToCache('some value');

    expect(useSSRMock).toBeCalledWith('cache-id');
    expect(saveToCacheMock).toBeCalledWith('some value');
    expect(cache).toEqual('some state');
  });
});
