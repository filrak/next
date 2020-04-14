# Filtering products

Filtering products is an important part of any products listing page. To ensure the best developer experience and consistency between integrations (because filters have to be delivered to the theme in a unified form) we need to provide a common way to retrieve available filters and unified interface for them.

## New APIs

### Modify `useProduct` composable

Since there are several factors that the filters depend on (products type, category, available products, their attributes) and the set of filters might be dynamic, this feature should introduce new field in the `useProduct` composable, `availableFilters`, like in the example below.

**New interface**:

```ts
export interface UseProduct<PRODUCT, FILTER_OPTION> {
  products: ComputedProperty<PRODUCT[]>;
  totalProducts: ComputedProperty<number>;
  availableFilters: ComputedProperty<Filter<FILTER_OPTION>[]>;
  search: (params: {
    perPage?: number;
    page?: number;
    sort?: any;
    term?: any;
    filters?: Filter<FILTER_OPTION>[];
    [x: string]: any;
  }) => Promise<void>;
  loading: ComputedProperty<boolean>;
  [x: string]: any;
}
```

**`UseProductFactoryParams` interface**

Loading filters, their possible values, counts, etc. will require an integration-specific logic that will be part of the search function, so the factory params interface needs a new interface for search function result:

```ts
export interface FilteredSearchResult<T, FILTER_OPTION> extends SearchResult<T> {
  availableFilters: Filter<FILTER_OPTION>[];
}
```

### Filter interface

We need a unified interface for filters, like:

```ts
interface Filter<FILTER_OPTION> {
  name: string;
  label: string;
  options: FILTER_OPTION[]
}
```

## Migration process

- Add `FILTER_OPTION` type to `useProduct` on integration side.
- Implement getting available filters in `searchProducts` factory param (optional).
- Implement handling filters in products search (optional).
