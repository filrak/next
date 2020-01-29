import { UseCart } from '@vue-storefront/interfaces'
import { Ref, ref, watch } from '@vue/composition-api'
import { Cart, ProductVariant } from '../types'

// Cart-specific typings. 
// Those inetrfaces are just recommendations. 
// Feel free to update them to match your platform specification.
type AddToCart = (product: ProductVariant, quantity: number) => void
type RemoveFromCart = (product: ProductVariant) => void
type ClearCart = () => void
type Coupon = string
type ApplyCoupon = (coupon: string) => void
type RemoveCoupon = () => void

// This state will be shared between all 'useCart` instances.
const cart: Ref<Cart> = ref<Cart>(null)
const loading: Ref<boolean> = ref<boolean>(false)
const error: Ref<any> = ref<any>(null)
const coupon: Ref<Coupon> = ref<Coupon>(null)

export default function useCart (): UseCart<Cart, AddToCart, RemoveFromCart, ClearCart, Coupon, ApplyCoupon, RemoveCoupon> {

  const addToCart: AddToCart = (product) => {}
  const removeFromCart: RemoveFromCart = (product) => {}
  const clearCart: ClearCart = () => {}
  const applyCoupon: ApplyCoupon = () => {}
  const removeCoupon: RemoveCoupon = () => {}

  return {
    cart,
    addToCart,
    removeCoupon,
    clearCart,
    coupon,
    applyCoupon,
    removeFromCart,
    error,
    loading
  }
}

