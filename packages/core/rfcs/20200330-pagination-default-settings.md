# Getting default pagination settings from composables

Default pagination settings should be delivered to the user of the implementation package.
Those settings need to be configurable in the API Client but also possible to modify them through special function.

## Motivation

Package user can set global defaults for pagination for all composables and modify the defaults per composable usage.
The store owner might also be able to modify default page size on the platform and expect Storefront to adapt the change if it's reachable via API.

## New APIs

### Factories

Each factory for a composable that has paginated `search` (like `useProduct`, `useUserOrders`) is accepting additional function in params: `loadDefaultPaginationSettings` - this will return the defaults for pagination (default page size, available page sizes as an array of numbers).

Example of new params in `UseProductFactory`:

```typescript
export type PaginationSettings = {
  defaultPageSize: number;
  pageSizeOptions: number[];
};

export type UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS extends SearchParams> = {
  productsSearch: (searchParams: PRODUCT_SEARCH_PARAMS) => Promise<SearchResult<PRODUCT>>;
  loadDefaultPaginationSettings: () => Promise<PaginationSettings>;
};
```

### Composables

The composable function exposes those settings as a computed property and also a function that will modify those defaults.

Example in `UseProductFactory`:

```typescript
const paginationSettings: PaginationSettings = ref(null);

params.loadDefaultPaginationSettings().then(settings => paginationSettings.value = settings);

const updatePaginationDefaults = (settings: PaginationSettings) => paginationSettings.value = settings;

return {
  products: computed(() => products.value),
  ...
  paginationSettings: computed(() => paginationSettings.value),
  updatePaginationDefaults
};
```

## Migration process

Providing `loadDefaultPaginationSettings` in composables with paginated search is the only step needed.
