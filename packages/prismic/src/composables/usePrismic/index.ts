import { ref, Ref, reactive } from '@vue/composition-api'
import { prismic, endpoint } from '../../index'
import { PrismicQuery } from '../../types'
import { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi'
import ApiSearchResponse from 'prismic-javascript/d.ts/ApiSearchResponse'
import transformQuery from './transformQuery'

interface OptionsType {
  orderings?: string
  pageSize?: number
  page?: number
}

export default function usePrismic () {
  const loading = ref(true)
  const error = ref(null)
  const doc: Ref<ApiSearchResponse> = ref({} as ApiSearchResponse)

  const search = async (query: PrismicQuery, options: OptionsType = {}) => {
    doc.value = await prismic
      .getApi(endpoint)
      .then(api => api.query(
        transformQuery(query),
        options as QueryOptions
      ))

    loading.value = false
  }

  return {
    loading,
    error,
    doc,
    search,
  }
}
