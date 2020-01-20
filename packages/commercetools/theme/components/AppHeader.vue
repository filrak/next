<template>
  <SfHeader
    active-sidebar="activeSidebar"
    @click:cart="toggleCartSidebar"
    @click:account="toggleLoginModalOpen"
    >
    <template #logo>
      <nuxt-link to="/" class="sf-header__logo">
        <SfImage src="/icons/logo.svg" alt="Vue Storefront Next" class="sf-header__logo-image"/>
      </nuxt-link>
    </template>
    <template #navigation>
      <nuxt-link to="/c/women">
        <SfHeaderNavigationItem>
          WOMEN
        </SfHeaderNavigationItem>
      </nuxt-link>
      <nuxt-link to="/c/men">
        <SfHeaderNavigationItem>
          MEN
        </SfHeaderNavigationItem>
      </nuxt-link>
      <nuxt-link to="/c/cat">
        <SfHeaderNavigationItem>
          KIDS
        </SfHeaderNavigationItem>
      </nuxt-link>
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue'
import { toggleCartSidebar, toggleLoginModalOpen, isLoggedIn } from '../assets/ui-state'

export default {
  setup () {
    return {
      toggleCartSidebar,
      toggleLoginModalOpen
    }
  },
  components: {
    SfHeader,
    SfImage
  },
  methods: {
    accountClicked() {
      // When need to go to another page or do something else when logged in:
      !isLoggedIn && toggleLoginModalOpen()
    }
  }
}
</script>

<style lang="scss" scoped>
.sf-header__logo-image {
  height: 100%;
}
</style>
