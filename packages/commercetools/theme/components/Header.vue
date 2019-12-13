<template>
  <SfHeader :logo="logo" title="Next">
    <template #navigation>
      <SfHeaderNavigationItem>Link one</SfHeaderNavigationItem>
      <SfHeaderNavigationItem>Link two</SfHeaderNavigationItem>
    </template>
    <template #search>
      CUSTOM
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader } from '@storefront-ui/vue'

export default {
  components: {
    SfHeader
  },
  data() {
    return {
      logo: {
        small: '/icons/logo.svg',
        normal: '/icons/logo.svg'
      }
    }
  }
}
</script>