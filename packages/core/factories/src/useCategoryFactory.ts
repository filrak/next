import { UseCategory } from '@vue-storefront/interfaces';
import { useSSR } from '@vue-storefront/utils';
import { ref, Ref, computed } from '@vue/composition-api';

export type UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS> = {
  categorySearch: (searchParams: CATEGORY_SEARCH_PARAMS) => Promise<CATEGORY[]>;
};

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS>(
  factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS>
) {
  return function useCategory(cacheId?: string): UseCategory<CATEGORY> {
    const { state, saveCache } = useSSR(cacheId);
    const categories: Ref<CATEGORY[]> = ref(state || []);
    const loading = ref(false);

    const search = async (params: CATEGORY_SEARCH_PARAMS) => {
      loading.value = true;
      categories.value = await factoryParams.categorySearch(params);
      saveCache(categories.value);
      loading.value = false;
    };

    return {
      search,
      loading: computed(() => loading.value),
      categories: computed(() => categories.value)
    };
  };
}
