import { UseProduct } from '@vue-storefront/interfaces';
import { ref, Ref, computed } from '@vue/composition-api';

type SearchParams = {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
}

export type ProductsSearchResult<PRODUCT> = {
  data: PRODUCT[];
  total: number;
};

export type UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS extends SearchParams> = {
  productsSearch: (searchParams: PRODUCT_SEARCH_PARAMS) => Promise<ProductsSearchResult<PRODUCT>>;
};

export function useProductFactory<PRODUCT, PRODUCT_SEARCH_PARAMS>(
  factoryParams: UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS>
) {
  return function useProduct(cacheId: string): UseProduct<PRODUCT> {
    console.info(
      'SSR Temporarly disbled for product composable https://github.com/DivanteLtd/next/issues/232',
      cacheId
    );
    // const { state, persistedResource } = usePersistedState(id);

    // const products: Ref<ProductVariant[]> = ref(state || []);\
    const products: Ref<ProductsSearchResult<PRODUCT>> = ref({ data: [], total: 0 });
    const loading = ref(false);

    const search = async (params: PRODUCT_SEARCH_PARAMS) => {
      loading.value = true;
      // products.value = await persistedResource<ProductVariant[]>(loadProductVariants, params);
      products.value = await factoryParams.productsSearch(params);
      loading.value = false;
    };

    return {
      products: {
        data: computed(() => products.value.data),
        total: computed(() => products.value.total)
      },
      search,
      loading: computed(() => loading.value)
    };
  };
}
