import { FetchResult } from 'apollo-link'
import { Cart, CartDraft } from './../../types/GraphQL'
import { apolloClient, locale, currency } from './../../index'
import CreateCartMutation from './defaultMutation'

interface CreateCartData {
  createCart: Cart
}

interface CartData extends Omit<CartDraft, "currency"> {
  currency?: string
}

const createCart = async (cartDraft: CartData = {}): Promise<FetchResult<CreateCartData>> => {
  return await apolloClient.mutate<CreateCartData>({
    mutation: CreateCartMutation,
    variables: {
      locale,
      draft: {
        currency,
        ...cartDraft
      }
    }
  })
}

export default createCart
