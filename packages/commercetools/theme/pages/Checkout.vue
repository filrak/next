<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" @change="updateStep($event)">
          <SfStep name="Personal Details">
            <PersonalDetails
              :personalDetails="personalDetails"
              @update:personalDetails="setPersonalDetails($event)"
              @click:forward="currentStep++"
            />
          </SfStep>
          <SfStep name="Shipping">
            <Shipping
              :shippingDetails="shippingDetails"
              :chosen-shipping-method="chosenShippingMethod"
              :shipping-methods="shippingMethods"
              @update:shippingDetails="setShippingDetails($event)"
              @update:shippingMethod="setShippingMethod($event)"
              @click:back="currentStep--"
              @click:forward="currentStep++"
            />
          </SfStep>
          <SfStep name="Payment">
            <Payment
              :billingDetails="billingDetails"
              :payment-methods="paymentMethods"
              :chosen-payment-method="chosenPaymentMethod"
              @update:billingDetails="setBillingDetails($event)"
              @update:paymentMethod="setPaymentMethod($event)"
              @click:back="currentStep--"
              @click:forward="currentStep++"
            />
          </SfStep>
          <SfStep name="Review">
            <ReviewOrder
              :personalDetails="personalDetails"
              :shipping-details="shippingDetails"
              :billingDetails="billingDetails"
              :shipping-methods="shippingMethods"
              :payment-methods="paymentMethods"
              :chosen-shipping-method="chosenShippingMethod"
              :chosen-payment-method="chosenPaymentMethod"
              :products="products"
              @click:back="currentStep--"
              @click:edit="currentStep = $event"
              @click:placeOrder="placeOrder"
            />
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout__aside desktop-only">
        <transition name="fade">
          <OrderSummary
            v-if="currentStep <= 2"
            key="order-summary"
            :products="products"
            :chosen-shipping-method="chosenShippingMethod"
            :shipping-methods="shippingMethods"
            :payment-methods="paymentMethods"
          />
          <OrderReview
            v-else
            key="order-review"
            :personal-details="personalDetails"
            :shipping-details="shippingDetails"
            :billing-details="billingDetails"
            :chosen-shipping-method="chosenShippingMethod"
            :chosen-payment-method="chosenPaymentMethod"
            :shipping-methods="shippingMethods"
            :payment-methods="paymentMethods"
            @click:edit="currentStep = $event"
          />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSteps } from "@storefront-ui/vue";

import PersonalDetails from "~/components/checkout/PersonalDetails"
import Shipping from "~/components/checkout/Shipping"
import Payment from "~/components/checkout/Payment"
import ReviewOrder from "~/components/checkout/ReviewOrder"
import OrderSummary from "~/components/checkout/OrderSummary"
import OrderReview from "~/components/checkout/OrderReview"
import { computed, ref } from '@vue/composition-api'

import { useCheckout, useCart } from '@vue-storefront/commercetools-composables'
import { getCartProducts } from '@vue-storefront/commercetools-helpers'

export default {
  name: "Checkout",
  components: {
    SfSteps,
    PersonalDetails,
    Shipping,
    Payment,
    ReviewOrder,
    OrderSummary,
    OrderReview
  },
  setup () {
    const currentStep = ref(0)
    const {
      personalDetails,
      setPersonalDetails,

      shippingDetails,
      setShippingDetails,
      setShippingMethod,
      chosenShippingMethod,

      billingDetails,
      setBillingDetails,
      chosenPaymentMethod,
      setPaymentMethod,

      paymentMethods,
      shippingMethods,
      placeOrder
    } = useCheckout()
    const { cart } = useCart()

    const products = computed(() => getCartProducts(cart.value, ['color', 'size']))

    const updateStep = (next) => {
      if (next < currentStep.value) {
        currentStep.value = next;
      }
    }

    return {
      currentStep,
      updateStep,
      personalDetails,
      setPersonalDetails,
      shippingDetails,
      setShippingDetails,
      setShippingMethod,
      chosenShippingMethod,
      billingDetails,
      setBillingDetails,
      chosenPaymentMethod,
      setPaymentMethod,
      paymentMethods,
      shippingMethods,
      products,
      placeOrder
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/variables";
@import "~@storefront-ui/shared/styles/helpers/visibility";

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
#checkout {
  box-sizing: border-box;
  padding: 0 $spacer-big;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
    padding: $spacer-extra-big;
  }
}
.checkout {
  @include for-desktop {
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin-left: 4.25rem;
    }
  }
}
</style>
