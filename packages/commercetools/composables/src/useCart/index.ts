import debounce from 'lodash-es/debounce'
import { UseCart } from '@vue-storefront/interfaces'
import { ref, watch } from '@vue/composition-api'
import { Cart, LineItem } from './../types/GraphQL'
import { createCart, updateCart, getCart } from '@vue-storefront/commercetools-api'
import { enhanceCart } from './../helpers/internals'

const getStorage = () => {
  // @ts-ignore
  if (typeof window !== 'undefined') {
    // @ts-ignore
    return window.localStorage;
  }

  const storage = {};

  return {
    setItem: (key: string, value: any) => {
      storage[key] = value;
    },
    getItem: (key: string): any => {
      return storage[key];
    },
  }
}

const loadCurrentCart = async () => {
  const storage = getStorage()
  const cartId = storage.getItem('vsf-commercetools-cart-id')

  if (cartId) {
    const { data: { cart } } = enhanceCart(await getCart(cartId))
    storage.setItem('vsf-commercetools-cart-id', cart.id)

    return cart
  }

  // TODO: first fetch cart for given customerId, if doesn't exist, create new one
  const { data: { cart } } = enhanceCart(await createCart())
  storage.setItem('vsf-commercetools-cart-id', cart.id)

  return cart
}

export default function useCart(): UseCart<any, any, any, any, any, any, any, any> {
  const cart = ref<Cart>(null)

  watch(async () => {
    if (cart.value) return

    loadCart()
  })

  const loadCart = async () => {
    cart.value = await loadCurrentCart()
  }


  const addToCart = async (variant) => {
    const action = {
      addLineItem: {
        variantId: variant.id,
        quantity: 1,
        sku: variant.sku,
      }
    }

    const updateResponse = enhanceCart(await updateCart({
      id: cart.value.id,
      version: cart.value.version,
      actions: [action]
    }))

    cart.value = updateResponse.data.cart
  }

  const oldCart = ref({ products: [
    {
      title: "Cream Beach Bag",
      id: "CBB1",
      image: "/homepage/productA.jpg",
      price: { regular: "50.00" },
      configuration: [
        { name: "Size", value: "XS" },
        { name: "Color", value: "White" }
      ],
      qty: "1",
      stock: 44
    },
    {
      title: "Cream Beach Bag",
      id: "CBB2",
      image: "/homepage/productB.jpg",
      price: { regular: "50.00", special: "20.05" },
      configuration: [
        { name: "Size", value: "XS" },
        { name: "Color", value: "White" }
      ],
      qty: "2",
      stock: 10
    },
    {
      title: "Cream Beach Bag",
      id: "CBB3",
      image: "/homepage/productC.jpg",
      price: { regular: "50.00", special: "20.50" },
      configuration: [
        { name: "Size", value: "XS" },
        { name: "Color", value: "White" }
      ],
      qty: "1",
      stock: 20
    }
  ]})

  const removeFromCart = () => { () => { console.log('useCart:removeFromCart') } }
  const clearCart = () => { () => { console.log('useCart:clearCart') } }
  const coupon = ref({})
  const applyCoupon = () => { () => { console.log('useCart:applyCoupon') } }
  const removeCoupon = () => { () => { console.log('useCart:removeCoupon') } }
  const loading = false
  const error = ref(null)
  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    loadCart,
    loading,
    error
  }
}
