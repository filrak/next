import { UseCategory } from '@vue-storefront/interfaces';
import { useSSR, eventBus } from '@vue-storefront/utils';
import { ref, Ref, computed } from '@vue/composition-api';

export type UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS> = {
  categorySearch: (searchParams: CATEGORY_SEARCH_PARAMS) => Promise<CATEGORY[]>;
};

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS>(
  factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS>
) {
  return function useCategory(cacheId?: string): UseCategory<CATEGORY> {
    const { state } = useSSR(cacheId);
    const categories: Ref<CATEGORY[]> = ref(state || []);
    const loading = ref(false);

    const search = async (params: CATEGORY_SEARCH_PARAMS) => {
      if (!state) {
        loading.value = true;
      }
      categories.value = await factoryParams.categorySearch(params);
      eventBus.emit('set-ssr-cache', { key: cacheId, value: categories.value });
      loading.value = false;
    };

    return {
      search,
      loading: computed(() => loading.value),
      categories: computed(() => categories.value)
    };
  };
}
