import { updateCart } from '@vue-storefront/commercetools-api'
import { CartResponse } from '@vue-storefront/commercetools-api/lib/src/types/Api'
import { Cart, ProductVariant } from './../types/GraphQL'
import { createAddLineItemAction, createRemoveLineItemAction, createChangeLineItemQuantityAction } from './actions'
import { enhanceCart } from './../helpers/internals'
import { UiCartProduct } from '@vue-storefront/interfaces'

export const processAddToCart = async (cart: Cart, product: ProductVariant, quantity: number): Promise<CartResponse> => {
  const updateResponse =  await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [createAddLineItemAction(product, quantity)]
  })

  return enhanceCart(updateResponse)
}

export const processRemoveFromCart = async (cart: Cart, product: UiCartProduct): Promise<CartResponse> => {
  const updateResponse =  await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [createRemoveLineItemAction(product)]
  })

  return enhanceCart(updateResponse)
}

export const processUpdateQuantity = async (cart: Cart, product: UiCartProduct): Promise<CartResponse> => {
  const updateResponse =  await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [createChangeLineItemQuantityAction(product)]
  })

  return enhanceCart(updateResponse)
}
