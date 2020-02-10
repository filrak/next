import { ref, reactive } from '@vue/composition-api'
import { prismic, endpoint } from '../../index'
import { QueryOptions } from '../../interfaces';
// import { ApiOptions } from 'prismic-javascript/d.ts/Predicates';

type QueryAt = [string, string] | Array<[string, string[]]>

interface QueryType {
  at?: QueryAt
}

interface OptionsType {
  orderings?: string
  pageSize?: number
  page?: number
}

// TODO: prismic as an argument is temporary. Will be accessible globally in this case
export default function usePrismic () {
  const loading = ref(true)
  const error = ref(null)
  const document = reactive({})
  
  const search = async (query: QueryOptions, options: OptionsType = null) => {
    prismic.getApi(endpoint).then(d => {
      // TODO: call query methods
    })
  }

  return {
    loading,
    error,
    document,
    search
  }
}
