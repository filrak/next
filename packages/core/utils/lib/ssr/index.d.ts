declare type ResourceFunction<T> = (params: any) => Promise<T>;
declare const persistedResource: <T>(fn: ResourceFunction<T>, params: any) => Promise<T>;
export { persistedResource };
