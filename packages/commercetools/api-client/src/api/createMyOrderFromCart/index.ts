import { OrderMyCartCommand } from '../../types/GraphQL'
import { apolloClient, locale, currency } from '../../index'
import CreateMyOrderFromCartMutation from './defaultMutation'
import { OrderMutationResponse } from '../../types/Api'

const createMyOrderFromCart = async (cartDraft: OrderMyCartCommand): Promise<OrderMutationResponse> => {
  return await apolloClient.mutate({
    mutation: CreateMyOrderFromCartMutation,
    variables: {
      locale,
      draft: {
        currency,
        ...cartDraft
      }
    }
  })
}

export default createMyOrderFromCart
