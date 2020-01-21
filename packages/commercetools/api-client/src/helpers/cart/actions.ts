import { UiCartProduct, AgnosticShipping } from '@vue-storefront/interfaces'
import { ProductVariant } from './../../types/GraphQL'

export const createAddLineItemAction = (variant: ProductVariant, quantity: number) => ({
  addLineItem: {
    variantId: variant.id,
    quantity: quantity,
    sku: variant.sku,
  }
})

export const createRemoveLineItemAction = (product: UiCartProduct) => ({
  removeLineItem: {
    lineItemId: product.id,
    quantity: parseInt(product.qty)
  }
})

export const createChangeLineItemQuantityAction = (product: UiCartProduct) => ({
  changeLineItemQuantity: {
    lineItemId: product.id,
    quantity: parseInt(product.qty)
  }
})

export const setShippingAddressAction = (shipping: AgnosticShipping) => ({
  setShippingAddress: {
    address: {
      firstName: shipping.firstName,
      lastName: shipping.lastName,
      streetName: shipping.streetName,
      streetNumber: '',
      city: shipping.city,
      state: shipping.state,
      postalCode: shipping.zipCode,
      country: shipping.country,
      phone: shipping.phoneNumber,
    }
  }
})

export const setShippingMethodAction = (shipping: AgnosticShipping) => ({
  setShippingMethod: {
    id: shipping.shippingMethod
  }
})

