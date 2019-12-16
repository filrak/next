<template>
  <SfHeader logo="/icons/logo.svg">
    <template #navigation>
      <nuxt-link to="/l/cat">
        <SfHeaderNavigationItem>
          WOMEN
        </SfHeaderNavigationItem>
      </nuxt-link>
      <nuxt-link to="/l/cat">
        <SfHeaderNavigationItem>
          MEN
        </SfHeaderNavigationItem>
      </nuxt-link>
      <nuxt-link to="/l/cat">
        <SfHeaderNavigationItem>
          KIDS
        </SfHeaderNavigationItem>
      </nuxt-link>
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