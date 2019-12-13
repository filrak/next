<template>
  <SfHeader logo="/icons/logo.svg">
    <template #navigation>
      <SfHeaderNavigationItem>Category</SfHeaderNavigationItem>
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader } from '@storefront-ui/vue'

export default {
  components: {
    SfHeader
  }
}
</script>