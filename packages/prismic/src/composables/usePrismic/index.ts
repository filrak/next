import { ref, reactive } from '@vue/composition-api'
import { prismic, endpoint } from '../../index'
import { PrismicQuery, PrismicQueryTypes } from '../../interfaces';
import { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi';
import ApiSearchResponse from 'prismic-javascript/d.ts/ApiSearchResponse';

interface OptionsType {
  orderings?: string
  pageSize?: number
  page?: number
}

// TODO: prismic as an argument is temporary. Will be accessible globally in this case
export default function usePrismic () {
  const loading = ref(true)
  const error = ref(null)
  const document: ApiSearchResponse = reactive({} as ApiSearchResponse)

  const transformQuery = (query: PrismicQuery): string | string[] => {
    const predict = (method, args) => prismic.Predicates[method](...args)

    const queries = Object.keys(query).map<string>(key => {
      const current: PrismicQueryTypes = query[key]

      if (!prismic.Predicates[key]) {
        return undefined
      }

      const { fragment, after, before, day, documentId, 
        hour, latitude, longitude, maxResults, month, 
        radius, value, values, year 
      } = current

      switch (true) {
        case values !== undefined:
          return predict(key, [fragment, values])
        case value !== undefined:
          return predict(key, [fragment, value])
        case documentId !== undefined && maxResults !== undefined:
          return predict(key, [documentId, maxResults])
        case before !== undefined && after !== undefined:
          return predict(key, [fragment, before, after])
        case before !== undefined:
          return predict(key, [fragment, before])
        case after !== undefined:
          return predict(key, [fragment, after])
        case latitude !== undefined && longitude !== undefined && radius !== undefined:
          return predict(key, [fragment, latitude, longitude, radius])
        case year !== undefined:
          return predict(key, [fragment, year])
        case month !== undefined:
          return predict(key, [fragment, month])
        case day !== undefined:
          return predict(key, [fragment, day])
        case hour !== undefined:
          return predict(key, [fragment, hour])
        default:
          return predict(key, [fragment])
      }
    })

    return queries.length === 1 
      ? queries[0]
      : queries.filter(queryElement => queryElement !== undefined)
  }
  
  const search = async (query: PrismicQuery, options: OptionsType = {}) => {
    const result = await prismic.getApi(endpoint).then(api => api.query(
      transformQuery(query), 
      options as QueryOptions
    ))

    Object.assign(document, result)
    loading.value = false
  }

  return {
    loading,
    error,
    document,
    search
  }
}
