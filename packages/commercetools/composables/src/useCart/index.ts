import { UseCart, UiCartProduct } from '@vue-storefront/interfaces'
import { ref, watch } from '@vue/composition-api'
import { ProductVariant } from './../types/GraphQL'
import { processAddToCart, processRemoveFromCart, processUpdateQuantity } from './process'
import loadCurrentCart from './currentCart'
import { cart, loading } from './shared'

export default function useCart(): UseCart<any, any, any, any, any, any, any, any> {

  watch(async () => {
    if (!cart.value && !loading.value) {
      loading.value = true
      cart.value = await loadCurrentCart()
      loading.value = false
    }
  })

  const addToCart = async (variant: ProductVariant, quantity: number) => {
    loading.value = true
    const updateResponse = await processAddToCart(cart.value, variant, quantity)
    cart.value = updateResponse.data.cart
    loading.value = false
  }

  const removeFromCart = async (product: UiCartProduct) => {
    loading.value = true
    const updateResponse = await processRemoveFromCart(cart.value, product)
    cart.value = updateResponse.data.cart
    loading.value = false
  }

  const updateQuantity = async (product: UiCartProduct) => {
    if (parseInt(product.qty) > 0) {
      loading.value = true
      const updateResponse = await processUpdateQuantity(cart.value, product)
      cart.value = updateResponse.data.cart
      loading.value = false
    }
  }

  const clearCart = () => { () => { console.log('useCart:clearCart') } }
  const coupon = ref({})
  const applyCoupon = () => { () => { console.log('useCart:applyCoupon') } }
  const removeCoupon = () => { () => { console.log('useCart:removeCoupon') } }
  const error = ref(null)
  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    coupon,
    applyCoupon,
    removeCoupon,
    loading,
    error
  }
}
