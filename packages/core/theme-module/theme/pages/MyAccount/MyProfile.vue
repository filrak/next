<template>
  <SfTabs :open-tab="1">
    <SfTab title="Personal data">
      <p class="message">
        Feel free to edit any of your details below so your account is always up
        to date
      </p>
      <div class="form">
        <SfInput
          v-model="firstName"
          name="firstName"
          label="First Name"
          required
          class="form__element form__element--half"
        />
        <SfInput
          v-model="lastName"
          name="lastName"
          label="Last Name"
          required
          class="form__element form__element--half form__element--half-even"
        />
        <SfInput
          v-model="email"
          type="email"
          name="email"
          label="Your e-mail"
          required
          class="form__element"
        />
        <SfButton class="form__button" @click="updatePersonal"
          >Update personal data</SfButton
        >
      </div>
      <p class="notice">
        At Brand name, we attach great importance to privacy issues and are
        committed to protecting the personal data of our users. Learn more about
        how we care and use your personal data in the
        <a href="">Privacy Policy.</a>
      </p>
    </SfTab>
    <SfTab title="Password change">
      <p class="message">
        If you want to change the password to access your account, enter the
        following information:<br />Your current email address is
        <span class="message__label">example@email.com</span>
      </p>
      <form class="form" @submit.prevent="updatePassword">
        <SfInput
          v-model="form.currentPassword"
          type="password"
          name="currentPassword"
          label="Current Password"
          required
          class="form__element"
        />
        <SfInput
          v-model="form.newPassword"
          type="password"
          name="newPassword"
          label="New Password"
          required
          class="form__element form__element--half"
        />
        <SfInput
          v-model="form.repeatPassword"
          type="password"
          name="repeatPassword"
          label="Repeat Password"
          required
          class="form__element form__element--half form__element--half-even"
        />
        <SfButton class="form__button" type="submit">Update password</SfButton>
        <SfAlert v-if="error" class="alert" type="danger" :message="error" />
      </form>
    </SfTab>
  </SfTabs>
</template>
<script>
import { SfTabs, SfInput, SfButton, SfAlert } from '@storefront-ui/vue';
import { useUser } from '@vue-storefront/commercetools-composables';
import { ref } from '@vue/composition-api';
// import { useUser } from '<%= options.composables %>';
export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfAlert
  },
  props: {
    account: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const { user, changePassword, error } = useUser();
    const form = ref({});

    const updatePassword = async () => {
      await changePassword(form.value.currentPassword, form.value.newPassword);
      if (!error.value) {
        form.value = {};
      }
    };

    return {
      user,
      error,
      form,
      updatePassword
    };
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: ''
    };
  },
  watch: {
    account: {
      handler(value) {
        this.firstName = value.firstName;
        this.lastName = value.lastName;
        this.email = value.email;
      },
      immediate: true
    }
  },
  methods: {
    updatePersonal() {
      const personal = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      };
      this.$emit('update:personal', personal);
    }
  }
};
</script>
<style lang='scss' scoped>
@import '~@storefront-ui/vue/styles';
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
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
  &__button {
    width: 100%;
    @include for-desktop {
      width: auto;
    }
  }
}
.message,
.notice {
  font-family: $body-font-family-primary;
  font-weight: $body-font-weight-primary;
  line-height: 1.6;
}
.message {
  margin: 0 0 $spacer-extra-big 0;
  font-size: $font-size-regular-mobile;
  @include for-desktop {
    font-size: $font-size-regular-desktop;
  }
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: $spacer-big 0 0 0;
  font-size: $font-size-extra-small-mobile;
  @include for-desktop {
    max-width: 70%;
    margin: $spacer 0 0 0;
    font-size: $font-size-extra-small-desktop;
  }
}
</style>
