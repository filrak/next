import { apolloClient, country } from './../../index'
import { ShippingMethodsResponse } from './../../types/Api'
import defaultQuery from './defaultQuery'

const getShippingMethods = async (): Promise<ShippingMethodsResponse> => {
  return await apolloClient.query({
    query: defaultQuery,
    variables: { country },
    fetchPolicy: 'no-cache'
  })
}

export default getShippingMethods
