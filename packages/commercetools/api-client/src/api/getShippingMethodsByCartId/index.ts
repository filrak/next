import { apolloClient } from '../../index'
import { ShippingMethodsResponse } from '../../types/Api'
import defaultQuery from './defaultQuery'

const getShippingMethodsByCartId = async (cartId: string): Promise<ShippingMethodsResponse> => {
  return await apolloClient.query({
    query: defaultQuery,
    variables: { cartId },
    fetchPolicy: 'no-cache'
  })
}

export default getShippingMethodsByCartId
