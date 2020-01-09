import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SetupConfig } from './types/setup'
import createCommerceToolsLink from './helpers/createCommerceToolsLink'
import getProduct from './api/getProduct'
import getCategory from './api/getCategory'
import createCart from './api/createCart'
import updateCart from './api/updateCart'
import getCart from './api/getCart'
import getStorage from './helpers/createCommerceToolsLink/getStorage'

let apolloClient: ApolloClient<any> = null
let locale = 'en'
let currency = 'USD'
let productAttributesIncluded = ['color', 'size']

const setup = <TCacheShape>(setupConfig?: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
  apolloClient = new ApolloClient({
    link: createCommerceToolsLink(setupConfig.api),
    cache: new InMemoryCache(),
    ...setupConfig.customOptions
  })
  locale = setupConfig.locale
  currency = setupConfig.currency
  productAttributesIncluded = setupConfig.productAttributesIncluded

  return apolloClient
}

export {
  apolloClient,
  setup,
  locale,
  currency,
  productAttributesIncluded,
  getStorage,
  getProduct,
  getCategory,
  createCart,
  updateCart,
  getCart
}
