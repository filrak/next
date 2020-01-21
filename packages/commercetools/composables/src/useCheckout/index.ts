import { UseCheckout, AgnosticShippingMethod, AgnosticPaymentMethod } from '@vue-storefront/interfaces';
import { setShippingAddress } from '@vue-storefront/commercetools-api';
import { ref, Ref, computed, reactive } from '@vue/composition-api'
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
const SHIPPING_METHODS_MOCK: AgnosticShippingMethod[] = [
  {
    isOpen: false,
    price: "Free",
    delivery: "Delivery from 3 to 7 business days",
    label: "Pickup in the store",
    value: "store",
    description:
      "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
  },
  {
    isOpen: false,
    price: "$9.90",
    delivery: "Delivery from 4 to 6 business days",
    label: "Delivery to home",
    value: "home",
    description:
      "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
  },
  {
    isOpen: false,
    price: "$9.90",
    delivery: "Delivery from 4 to 6 business days",
    label: "Paczkomaty InPost",
    value: "inpost",
    description:
      "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
  },
  {
    isOpen: false,
    price: "$11.00",
    delivery: "Delivery within 48 hours",
    label: "48 hours coffee",
    value: "coffee",
    description:
      "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
  },
  {
    isOpen: false,
    price: "$14.00",
    delivery: "Delivery within 24 hours",
    label: "Urgent 24h",
    value: "urgent",
    description:
      "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
  }
]

export default function useCheckout (): UseCheckout<AgnosticPaymentMethod[], AgnosticShippingMethod[], any, any, any, any, any, any, any, any, any, any, any> {
  const paymentMethods: Ref<AgnosticPaymentMethod[]> = ref(PAYMENT_METHODS_MOCK)
  const shippingMethods: Ref<AgnosticShippingMethod[]> = ref(SHIPPING_METHODS_MOCK)
  const personalDetails = ref({})
  const shippingDetails = ref({})
  const billingDetails = ref({})
  const chosenPaymentMethod = ref('')
  const chosenShippingMethod = ref('')

  const setPersonalDetails = (details: any) => {
    personalDetails.value = details
  }

  const setShippingMethod = (shippingMethod: any) => {
    chosenShippingMethod.value = shippingMethod
  }

  const setShippingDetails = (details: any) => {
    shippingDetails.value = details
  }

  const setBillingDetails = (billing: any) => {
    billingDetails.value = billing
  }

  const setPaymentMethod = (paymentMethod: any) => {
    chosenPaymentMethod.value = paymentMethod
  }

  const placeOrder = async () => {
    console.log('useCheckout:placeOrder', {
      personalDetails,
      shippingDetails,
      billingDetails,
      chosenPaymentMethod,
      chosenShippingMethod
    })
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
