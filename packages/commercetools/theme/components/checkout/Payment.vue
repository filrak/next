<template>
  <div>
    <SfHeading
      title="3. Payment"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfCheckbox
        v-model="sameAsShipping"
        label="Copy address data from shipping"
        name="copyShippingAddress"
        class="form__element"
      />
      <SfInput
        v-model="firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="streetName"
        label="Street name"
        name="streetName"
        class="form__element"
        required
      />
      <SfInput
        v-model="apartment"
        label="House/Apartment number"
        name="apartment"
        class="form__element"
        required
      />
      <SfInput
        v-model="city"
        label="City"
        name="city"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="state"
        label="State/Province"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="zipCode"
        label="Zip-code"
        name="zipCode"
        class="form__element form__element--half"
        required
      />
      <SfSelect
        v-model="country"
        label="Country"
        class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
        required
      >
        <SfSelectOption
          v-for="countryOption in countries"
          :key="countryOption.key"
          :value="countryOption.key"
        >
          {{ countryOption.label }}
        </SfSelectOption>
      </SfSelect>
      <SfInput
        v-model="phoneNumber"
        label="Phone number"
        name="phone"
        class="form__element"
        required
      />
    </div>
    <SfHeading
      title="Payment methods"
      subtitle="Choose your payment method"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__element payment-methods">
        <SfRadio
          v-for="item in paymentMethods"
          :key="item.value"
          v-model="paymentMethod"
          :label="item.label"
          :value="item.value"
          name="paymentMethod"
          :description="item.description"
          class="form__radio payment-method"
        >
          <template #label>
            <div class="sf-radio__label">
              <template
                v-if="
                  item.value !== 'debit' &&
                    item.value !== 'mastercard' &&
                    item.value !== 'electron'
                "
              >
                {{ item.label }}
              </template>
              <template v-else>
                <SfImage
                  :src="`/assets/storybook/checkout/${item.value}.png`"
                  class="payment-image"
                />
              </template>
            </div>
          </template>
        </SfRadio>
      </div>
      <transition name="fade">
        <div v-if="isCreditCard" class="credit-card-form">
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Number</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardNumber"
                name="cardNumber"
                class=" credit-card-form__input"
              />
            </div>
          </div>
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Card holder</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardHolder"
                name="cardHolder"
                class=" credit-card-form__input"
              />
            </div>
          </div>
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Expiry date</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardMonth"
                label="Month"
                name="month"
                class="credit-card-form__input "
              />
              <SfInput
                v-model="cardYear"
                label="Year"
                name="year"
                class="credit-card-form__input"
              />
            </div>
          </div>
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Code CVC</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardCVC"
                name="cardCVC"
                class=" credit-card-form__input credit-card-form__input--small"
              />
            </div>
          </div>
          <SfCheckbox
            v-model="cardKeep"
            name="keepcard"
            label="I want to keed this data for other purchases."
          />
        </div>
      </transition>
      <div class="form__action">
        <SfButton
          class="sf-button--full-width form__action-button"
          @click="toReview"
          >Review order</SfButton
        >
        <SfButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary"
          @click="$emit('click:back')"
        >
          Go back to Personal details
        </SfButton>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfImage,
  SfCheckbox
} from "@storefront-ui/vue";
export default {
  name: "Payment",
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfImage,
    SfCheckbox
  },
  props: {
    billingDetails: {
      type: Object,
      default: () => ({})
    },
    chosenPaymentMethod: {
      type: String,
      default: ''
    },
    paymentMethods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      sameAsShipping: false,
      firstName: "",
      lastName: "",
      streetName: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
      paymentMethod: "",
      cardNumber: "",
      cardHolder: "",
      cardMonth: "",
      cardYear: "",
      cardCVC: "",
      cardKeep: false,
      countries: [
        { key: 'US', label: "United States" },
        { key: 'UK', label: "United Kingdom" },
        { key: 'IT', label: "Italy" },
        { key: 'PL', label: "Poland" },
      ]
    };
  },
  computed: {
    isCreditCard() {
      return ["debit", "mastercard", "electron"].includes(this.paymentMethod);
    }
  },
  watch: {
    chosenShippingMethod: {
      handler(value) {
        this.paymentMethod = value;
      },
      immediate: true
    },
    billingDetails: {
      handler(value) {
        // this.sameAsShipping = value.payment.sameAsShipping;
        this.streetName = value.streetName;
        this.apartment = value.apartment;
        this.city = value.city;
        this.state = value.state;
        this.zipCode = value.zipCode;
        this.country = value.country;
        this.phoneNumber = value.phoneNumber;
        this.paymentMethod = value.paymentMethod;
      },
      immediate: true
    },
    sameAsShipping: {
      handler(value) {
        this.streetName = "";
        this.apartment = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
        this.country = "";
        this.phoneNumber = "";
        this.paymentMethod = "";
      }
    }
  },
  methods: {
    toReview() {
      const billingDetails = { ...this.billingDetails };
      // payment.sameAsShipping = this.sameAsShipping;
      billingDetails.firstName = this.firstName;
      billingDetails.lastName = this.lastName;
      billingDetails.streetName = this.streetName;
      billingDetails.streetName = this.streetName;
      billingDetails.apartment = this.apartment;
      billingDetails.city = this.city;
      billingDetails.state = this.state;
      billingDetails.zipCode = this.zipCode;
      billingDetails.country = this.country;
      billingDetails.phoneNumber = this.phoneNumber;

      this.$emit("update:billingDetails", billingDetails);
      this.$emit("update:paymentMethod", this.paymentMethod);
      this.$emit("click:forward");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/variables";

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
@mixin for-mobile {
  @media screen and (max-width: $desktop-min) {
    @content;
  }
}
.title {
  margin-bottom: $spacer-extra-big;
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &__element {
    margin-bottom: $spacer-extra-big;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding-left: $spacer-extra-big;
        }
      }
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    flex: 1;
    &--secondary {
      margin: $spacer-big 0;
      @include for-desktop {
        order: -1;
        margin: 0;
        text-align: left;
      }
    }
  }
  &__select {
    ::v-deep .sf-select__selected {
      padding: 5px 0;
    }
  }
  &__radio {
    white-space: nowrap;
  }
}
.payment-image {
  display: flex;
  align-items: center;
  height: 2.125rem;
  width: auto;
  ::v-deep > * {
    width: auto;
    max-width: unset;
  }
}
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: $spacer-big 0;
    border-top: 1px solid $c-light;
    border-bottom: 1px solid $c-light;
  }
}
.payment-method {
  border-top: 1px solid $c-light;
  @include for-mobile {
    background-color: transparent;
  }
  @include for-desktop {
    border: 0;
    border-radius: 4px;
  }
  &:last-child {
    border-bottom: 1px solid $c-light;
    @include for-desktop {
      border-bottom: 0;
    }
  }
  ::v-deep {
    .sf-radio {
      &__container {
        align-items: center;
      }
      &__content {
        margin: 0 0 0 $spacer;
      }
    }
  }
}
.credit-card-form {
  margin-bottom: $spacer-big;
  @include for-desktop {
    flex: 0 0 66.666%;
    padding: 0 calc((100% - 66.666%) / 2);
  }
  &__group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 $spacer-big 0;
  }
  &__label {
    flex: unset;
  }
  &__element {
    display: flex;
    flex: 0 0 66.666%;
  }
  &__input {
    flex: 1;
    &--small {
      flex: 0 0 46.666%;
    }
    & + & {
      margin-left: $spacer-big;
    }
  }
}
</style>
