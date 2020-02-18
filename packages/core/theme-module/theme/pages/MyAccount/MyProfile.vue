<template>
  <SfTabs :openTab="1">
    <SfTab title="Personal data">
      Feel free to edit of your details below so your account is always up to date.
      <form class="form">
        <div class="form__row">
          <SfInput type="text" label="First name *" />
          <SfInput type="text" label="Last name *" />
        </div>
        <div class="form__row">
          <SfInput type="text" label="Email *" />
        </div>
        <SfButton class="submit-button">Update personal data</SfButton>
        <p class="privacy-info">
          At Brand name, we attach great importance to privacy issues and are committed to protecting
          the personal data of our users. Learn more about how  we care and use your personal data
          in the Privacy Policy.
        </p>
      </form>
    </SfTab>
    <SfTab title="Password change">
      If you want to change the password to access your account, enter the following information:
      Your current email address is: exmaple@example.com
      <form class="form">
        <div class="form__row">
          <SfInput type="text" label="Current password *" />
        </div>
        <div class="form__row">
          <SfInput type="text" label="New password *" />
          <SfInput type="text" label="Repeat password *" />
        </div>
        <SfButton class="submit-button">Update password</SfButton>
      </form>
    </SfTab>
  </SfTabs>
</template>

<script>
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue'

export default {
  components: { SfTabs, SfInput, SfButton }
}
</script>

<style lang="scss" scoped>
@import "./profile.scss";

.privacy-info {
  font-size: 10px;
  max-width: 500px;
}

</style>
