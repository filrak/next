<template>
  <SfTabs :openTab="1">
    <SfTab title="Shiipping details">
      <div class="info-text">
        Manage all the shipping addresses you want (work place, home address ...)
        This way won't have to enter the shipping address manually with each order.
      </div>
      <div class="address" v-for="(address, i) in addresses" :key="i">
        <div class="address__details">
          <div class="address__details__row address__details__row--full-name">{{ address.firstName }} {{ address.lastName }}</div>
          <div class="address__details__row">{{ address.street }} {{ address.streetNumber }} {{ address.postCode }}</div>
          <div class="address__details__row">{{ address.city }}</div>
          <div class="address__details__row address__details__row--spaced">{{ address.email }}</div>
        </div>
        <div class="address__actions">
          <nuxt-link class="sf-button change-button" to="/my-account/shipping-details/edit">Change</nuxt-link>
          <SfButton class="color-secondary">Delete</SfButton>
        </div>
      </div>
      <SfButton class="submit-button ">Add new address</SfButton>
    </SfTab>
  </SfTabs>
</template>

<script>
import { ref } from '@vue/composition-api'
import { SfTabs, SfButton } from '@storefront-ui/vue'

export default {
  components: { SfTabs, SfButton },
  setup() {
    const addresses = ref([{
      firstName: 'John',
      lastName: 'Doe',
      street: 'street xxx',
      postCode: '11-111',
      streetNumber: '14',
      city: 'London',
      email: 'john@doe.com'
    }])

    return { addresses }
  }
}
</script>

<style lang="scss" scoped>
@import "./profile.scss";

.address {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f2f3;
  border-bottom: 1px solid #f1f2f3;
  margin-top: 30px;
  padding: 20px 0;

  &__details {
    font-size: 14px;

    &__row {
      line-height: 1.4;

      &--full-name {
        font-size: 16px;
        font-weight: bold;
      }

      &--spaced {
        padding-top: 10px;
      }
    }
  }

  &__actions {
    display: flex;
    margin: 0 -5px;

    > * {
      margin: 0 5px;
    }
  }
}

.change-button {
  display: block;
  color: #1c1e21;
}

</style>
