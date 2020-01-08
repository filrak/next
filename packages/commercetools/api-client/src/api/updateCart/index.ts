import { FetchResult } from 'apollo-link'
import { Cart, CartUpdateAction } from '../../types/GraphQL'
import { apolloClient, locale, productAttributesIncluded } from '../../index'
import CreateCartMutation from './defaultMutation'

interface UpdateCartData {
  cart: Cart
}

interface UpdateCart {
  id: string
  version: number
  actions: CartUpdateAction[]
}

const updateCart = async (cartData: UpdateCart): Promise<FetchResult<UpdateCartData>> => {
  return await apolloClient.mutate<UpdateCartData>({
    mutation: CreateCartMutation,
    variables: {
      attributesIncluded: productAttributesIncluded,
      locale,
      ...cartData
    }
  })
}

export default updateCart
