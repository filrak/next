<template>
  <SfHeader
    active-sidebar="activeSidebar"
    @click:cart="toggleCartSidebar"
    @click:account="onAccountClicked"
    :cartItemsQty="cartTotalItems"
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
import { SfHeader, SfImage } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import { useCart } from '<%= options.composables %>';
import { getCartTotalItems } from '<%= options.helpers %>';
import { computed } from '@vue/composition-api';
const { toggleCartSidebar, toggleLoginModal } = uiState;

export default {
  setup() {
    const { cart } = useCart();
    const cartTotalItems = computed(() => {
      return getCartTotalItems(cart.value);
    });
    return {
      cartTotalItems,
      toggleCartSidebar,
      toggleLoginModal
    };
  },
  components: {
    SfHeader,
    SfImage
  },
  methods: {
    onAccountClicked() {
      // When need to go to another page or do something else when logged in
      toggleLoginModal();
    }
  }
};
</script>

<style lang="scss" scoped>
.sf-header__logo-image {
  height: 100%;
}
</style>
