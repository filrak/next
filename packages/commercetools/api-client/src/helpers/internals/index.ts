import { ApolloQueryResult } from "apollo-client"
import { internals } from './../../index'
import enhanceProduct from './product'

const internalsMap = {
  'product': enhanceProduct
}

const applyInternals = async <T>(apolloPromise: Promise<ApolloQueryResult<T>>, internalsName: string): Promise<ApolloQueryResult<T>> => {
  const apolloResponse = await apolloPromise

  if (!internals || !internalsMap[internalsName]) {
    return apolloResponse
  }

  return internalsMap[internalsName](apolloResponse)
}

export { applyInternals }
