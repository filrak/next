import { ApolloQueryResult } from 'apollo-client'
import gql from 'graphql-tag'
import { apolloClient, locale, productAttributesIncluded } from './../../index'
import { Cart } from './../../types/GraphQL'
import defaultQuery from './defaultQuery'

interface CartData {
  cart: Cart
}

const getCart = async (cartId: string): Promise<ApolloQueryResult<CartData>> => {
  return await apolloClient.query<CartData>({
    query: defaultQuery,
    variables: { cartId, locale, attributesIncluded: productAttributesIncluded },
    fetchPolicy: 'no-cache'
  })
}

export default getCart
