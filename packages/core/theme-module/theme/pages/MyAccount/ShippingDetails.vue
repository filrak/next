<template>
  <transition name="fade">
    <SfTabs
      v-if="showAddUpdateForm"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab title="Change the address">
        <p class="message">
          Keep your shipping and contact details updated.
        </p>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form id="shipping-details-form" class="form" @submit.prevent="handleSubmit(handleForm)">
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  v-model="firstName"
                  name="firstName"
                  label="First Name"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  v-model="lastName"
                  name="lastName"
                  label="Last Name"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
            </div>
            <ValidationProvider rules="required|min:5" v-slot="{ errors }" class="form__element">
              <SfInput
                v-model="streetName"
                name="streetName"
                label="Street Name"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfInput
              v-model="streetNumber"
              name="streetNumber"
              label="House/Apartment number"
              required
              class="form__element"
            />
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  v-model="city"
                  name="city"
                  label="City"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
              <SfInput
                  v-model="state"
                  name="state"
                  label="State/Province"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:4" v-slot="{ errors }" class="form__element">
                <SfInput
                  v-model="postalCode"
                  name="postalCode"
                  label="Zip-code"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider :rules="`required|oneOf:${countries.join(',')}`" v-slot="{ errors }" class="form__element">
                <SfSelect
                  v-model="country"
                  name="country"
                  label="Country"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                >
                  <SfSelectOption
                    v-for="countryOption in countries"
                    :key="countryOption"
                    :value="countryOption"
                  >
                    {{ countryOption }}
                  </SfSelectOption>
                </SfSelect>
              </ValidationProvider>
            </div>
            <ValidationProvider rules="required|min:8" v-slot="{ errors }" class="form__element">
              <SfInput
                v-model="phone"
                name="phone"
                label="Phone number"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfButton v-if="formType === 'UPDATE'" :type="submit" class="form__button">Update the address</SfButton>
            <SfButton v-if="formType === 'CREATE'" :type="submit" class="form__button">Create a new address</SfButton>
          </form>
        </ValidationObserver>
      </SfTab>
    </SfTabs>
    <SfTabs v-else key="address-list" :open-tab="1" class="tab-orphan">
      <SfTab title="Shipping details">
        <p class="message">
          Manage all the shipping addresses you want (work place, home address
          ...) This way you won"t have to enter the shipping address manually
          with each order.
        </p>
        <transition-group tag="div" name="fade" class="shipping-list">
          <div
            v-for="(address) in account.getShippingAddresses()"
            :key="address.id"
            class="shipping"
          >
            <div class="shipping__content">
              <p class="shipping__address">
                <span class="shipping__client-name"
                  >{{ address.firstName }} {{ address.lastName }}</span
                ><br />
                {{ address.streetName }} {{ address.streetNumber }}<br />{{
                  address.postalCode
                }}
                {{ address.city }},<br />{{ address.country }}
              </p>
              <p class="shipping__address">
                {{ address.phone }}
              </p>
            </div>
            <div class="shipping__actions">
              <SfIcon
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="mobile-only"
                @click="deleteAddress(address)"
              />
              <SfButton @click="changeAddress(address.id)">Change</SfButton>
              <SfButton
                class="shipping__button-delete desktop-only"
                @click="deleteAddress(address)"
                >Delete</SfButton
              >
            </div>
          </div>
        </transition-group>
        <SfButton class="action-button" @click="changeAddress()"
          >Add new address</SfButton
        >
      </SfTab>
    </SfTabs>
  </transition>
</template>
<script>
import {
  SfTabs,
  SfInput,
  SfButton,
  SfSelect,
  SfIcon
} from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import { useUserAddress } from '<%= options.composables %>';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, oneOf } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country'
});

