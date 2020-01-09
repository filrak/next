import { CartResponse } from '@vue-storefront/commercetools-api/lib/src/types/Api'
import { LineItem, RawProductAttribute } from './../../types/GraphQL'

const attributeValueSelectors = {
  color: (value) => value.label.en
}

const transformAttribute = (attribute: RawProductAttribute) => {
  const { name, value } = attribute

  if (typeof value === 'object') {
    const transformedValue =
      attributeValueSelectors[attribute.name] ?
      attributeValueSelectors[attribute.name](value) : value

    return { name, value: transformedValue }
  }

  return { name, value}
}

const enhanceCart = (cartResponse: CartResponse): CartResponse => {
  const { lineItems } = cartResponse.data.cart

  cartResponse.data.cart.lineItems = lineItems.map((lineItem: LineItem) => ({
    ...lineItem,
    _configuration: lineItem.variant.attributesRaw.map(transformAttribute)
  }))

  return cartResponse
}

export default enhanceCart
