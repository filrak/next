import { getCurrentInstance, onServerPrefetch } from '@vue/composition-api';

const getRootState = (vm: any) => {
  if (vm.$isServer) {
    return vm.$ssrContext.nuxt.vsfState;
  }

  // @ts-ignore
  return window.__VSF_STATE__ || {};
};

export const useSSR = (id: string) => {
  const vm = getCurrentInstance() as any;
  const isServer = vm.$isServer;

  if (isServer && !vm.$ssrContext.nuxt.vsfState) {
    vm.$ssrContext.nuxt.vsfState = {};
  }

  return {
    state: getRootState(vm)[id]
  };
};

export const onSSR = (func, cacheIds) => {
  const vm = getCurrentInstance() as any;
  const isServer = vm.$isServer;

  if (isServer && !vm.$ssrContext.nuxt.vsfState) {
    vm.$ssrContext.nuxt.vsfState = {};
  }

  onServerPrefetch(async () => {
    await func();

    Object.keys(cacheIds).forEach((key) => {
      vm.$ssrContext.nuxt.vsfState[key] = cacheIds[key].value;
    });
  });

  if (!isServer) {
    func();
  }
};
