import { FetchResult } from 'apollo-link'
import { ApolloQueryResult } from 'apollo-client'
import isObject from 'lodash-es/isObject'
import { Cart } from './../../types/GraphQL'
import { LineItem, RawProductAttribute } from './../../types/GraphQL'

interface CartData {
  cart: Cart
}

type CartResponse = ApolloQueryResult<CartData> | FetchResult<CartData>

const attributeValueSelectors = {
  color: (value) => value.label.en
}

const transformAttribute = (attribute: RawProductAttribute) => {
  const { name, value } = attribute

  if (isObject(value)) {
    const transformedValue =
      attributeValueSelectors[attribute.name] ?
      attributeValueSelectors[attribute.name](value) : value

    return { name, value: transformedValue }
  }

  return { name, value}
}

const enhanceCart = (cartResponse: CartResponse) => {
  const { lineItems } = cartResponse.data.cart

  cartResponse.data.cart.lineItems = lineItems.map((lineItem: LineItem) => ({
    ...lineItem,
    _configuration: lineItem.variant.attributesRaw.map(transformAttribute)
  }))

  return cartResponse
}

export default enhanceCart
