import { api } from './';
import { ProductWith } from '@aboutyou/backbone/types/ProductWith';
import { ProductSearchQuery } from '@aboutyou/backbone/types/ProductSearchQuery';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { ProductSortConfig } from '@aboutyou/backbone/endpoints/products/products';
import { Pagination } from '@aboutyou/backbone/endpoints/products/productsByIds';

type getProductSearchParams = { ids: number[]; with: ProductWith; where: ProductSearchQuery; sort: ProductSortConfig; pagination: Pagination; masterKey: string; campaignKey; term: string };

export default async function(options: getProductSearchParams): Promise<BapiProduct[]> {
  if (!options) {
    this.options = {};
  }

  if (options.ids) {
    return await api.products.getByIds(
      options.ids,
      {
        with: options.with,
        campaignKey: options.campaignKey
      }
    );
  } else if (options.masterKey) {
    return await api.masters.getByKey(
      options.masterKey,
      {
        with: {
          products: options.with
        },
        campaignKey: options.campaignKey
      }).products;
  } else if (options.term) {
    return await api.search.suggestions(
      options.term,
      options.campaignKey
    ).products;
  } else {
    return await api.products.query(
      {
        where: options.where,
        with: options.with,
        sort: options.sort,
        pagination: options.pagination
      }).entities;
  }
}
