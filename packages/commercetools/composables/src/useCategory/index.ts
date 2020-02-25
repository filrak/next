import { UseCategory } from '@vue-storefront/interfaces';
import { persistedResource } from '@vue-storefront/utils';
import { ref } from '@vue/composition-api';
import { getCategory, getProduct } from '@vue-storefront/commercetools-api';
import { enhanceProduct, enhanceCategory } from './../helpers/internals';
import { Category } from './../types/GraphQL';

interface UseCategorySearchParams {
  slug?: string;
}

type Search = (params: UseCategorySearchParams) => void

const loadCategories = async (params: UseCategorySearchParams) => {
  const categoryResponse = await getCategory(params);
  const rawCategories = categoryResponse.data.categories.results;
  const catIds = rawCategories.map((c) => c.id);
  const productResponse = await getProduct({ catIds });
  const enhancedCategory = enhanceCategory(categoryResponse, enhanceProduct(productResponse));

  return enhancedCategory.data.categories.results;
};

export default function useCategory(): UseCategory<Category, Search, any, any, any> {
  const categories = ref([]);
  const appliedFilters = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const applyFilter = () => {};
  const clearFilters = () => {};

  const search = async (params: UseCategorySearchParams) => {
    // loading.value = true;
    categories.value = await persistedResource<Category[]>(loadCategories, params);
    // loading.value = false;
  };

  return {
    categories,
    search,
    appliedFilters,
    applyFilter,
    clearFilters,
    loading,
    error
  };
}
