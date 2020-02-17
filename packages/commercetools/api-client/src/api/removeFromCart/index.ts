import { AgnosticCartProduct } from '@vue-storefront/interfaces'
import updateCart from './../updateCart'
import { CartResponse } from './../../types/Api'
import { Cart } from './../../types/GraphQL'
import { createRemoveLineItemAction } from './../../helpers/cart/actions'

const removeFromCart = async (cart: Cart, product: AgnosticCartProduct): Promise<CartResponse> => {
  return await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [createRemoveLineItemAction(product)]
  })
}

export default removeFromCart
