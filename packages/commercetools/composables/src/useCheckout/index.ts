import { UseCheckout, AgnosticShippingMethod, AgnosticPaymentMethod, AgnosticCustomer, AgnosticShippingDetails, AgnosticBillingDetails } from '@vue-storefront/interfaces';
import { placeOrder as processOrder, getShippingMethods } from '@vue-storefront/commercetools-api';
import { ref, Ref, watch, computed, reactive } from '@vue/composition-api'
import { getCartProducts } from '@vue-storefront/commercetools-helpers'
import { cart } from './../useCart'

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

export default function useCheckout (): UseCheckout<any, any, any, any, any, any, any, any, any, any, any, any, any> {
  const paymentMethods: Ref<any[]> = ref(PAYMENT_METHODS_MOCK)
  const shippingMethods: Ref<any[]> = ref([])
  const personalDetails: Ref<AgnosticCustomer> = ref({})
  const shippingDetails: Ref<AgnosticShippingDetails> = ref({})
  const billingDetails: Ref<AgnosticBillingDetails> = ref({})
  const chosenPaymentMethod: Ref<string> = ref('')
  const chosenShippingMethod: Ref<string> = ref('')

  watch(async () => {
    const shippingMethodsResponse = await getShippingMethods()
    shippingMethods.value = shippingMethodsResponse.data.shippingMethods as any
  })

  const setPersonalDetails = (customer: AgnosticCustomer) => {
    personalDetails.value = customer
  }

  const setShippingMethod = (shippingMethod: string) => {
    console.log('ss', shippingMethod)
    chosenShippingMethod.value = shippingMethod
  }

  const setShippingDetails = (details: AgnosticShippingDetails) => {
    shippingDetails.value = details
  }

  const setBillingDetails = (billing: AgnosticBillingDetails) => {
    billingDetails.value = billing
  }

  const setPaymentMethod = (paymentMethod: string) => {
    chosenPaymentMethod.value = paymentMethod
  }

  const placeOrder = async () => {
    const orderData = {
      shippingDetails: shippingDetails.value,
      billingDetails: billingDetails.value,
      shippingMethod: chosenPaymentMethod.value,
    }

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
    setShippingDetails,
    chosenPaymentMethod,
    chosenShippingMethod,
    setPersonalDetails,
    setPaymentMethod,
    setShippingMethod,
    setBillingDetails,
    placeOrder,
    loading,
    error
  }
}
