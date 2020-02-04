import { ref, reactive } from '@vue/composition-api'

type QueryAt =
| [string, string]
| [string, string[]] 

interface QueryType {
  at?: QueryAt
}

interface OptionsType {
  orderings?: string
  pageSize?: number
  page?: number
}

// TODO: prismic as an argument is temporary. Will be accessible globally in this case
export default function usePrismic (prismic: any) {
  const loading = ref(true)
  const error = ref(null)
  const document = reactive(null)
  const search = (query: QueryType & QueryType, options = null) => prismic.query(
    query, // transform query into Prismic's
    options
  )

  return {
    loading,
    error,
    document,
    search
  }
}
