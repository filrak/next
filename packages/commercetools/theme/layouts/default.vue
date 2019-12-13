<template>
  <div>
    <Header />
    <nuxt />
    <BottomNavigation />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import BottomNavigation from '~/components/BottomNavigation.vue'

export default {
  components: {
    Header,
    BottomNavigation
  }
}
</script>
<style lang="scss">
@import "~@storefront-ui/vue/styles.scss";
@import "~@storefront-ui/shared/styles/helpers/visibility";
@import "~@storefront-ui/vue/src/utilities/transitions/transitions";

body {
  padding: 0;
  margin: 0;
}
</style>
