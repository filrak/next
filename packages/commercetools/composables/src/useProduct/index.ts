import { UseProduct } from '@vue-storefront/interfaces';
import { usePersistedState } from '@vue-storefront/utils';
import { ref, Ref } from '@vue/composition-api';
import { getProduct } from '@vue-storefront/commercetools-api';
import { enhanceProduct } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';

interface UseProductSearchParams {
  slug?: string;
  catIds?: string[];
  skus?: string[];
}

type Search = (params: UseProductSearchParams) => void

const loadProductVariants = async (params: UseProductSearchParams): Promise<ProductVariant[]> => {
  const productResponse = await getProduct(params);
  const enhancedProductResponse = enhanceProduct(productResponse);

  return (enhancedProductResponse.data as any)._variants;
};

export default function useProduct(id: string): UseProduct<ProductVariant, Search> {
  const { state, persistedResource } = usePersistedState(id);
  const products: Ref<any> = ref(state || []);
  const loading = ref(false);
  const error = ref(null);

  const search = async (params: UseProductSearchParams) => {
    products.value = await persistedResource(loadProductVariants, params);
  };

  return {
    products,
    search,
    loading,
    error
  };
}
