import { ApolloQueryResult } from 'apollo-client'
import gql from 'graphql-tag'
import { apolloClient, locale, currency } from './../../index'
import { ProductSearch } from './../../types/Api'
import { ProductQueryResult } from './../../types/GraphQL'
import defaultQuery from './defaultQuery'
import { buildProductWhere } from './../../helpers/search'
import { applyInternals } from './../../helpers/internals'

interface ProductData {
  products: ProductQueryResult
}

const getProductQuery = (search: ProductSearch) => {
  if (search.customQuery) {
    const { query, variables } = search.customQuery

    return apolloClient.query<ProductData>({
      query: gql`${query}`,
      variables
    })
  }

  return apolloClient.query<ProductData>({
    query: defaultQuery,
    variables: {
      where: buildProductWhere(search),
      skus: search.skus,
      limit: search.limit,
      offset: search.offset,
      locale,
      currency,
    }
  })
}

const getProduct = async (search: ProductSearch): Promise<ApolloQueryResult<ProductData>> => {
  return await applyInternals<ProductData>(getProductQuery(search), 'product')
}

export default getProduct
