<template>
  <div>
    <SfBreadcrumbs
      class="breadcrumbs"
      :breadcrumbs="breadcrumbs"
    />
    <div class="container">
      <div class="container__sticky">
        <SfSticky>
          <div class="menu">
            <div class="menu__header">My account</div>

            <div class="menu__heading">Personal details</div>
            <nuxt-link class="menu__link menu__link--selected" to="/my-account/profile">My profile</nuxt-link>
            <nuxt-link class="menu__link" to="/my-account/shipping-details">Shipping details</nuxt-link>

            <div class="menu__heading">Order details</div>
            <nuxt-link class="menu__link" to="/my-account/order-history">Order history</nuxt-link>
          </div>
        </SfSticky>
      </div>
      <div class="content">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import { SfSticky, SfBreadcrumbs } from '@storefront-ui/vue'

export default {
  layout: 'account',
  components: { SfSticky, SfBreadcrumbs },
  setup() {
    return {
      breadcrumbs: [
        {
          text: "Home",
          route: {
            link: "#"
          }
        },
        {
          text: "My account",
          route: {
            link: "#"
          }
        },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.container {
  display: flex;

  &__sticky {
    flex: 0 1 350px;
    background: #f1f2f3;
  }
}

.menu {
  padding: 40px;

  &__header {
    font-size: 24px;
    line-height: 1.39;
  }

  &__heading  {
    font-size: 18px;
    line-height: 1.61;
    color: #1d1f22;
    padding: 40px 0 20px;
  }

  &__link {
    display: block;
    font-size: 14px;
    color: #1d1f22;
    line-height: 1.64;
    padding: 5px 0;
  }

  &::v-deep .nuxt-link-active {
    font-weight: bold;
    text-decoration: underline;
  }
}

.content {
  margin-left: 50px;
  flex: 1;
}

.breadcrumbs {
  padding: $spacer-big $spacer-extra-big $spacer-extra-big;
}
</style>
