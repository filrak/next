import { AgnosticCartProduct } from '@vue-storefront/interfaces'
import updateCart from '../updateCart'
import { CartResponse } from '../../types/Api'
import { Cart } from '../../types/GraphQL'
import { createChangeLineItemQuantityAction } from '../../helpers/cart/actions'

const updateCartQuantity = async (cart: Cart, product: AgnosticCartProduct): Promise<CartResponse> => {
  return await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [createChangeLineItemQuantityAction(product)]
  })
}

export default updateCartQuantity
