import { UseProduct, SearchResult } from '@vue-storefront/interfaces';
import { ref, Ref, computed } from '@vue/composition-api';
import { useSSR } from '@vue-storefront/utils';

type SearchParams = {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
}

export type UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS extends SearchParams> = {
  productsSearch: (searchParams: PRODUCT_SEARCH_PARAMS) => Promise<SearchResult<PRODUCT>>;
};

export function useProductFactory<PRODUCT, PRODUCT_SEARCH_PARAMS>(
  factoryParams: UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS>
) {
  return function useProduct(cacheId: string): UseProduct<PRODUCT> {
    const { state } = useSSR(cacheId);
    const products: Ref<PRODUCT[]> = ref(state || []);
    const totalProducts = ref(0);
    const loading = ref(false);

    const search = async (params: any) => {
      loading.value = true;
      const { data, total } = await factoryParams.productsSearch(params);
      products.value = data;
      totalProducts.value = total;
      loading.value = false;
    };

    return {
      products: computed(() => products.value),
      totalProducts: computed(() => totalProducts.value),
      search,
      loading: computed(() => loading.value)
    };
  };
}
