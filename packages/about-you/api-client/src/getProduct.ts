import { api } from './';
import { ProductWith } from '@aboutyou/backbone/types/ProductWith';
import { ProductSearchQuery } from '@aboutyou/backbone/types/ProductSearchQuery';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { ProductSortConfig } from '@aboutyou/backbone/endpoints/products/products';
import { Pagination } from '@aboutyou/backbone/endpoints/products/productsByIds';

type getProductSearchParams = { ids: number[]; pWith: ProductWith; where: ProductSearchQuery; sort: ProductSortConfig; pagination: Pagination; masterKey: string; campaignKey; term: string };

export default async function(params: getProductSearchParams): Promise<BapiProduct[]> {
  let {
    pWith,
    where,
    sort,
    campaignKey
  } = params;

  if (!campaignKey) {
    campaignKey = '';
  }
  if (!pWith) {
    pWith = {};
  }
  if (!where) {
    where = {};
  }
  if (!sort) {
    sort = {};
  }

  const {
    ids,
    masterKey,
    pagination,
    term
  } = params;

  if (ids) {
    const response = await api.products.getByIds(ids, { with: pWith, campaignKey });
    return response;
  } else if (masterKey) {
    const response = await api.masters.getByKey(masterKey, { with: { products: pWith }, campaignKey });
    return response.products;
  } else if (term) {
    const response = await api.search.suggestions(term, campaignKey);
    return response.products;
  } else {
    const response = await api.products.query({ where, with: pWith, sort, pagination });
    return response.entities;
  }
}
