import { UseCategory } from '@vue-storefront/interfaces'
import { ref } from '@vue/composition-api'
import { getCategory, getProduct } from '@vue-storefront/commercetools-api'

interface UseCategorySearchParams {
  slug?: string
}

const filterRelatedProducts = category => () =>
  ({ _categoriesRef }) => _categoriesRef.includes(category.id)

const applyProducts = rawProducts => (category) => {
  const _products = rawProducts.filter(filterRelatedProducts(category))

  return {
    ...category,
    _products
  }
}

const loadCategories = async (params: UseCategorySearchParams) => {
  const categoryResponse = await getCategory({ slug: params.slug })
  const rawCategories = categoryResponse.data.categories.results
  const catIds = rawCategories.map(c => c.id)
  const productResponse = await getProduct({ catIds })
  const rawProducts = (productResponse.data as any)._variants

  return categoryResponse.data.categories.results.map(applyProducts(rawProducts))
}

export default function useCategory (): UseCategory<any, any, any, any, any> {
  const categories = ref([])
  const appliedFilters = ref(null)
  const applyFilter = () => { () => { console.log('useCategory:applyFilter') } }
  const clearFilters = () => { () => { console.log('useCategory:clearFilters') } }
  const loading = ref(true)
  const error = ref(null)

  const search = async (params: UseCategorySearchParams) => {
    categories.value = await loadCategories(params)

    loading.value = false
  }

  return {
    categories,
    search,
    appliedFilters,
    applyFilter,
    clearFilters,
    loading,
    error
  }
}
