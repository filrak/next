import { UseCategory } from '@vue-storefront/interfaces'
import { ref, Ref, onServerPrefetch, reactive } from '@vue/composition-api'
import { getCategory, getProduct } from '@vue-storefront/commercetools-api'
import { getCategoryProducts } from '@vue-storefront/commercetools-helpers'
import { enhanceProduct, enhanceCategory, getSsrData } from './../helpers/internals'
import { SsrContext } from '../types/SSR';

interface UseCategorySearchParams {
  slug?: string
}

interface SsrContextData {
  categories: Ref<any[]>,
  loading: Ref<boolean>,
  products: any[]
}

const loadCategories = async (params: UseCategorySearchParams) => {
  const categoryResponse = await getCategory(params)
  const rawCategories = categoryResponse.data.categories.results
  const catIds = rawCategories.map(c => c.id)
  const productResponse = await getProduct({ catIds })
  const enhancedCategory = enhanceCategory(categoryResponse, enhanceProduct(productResponse))

  return enhancedCategory.data.categories.results
}

export default function useCategory (ssrContext?: SsrContext<SsrContextData>): UseCategory<any, any, any, any, any> & { products: any[] } {
  const categories = ref([])
  const products = reactive([])
  const appliedFilters = ref(null)
  const applyFilter = () => { () => { console.log('useCategory:applyFilter') } }
  const clearFilters = () => { () => { console.log('useCategory:clearFilters') } }
  const loading = ref(true)
  const error = ref(null)

  const ssrData = getSsrData(ssrContext)

  if (ssrData) {
    ssrData.categories = categories
    ssrData.loading = loading
    ssrData.products = products
  }

  const search = async (params: UseCategorySearchParams) => {
    onServerPrefetch(async () => {
      ssrData.categories.value = await loadCategories(params)
      ssrData.loading.value = false

      getCategoryProducts(ssrData.categories.value[0], { master: true }).map(prod => ssrData.products.push(prod))
    })
  }

  return {
    categories,
    search,
    appliedFilters,
    applyFilter,
    clearFilters,
    loading,
    products,
    error,
  }
}
