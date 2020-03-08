import { api } from './';
import { ProductWith, ProductSearchQuery, ProductSortConfig, Pagination } from './types/productSearchParams';

type getProductSearchParams = { id: number; pWith: ProductWith; pWhere: ProductSearchQuery; pSort: ProductSortConfig; pPagination: Pagination; masterKey: string };

export default function(params: getProductSearchParams): Promise<any> {
  let {
    pWith,
    pWhere,
    pSort,
    pPagination
  } = params;

  if (!pWith) {
    pWith = {};
  }
  if (!pWhere) {
    pWhere = {};
  }
  if (!pSort) {
    pSort = {};
  }
  if (!pPagination) {
    pPagination = {};
  }

  const {
    id,
    masterKey
  } = params;

  if (id) {
    return api.products.getById(id, { with: pWith });
  } else if (masterKey) {
    return api.products.getByMasterkey(masterKey);
  } else {
    return api.products.query({
      with: pWith,
      where: pWhere,
      sort: pSort,
      pagination: pPagination
    });
  }
}
