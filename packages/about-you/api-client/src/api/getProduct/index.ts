import { apiClient } from '../..';
import { ProductWith } from '@aboutyou/backbone/types/ProductWith';
import { ProductSearchQuery } from '@aboutyou/backbone/types/ProductSearchQuery';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { ProductSortConfig } from '@aboutyou/backbone/endpoints/products/products';
import { Pagination } from '@aboutyou/backbone/endpoints/products/productsByIds';

type getProductSearchParams = { ids?: number[]; with?: ProductWith; where?: ProductSearchQuery; sort?: ProductSortConfig; pagination?: Pagination; masterKey?: string; term?: string };

export default async function(options: getProductSearchParams = {}): Promise<BapiProduct[]> {
  if (options.ids) {
    return await apiClient.products.getByIds(
      options.ids,
      {
        with: options.with
      }
    );
  } else if (options.masterKey) {
    const { products } = await apiClient.masters.getByKey(
      options.masterKey,
      {
        with: {
          products: options.with
        }
      });
    return products;
  } else if (options.term) {
    const { products } = await apiClient.search.suggestions(
      options.term
    );
    return products;
  } else {
    const { entities } = await apiClient.products.query(
      {
        where: options.where,
        with: options.with,
        sort: options.sort,
        pagination: options.pagination
      });
    return entities;
  }
}
