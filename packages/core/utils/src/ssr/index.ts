import { createStore } from 'pinia';
import { onServerPrefetch } from '@vue/composition-api';

type ResourceFunction<T> = (params: any) => Promise<T>

const hashObject = (obj: any): string => {
  const hashNumber = JSON.stringify(obj)
    .split('')
    .reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);

      return a & a;
    }, 0);

  return (hashNumber < 0 ? hashNumber >>> 0 : hashNumber).toString(16);
};

const persistedResource = <T>(fn: ResourceFunction<T>, params: any): Promise<T> => new Promise((resolve) => {
  const store = createStore({ id: hashObject(params) });
  const handleRequest = () => fn(params).then((res) => {
    (store as any).state = res;
    resolve((store as any).state);
  });

  // @ts-ignore
  if (typeof window === 'undefined') {
    onServerPrefetch(() => handleRequest());
    return;
  }

  handleRequest();
});

export { persistedResource };
