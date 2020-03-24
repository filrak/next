import { getCurrentInstance, onServerPrefetch } from '@vue/composition-api';
import eventBus from './eventBus';

const getRootState = (vm: any) => {
  if (vm.$isServer) {
    return vm.$ssrContext.nuxt.vsfState;
  }

  // @ts-ignore
  return window.__VSF_STATE__ || {};
};

export const useSSR = (key: string) => {
  const vm = getCurrentInstance() as any;
  const isServer = vm.$isServer;

  if (isServer && !vm.$ssrContext.nuxt.vsfState) {
    vm.$ssrContext.nuxt.vsfState = {};
  }

  const saveCache = (value) => {
    eventBus.emit('set-ssr-cache', { key, value });
  };

  return {
    saveCache,
    state: getRootState(vm)[key]
  };
};

let snapsshot = 0;

const hasWindowStateChanged = () => {
  // @ts-ignore
  const currentSnapshot = JSON.stringify(window.__VSF_STATE__).length;

  if (snapsshot !== currentSnapshot) {
    snapsshot = currentSnapshot;

    return true;
  }

  return false;
};

export const onSSR = (func) => {
  const vm = getCurrentInstance() as any;
  const isServer = vm.$isServer;

  if (isServer && !vm.$ssrContext.nuxt.vsfState) {
    vm.$ssrContext.nuxt.vsfState = {};
  }

  onServerPrefetch(async () => {
    await func();

    eventBus.on('set-ssr-cache', ({ key, value }) => {
      vm.$ssrContext.nuxt.vsfState[key] = value;
    });
  });

  if (!isServer && !hasWindowStateChanged()) {
    func();
  }
};
