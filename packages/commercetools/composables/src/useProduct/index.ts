import { getProduct } from '@vue-storefront/commercetools-api';
import { enhanceProduct, mapPaginationParams } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';
import { useProductFactory } from '@vue-storefront/factories';
import { SearchResult, AgnosticProductSearchParams } from '@vue-storefront/interfaces';

const productsSearch = async (params: AgnosticProductSearchParams): Promise<SearchResult<ProductVariant>> => {
  const apiSearchParams = {
    ...params,
    ...mapPaginationParams(params)
  };
  const productResponse = await getProduct(apiSearchParams);
  const enhancedProductResponse = enhanceProduct(productResponse);
  return {
    data: (enhancedProductResponse.data as any)._variants,
    total: productResponse.data.products.total
  };
};

export default useProductFactory<ProductVariant, AgnosticProductSearchParams>({ productsSearch });
