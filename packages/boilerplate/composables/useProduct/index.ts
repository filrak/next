import { UseProduct } from '@vue-storefront/interfaces'
import { ref, Ref } from '@vue/composition-api'
import { ProductVariant } from './../types'

type Search = (params: any) => void

export default function useProduct (): UseProduct<ProductVariant, Search> {
  const products: Ref<ProductVariant[]> = ref([])
  const loading = ref(false)
  const error = ref(null)

  const search: Search = async (params) => {}

  return {
    products,
    search,
    loading,
    error
  }
}
