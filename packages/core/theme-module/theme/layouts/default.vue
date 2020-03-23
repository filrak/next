<template>
  <div>
    <TopBar />
    <div id="layout" >
      <AppHeader />
      <nuxt />
      <BottomNavigation />
      <AppFooter />
      <CartSidebar />
      <LoginModal />
    </div>
    <Version />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import Version from '~/components/Version.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
// const CartSidebar = () => import(/* webpackChunkName: "CartSidebar" */ '~/components/CartSidebar.vue')
// const LoginModal = () => import(/* webpackChunkName: "LoginModal" */ '~/components/LoginModal.vue')

export default {
  components: {
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    LoginModal,
    Version
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

#layout {
  box-sizing: border-box;
  @media screen and (min-width: $desktop-min) {
    max-width: 1240px;
    margin: auto;
  }
}

// Reset CSS
body {
  color: var(--c-text);
  font-size: var(--font-size-regular);
  font-family: var(--body-font-family-primary);
  font-weight: var(--body-font-weight-primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}
h1 {
  font-family: var(--body-font-family-secondary);
  font-size: var(--h1-font-size);
  font-weight: var(--h1-font-weight);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--body-font-family-secondary);
  font-size: var(--h2-font-size);
  font-weight: var(--h2-font-weight);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--body-font-family-secondary);
  font-size: var(--h3-font-size);
  font-weight: var(--h3-font-weight);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--body-font-family-secondary);
  font-size: var(--h4-font-size);
  font-weight: var(--h4-font-weight);
  line-height: 1.6;
  margin: 0;
}
</style>
