import { useSSR as defaultUseSSR, onSSR } from './default';

interface UseSSRValues {
  cache: any;
  saveToCache: (value: any) => void;
}

type UseSSR = (key: string) => UseSSRValues;

interface SSRConfiguration {
  useSSR: UseSSR;
}

let useSSR = defaultUseSSR;

const configureSSR = (config: SSRConfiguration) => {
  useSSR = config.useSSR;
};

export {
  onSSR,
  configureSSR,
  useSSR
};
