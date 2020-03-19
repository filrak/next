import { getCurrentInstance, onServerPrefetch } from '@vue/composition-api';
import { useSSR, onSSR } from '../src';

jest.mock('@vue/composition-api');

describe('[CORE - utils] usePersistedState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('set epmty SSR state', () => {
    const vm = {
      $isServer: true,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };

    (getCurrentInstance as any).mockImplementation(() => vm);

    useSSR('some-cache-id');

    expect(vm.$ssrContext.nuxt.vsfState).toEqual({});
  });

  it('reads SSR state', () => {
    const vm = {
      $isServer: true,
      $ssrContext: {
        nuxt: {
          vsfState: {
            'some-cache-id': 'test'
          }
        }
      }
    };

    (getCurrentInstance as any).mockImplementation(() => vm);

    const { state } = useSSR('some-cache-id');

    expect(state).toEqual('test');
  });

  it('reads CSR state', () => {
    const vm = {
      $isServer: false,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };

    // @ts-ignore
    window.__VSF_STATE__ = { 'some-cache-id': 5 };
    (getCurrentInstance as any).mockImplementation(() => vm);

    const { state } = useSSR('some-cache-id');

    expect(state).toEqual(5);
  });

  it('set SSR state', () => {
    const vm = {
      $isServer: true,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };
    (getCurrentInstance as any).mockImplementation(() => vm);
    (onServerPrefetch as any).mockImplementation(async (fn: any) => {
      await fn();
      expect(vm.$ssrContext.nuxt.vsfState).toEqual({ cacheId: 'test-value' });
    });
    const mockedFunc = jest.fn();

    onSSR(mockedFunc, { cacheId: { value: 'test-value' } });
    expect(mockedFunc).toBeCalledTimes(1);
  });

  it('call func on CSR', () => {
    const vm = {
      $isServer: false,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };
    (getCurrentInstance as any).mockImplementation(() => vm);
    (onServerPrefetch as any).mockImplementation(() => {});
    const mockedFunc = jest.fn();

    onSSR(mockedFunc, { cacheId: { value: 'test-value' } });
    expect(mockedFunc).toBeCalledTimes(1);
    expect(vm.$ssrContext.nuxt.vsfState).toEqual(null);
  });
});
