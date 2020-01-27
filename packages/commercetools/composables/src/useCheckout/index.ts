/* istanbul ignore file */

import { UseCheckout } from '@vue-storefront/interfaces';
import { placeOrder as processOrder, getShippingMethodsByCartId } from '@vue-storefront/commercetools-api';
import { ref, Ref, watch } from '@vue/composition-api'
import { cart } from './../useCart'
import { ShippingMethod, AddressInput, Customer } from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';

const PAYMENT_METHODS_MOCK = [
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
export const paymentMethods: Ref<any[]> = ref(PAYMENT_METHODS_MOCK)
export const shippingMethods: Ref<any[]> = ref([])
export const personalDetails: Ref<Customer> = ref({})
export const shippingDetails: Ref<AddressInput> = ref({})
export const billingDetails: Ref<AddressInput> = ref({})
export const chosenPaymentMethod: Ref<string> = ref('')
export const chosenShippingMethod: Ref<ShippingMethod> = ref({})

export default function useCheckout (): UseCheckout<any, any, any, any, any, any, any, any, any, any> {
  watch(async () => {
    if (shippingMethods.value.length === 0 && cart.value) {
      // TODO(CHECKOUT): Update shipping data for each update form
      const shippingMethodsResponse = await getShippingMethodsByCartId(cart.value.id)
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

    await processOrder(cart.value, orderData)
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
    loading,
    error
  }
}
