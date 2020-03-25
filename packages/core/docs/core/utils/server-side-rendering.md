# Server-side rendering

Sometimes our composables needs to load some data and share that state between client and the server side.
We provide our custom mechanism to create server-side rendered pages used with composables functions.

## Usage

In the most cases, the composable functions provide SSR support (it is always transparent for developer).
To build that composable you have to create a new composable-factory with using `useSSR` function.

```js
import { useSSR } from '@vue-storefront/utils';

const useCategory = (cacheId) => {
  const { cache, saveToCache } = useSSR(cacheId);
  const categories = ref(cache || []);

  const search = async (params) => {
    categories.value = await factoryParams.categorySearch(params);
    saveToCache(categories.value )
  };

  return {
    search,
    categories: computed(() => categories.value)
  };
};
```

The `useSSR` returns `cache` field that keeps shared state between client-side and server-side under the key you provided as an argument to the created composable (`cacheId`) and `saveToCache` function to populate loaded data into the cache. Now created factory supports SSR.

## Your own SSR implementation

It's possible to create your own implementation of shared-state. In that case you have to provide implementation of the `useSSR`.

```js
import { configureSSR } from '@vue-storefront/utils';

configureSSR({
  useSSR: (id: string) => {
    const cache = {}; // persisted cache

    const saveToCache = (value: any) => {
      // saving loaded data
    };

    return {
      cache,
      saveToCache
    };
  }
});
```

## Temporary solution

By default we do support SSR and shared-state using nuxt features. Furthermore, we can't use multiple async calls in the setup function that depend on each other (eg. loading products by id of category that you have to fetch first). To solve this problem we provide a temporary solution - `onSSR`.

in your theme:

```js
import { useExample } from 'your/integration/composables';
import { onSSR } from '@vue-storefront/utils';

export default {
  setup() {
    const { search: searchOne, exampleOne } = useExample('examples-page1');
    const { search: searchTwo, exampleTwo } = useExample('examples-page2');

    onSSR(async () => {
      await searchOne();
      await searchTwo(exampleOne.id);
    })

    return {
      examples
    }
  }
}

```

In the future, Vue 3 will provide an async setup and `onSSR` won't be needed anymore:

```js
import { useExample } from 'your/integration/composables';
import { onSSR } from '@vue-storefront/utils';

export default {
  async setup() {
    const { search: searchOne, exampleOne } = useExample('examples-page1');
    const { search: searchTwo, exampleTwo } = useExample('examples-page2');

    await searchOne();
    await searchTwo(exampleOne.id);

    return {
      examples
    }
  }
}

```
