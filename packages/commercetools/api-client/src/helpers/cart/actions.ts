import { UiCartProduct, AgnosticShippingDetails, AgnosticBillingDetails } from '@vue-storefront/interfaces'
import { ProductVariant, AddCartPayment } from './../../types/GraphQL'


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

export const setShippingAddressAction = (shippingDetails: AgnosticShippingDetails) => ({
  setShippingAddress: {
    address: {
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      streetName: shippingDetails.streetName,
      streetNumber: '',
      city: shippingDetails.city,
      state: shippingDetails.state,
      postalCode: shippingDetails.zipCode,
      country: shippingDetails.country,
      phone: shippingDetails.phoneNumber,
    }
  }
})

export const setShippingMethodAction = (shippingMethodId: string) => ({
  setShippingMethod: {
    shippingMethod: {
      id: shippingMethodId
    }
  }
})

export const setBillingAddressAction = (shippingDetails: AgnosticBillingDetails) => ({
  setBillingAddress: {
    address: {
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      streetName: shippingDetails.streetName,
      streetNumber: '',
      city: shippingDetails.city,
      state: shippingDetails.state,
      postalCode: shippingDetails.zipCode,
      country: shippingDetails.country,
      phone: shippingDetails.phoneNumber,
    }
  }
})

export const addPaymentAction = (paymentMethodId: string) => ({
  addPayment: {
    payment: {
      id: paymentMethodId
    }
  }
})
