export interface ProductWith {
  attributes?: AttributeInclude;
  advancedAttributes?: AttributeInclude;
  variants?:
    | 'all'
    | {
        attributes?: AttributeInclude;
        advancedAttributes?: AttributeInclude;
      };
  images?: ProductImageWith;
  siblings?: 'all' | ProductWith;
  categories?: 'all';
}

export type AttributeInclude = 'all' | AttributeFilter;

type AttributeFilter = AttributeKeyFilter | AttributeTypeFilter;

interface AttributeKeyFilter {
  withKey: string[];
  ofType?: undefined;
}

interface AttributeTypeFilter {
  ofType: string[];
  withKey?: undefined;
}

export type ProductImageWith = | 'all' | { withKey?: string[]; legacy?: false }

export interface ProductSearchQuery {
  categoryId?: number;
  term?: string;
  minPrice?: number;
  maxPrice?: number;
  attributes?: Array<
    AttributeWithValuesFilter | AttributeWithBooleanValueFilter
  >;
}

export interface ProductSortConfig {
  by?: APISortOption;
  direction?: APISortOrder;
}

export enum APISortOption {
  Price = 'price',
  DateAdded = 'new',
  Reduction = 'reduction'
}

export enum APISortOrder {
  Ascending = 'asc',
  Descending = 'desc'
}

export interface Pagination {
  page?: number;
  perPage?: number;
}
