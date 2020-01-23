import { UseCheckout, AgnosticPaymentMethod, AgnosticCustomer, AgnosticShippingDetails, AgnosticBillingDetails } from '@vue-storefront/interfaces';
import { placeOrder as processOrder, getShippingMethods } from '@vue-storefront/commercetools-api';
import { ref, Ref, watch, computed } from '@vue/composition-api'
import { cart } from './../useCart'
import {
  getShippingMethodPrice,
  getCartProducts
} from '@vue-storefront/commercetools-helpers'
import { ShippingMethod } from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';

const PAYMENT_METHODS_MOCK: AgnosticPaymentMethod[] = [
  {
    label: "Visa Debit",
    value: "debit"
  },
  {
    label: "MasterCard",
    value: "mastercard"
  },
  {
    label: "Visa Electron",
    value: "electron"
  },
  {
    label: "Cash on delivery",
    value: "cash"
  },
  {
    label: "Check",
    value: "check"
  }
]

const products = computed(() => getCartProducts(cart.value))

export const paymentMethods: Ref<any[]> = ref(PAYMENT_METHODS_MOCK)
export const shippingMethods: Ref<any[]> = ref([])
export const personalDetails: Ref<AgnosticCustomer> = ref({})
export const shippingDetails: Ref<AgnosticShippingDetails> = ref({})
export const billingDetails: Ref<AgnosticBillingDetails> = ref({})
export const chosenPaymentMethod: Ref<string> = ref('')
export const chosenShippingMethod: Ref<any> = ref({})
export const subtotal = computed(() =>
  (products.value || [])
    .map(({ qty, price }) => ({
      price: price.special ? price.special : price.regular,
      qty
    }))
    .reduce((previous, { qty, price }) => previous + parseInt(qty) * price,  0)
    .toFixed(2)
)

export const total = computed(() =>
  parseFloat(subtotal.value + (getShippingMethodPrice(chosenShippingMethod.value) || 0)).toFixed(2)
)

export const totalItems = computed(() => products.value.reduce(
  (previous, { qty }) => previous + parseInt(qty), 0)
)

export default function useCheckout (): UseCheckout<any, any, any, any, any, any, any, any, any, any> {
  watch(async () => {
    if (shippingMethods.value.length === 0) {
      // TODO(CHECKOUT): loading shipping methods when country was changed
      const shippingMethodsResponse = await getShippingMethods()
      shippingMethods.value = shippingMethodsResponse.data.shippingMethods as any
    }
  })

  const setShippingMethod = (shippingMethod: ShippingMethod) => {
    chosenShippingMethod.value = shippingMethod
  }

  const setPaymentMethod = (paymentMethod: any) => {
    // TODO(CHECKOUT): selecting payment method
    chosenPaymentMethod.value = paymentMethod
  }

  const placeOrder = async () => {
    const orderData = {
      shippingDetails: shippingDetails.value,
      billingDetails: billingDetails.value,
      shippingMethod: chosenShippingMethod.value.id,
    }
    console.log({ orderData })
    const orderResponse = await processOrder(cart.value, orderData)
    console.log('order response', orderResponse)
  }

  const loading = ref(true)
  const error = ref(null)

  return {
    paymentMethods,
    shippingMethods,
    personalDetails,
    shippingDetails,
    billingDetails,
    chosenPaymentMethod,
    chosenShippingMethod,
    setPaymentMethod,
    setShippingMethod,
    placeOrder,
    total,
    subtotal,
    loading,
    error
  }
}