export default {
  name: 'ShippingDetails',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfSelect,
    SfIcon,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    account: {
      type: Object,
      default: () => ({})
    }
  },
  setup({ account }) {
    const userAddress = useUserAddress();
    const showAddUpdateForm = ref(false);
    const formType = ref('CREATE');
    const editedAddress = ref(-1);
    const countries = [
      'PL',
      'DE',
      'US',
      'Austria',
      'Azerbaijan',
      'Belarus',
      'Belgium',
      'Bosnia and Herzegovina',
      'Bulgaria',
      'Croatia',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Estonia',
      'Finland',
      'France',
      'Georgia',
      'Germany',
      'Greece',
      'Hungary',
      'Iceland',
      'Ireland',
      'Italy',
      'Kosovo',
      'Latvia',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macedonia',
      'Malta',
      'Moldova',
      'Monaco',
      'Montenegro',
      'The Netherlands',
      'Norway',
      'Poland',
      'Portugal',
      'Romania',
      'Russia',
      'San Marino',
      'Serbia',
      'Slovakia',
      'Slovenia',
      'Spain',
      'Sweden',
      'Switzerland',
      'Turkey',
      'Ukraine',
      'United Kingdom',
      'Vatican City'
    ];
    const addressId = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const streetName = ref('');
    const streetNumber = ref('');
    const city = ref('');
    const state = ref('');
    const postalCode = ref('');
    const country = ref('');
    const phone = ref('');

    const changeAddress = (id = null) => {
      const address = id !== null
        ? account.getShippingAddresses().find(shippingAddress => id === shippingAddress.id)
        : {};

      formType.value = id === null ? 'CREATE' : 'UPDATE';
      showAddUpdateForm.value = true;

      addressId.value = id || '';
      firstName.value = address.firstName || account.firstName || '';
      lastName.value = address.lastName || account.lastName || '';
      streetName.value = address.streetName || '';
      city.value = address.city || '';
      state.value = address.state || '';
      postalCode.value = address.postalCode || '';
      country.value = address.country || '';
      phone.value = address.contactInfo ? address.contactInfo.phone || '' : '';
    };

    const addAddress = () => userAddress.addAddress(
      {
        firstName: firstName.value,
        lastName: lastName.value,
        streetName: streetName.value,
        city: city.value,
        state: state.value,
        postalCode: postalCode.value,
        country: country.value,
        phone: phone.value
      },
      'shipping'
    );

    const updateAddress = () => userAddress.updateAddress({
      id: addressId.value,
      firstName: firstName.value,
      lastName: lastName.value,
      streetName: streetName.value,
      city: city.value,
      state: state.value,
      postalCode: postalCode.value,
      country: country.value,
      phone: phone.value
    });

    const deleteAddress = (address) => userAddress.deleteAddress(address);

    const handleForm = () => (formType.value === 'CREATE' ? addAddress : updateAddress)()
      .then(() => {
        showAddUpdateForm.value = false;
      })
      .catch((err) => {
        // TODO: Need to handle it somehow
        console.log(err, 'error');
      });

    return {
      countries,
      firstName,
      lastName,
      streetName,
      streetNumber,
      city,
      state,
      postalCode,
      country,
      phone,
      showAddUpdateForm,
      formType,
      handleForm,
      editedAddress,
      addAddress,
      changeAddress,
      updateAddress,
      deleteAddress
    };
  }
};
</script>
<style lang='scss' scoped>
@import '~@storefront-ui/vue/styles';
@mixin for-mobile {
  @media screen and (max-width: $desktop-min) {
    @content;
  }
}
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-extra-big);
  }

  &__button {
    display: block;
  }

  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-extra-big);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.message {
  margin: 0 0 var(--spacer-extra-big) 0;
  font-family: var(--body-font-family-primary);
  font-weight: var(--body-font-weight-primary);
  line-height: 1.6;
  font-size: var(--font-size-regular-mobile);
  @include for-desktop {
    font-size: var(--font-size-regular-desktop);
  }
}
.shipping-list {
  margin-bottom: var(--spacer-extra-big);
}
.shipping {
  display: flex;
  padding: var(--spacer-big) 0;
  border-top: 1px solid var(--c-light);
  &:last-child {
    border-bottom: 1px solid var(--c-light);
  }
  &__content {
    flex: 1;
    color: var(--c-text);
    font-size: var(--font-size-small-mobile);
    font-weight: 300;
    line-height: 1.6;
    @include for-desktop {
      font-size: var(--font-size-small-desktop);
    }
  }
  &__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include for-desktop {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }
  &__button-delete {
    background-color: var(--c-light);
    color: var(--c-text-muted);
    @include for-desktop {
      margin-left: var(--spacer-big);
    }
  }
  &__address {
    margin: 0 0 var(--spacer-big) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__client-name {
    font-size: var(--font-size-regular-desktop);
    font-weight: 500;
  }
}
.action-button {
  width: 100%;
  @include for-desktop {
    width: auto;
  }
}
.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }
      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}
</style>
