import { AgnosticShipping } from '@vue-storefront/interfaces'
import updateCart from '../updateCart'
import { CartResponse } from '../../types/Api'
import { Cart } from '../../types/GraphQL'
import { setShippingAddressAction } from '../../helpers/cart/actions'

const setShippingAddress = async (cart: Cart, shipping: AgnosticShipping): Promise<CartResponse> => {
  return await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [setShippingAddressAction(shipping)]
  })
}

export default setShippingAddress
