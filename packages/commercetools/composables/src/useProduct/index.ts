import { getProduct } from '@vue-storefront/commercetools-api';
import { enhanceProduct } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';
import { useProductFactory, ProductsSearchResult } from '@vue-storefront/factories';
import { ProductSearch } from '@vue-storefront/commercetools-api/lib/src/types/Api';

const loadProductVariants = async (params: ProductSearch): Promise<ProductsSearchResult<ProductVariant>> => {
  const productResponse = await getProduct(params);
  const enhancedProductResponse = enhanceProduct(productResponse);

  return (enhancedProductResponse.data as any)._variants;
};

export default useProductFactory<ProductVariant, ProductSearch>({ productsSearch: loadProductVariants });
