import { getCurrentInstance, onServerPrefetch } from '@vue/composition-api';
import eventBus from './../src/ssr/default/eventBus';
import { useSSR, onSSR } from '../src';
import { stringify } from 'querystring';

jest.mock('@vue/composition-api');
jest.mock('./../src/ssr/default/eventBus', () => ({
  on: jest.fn(),
  emit: jest.fn()
}));

describe('[CORE - utils] ssr', () => {
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
    (eventBus.emit as any).mockImplementation(() => {});
    const { saveCache } = useSSR('some-cache-id');
    saveCache('test-value');

    expect(eventBus.emit).toBeCalled();
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

    const jsonSpy = jest.spyOn(JSON, 'stringify').mockImplementation(() => ({ length: 0 } as any));

    (getCurrentInstance as any).mockImplementation(() => vm);
    (onServerPrefetch as any).mockImplementation(() => {});
    const mockedFunc = jest.fn();

    onSSR(mockedFunc);
    expect(mockedFunc).toBeCalledTimes(1);

    jsonSpy.mockRestore();
  });

  it('should not call func on CSR', () => {
    const vm = {
      $isServer: false,
      $ssrContext: {
        nuxt: {
          vsfState: null
        }
      }
    };

    // @ts-ignore
    const windowSpy = jest.spyOn(global, 'window', 'get').mockImplementation(() => ({ __VSF_STATE__: { test: 1 } }));

    (getCurrentInstance as any).mockImplementation(() => vm);
    (onServerPrefetch as any).mockImplementation(() => {});
    const mockedFunc = jest.fn();

    onSSR(mockedFunc);
    expect(mockedFunc).not.toBeCalled();

    windowSpy.mockRestore();
  });
});
