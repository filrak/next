<template>
  <SfTabs :openTab="1">
    <SfTab title="Change the address">
      <div class="info-text">
        Keep your address and contact details updated.
      </div>
      <form class="form">
        <div class="form__row">
          <SfInput type="text" label="First name *" />
          <SfInput type="text" label="Last name *" />
        </div>
        <div class="form__row">
          <SfInput type="text" label="Street name *" />
        </div>
        <div class="form__row">
          <SfInput type="text" label="City *" />
          <SfInput type="text" label="State/Province *" />
        </div>
        <div class="form__row">
          <SfInput type="text" label="Zip-code *" />
          <SfInput type="text" label="Country *" />
        </div>
        <div class="form__row">
          <SfInput type="text" label="Phone number *" />
        </div>
        <SfButton class="submit-button">Update the address</SfButton>
      </form>
    </SfTab>
  </SfTabs>
</template>

<script>
import { SfTabs, SfButton, SfInput } from '@storefront-ui/vue'

export default {
  components: { SfTabs, SfInput, SfButton },
}
</script>

<style lang="scss" scoped>
@import "./profile.scss";


</style>
