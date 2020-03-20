import { getCurrentInstance, onServerPrefetch } from '@vue/composition-api';
import { useSSR, onSSR, eventBus } from '../src';

jest.mock('@vue/composition-api');
jest.mock('./../src/event-bus', () => ({
  on: jest.fn(),
  emit: jest.fn()
}));

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

  it('reads CSR state', () => {
    // (eventBus.emit as any).mockImplementation((_, fn) =>
    //   fn({ key: 'cache-id', value: 'test-value' })
    // );
    // const { saveCache } = useSSR('some-cache-id');

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
    (eventBus.on as any).mockImplementation((_, fn) =>
      fn({ key: 'cache-id', value: 'test-value' })
    );
    (getCurrentInstance as any).mockImplementation(() => vm);
    (onServerPrefetch as any).mockImplementation(async (fn: any) => {
      await fn();
      expect(eventBus.on).toBeCalled();
      expect(vm.$ssrContext.nuxt.vsfState).toEqual({ 'cache-id': 'test-value' });
    });
    const mockedFunc = jest.fn();

    onSSR(mockedFunc);
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

    onSSR(mockedFunc);
    expect(mockedFunc).toBeCalledTimes(1);
  });
});
