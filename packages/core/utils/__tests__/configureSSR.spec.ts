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
    const saveCacheMock = jest.fn();
    const useSSRMock = jest.fn(() => ({
      state: 'some state',
      saveCache: saveCacheMock
    }));

    configureSSR({ useSSR: useSSRMock });

    const { state, saveCache } = useSSR('cache-id');
    saveCache('some value');

    expect(useSSRMock).toBeCalledWith('cache-id');
    expect(saveCacheMock).toBeCalledWith('some value');
    expect(state).toEqual('some state');
  });
});
