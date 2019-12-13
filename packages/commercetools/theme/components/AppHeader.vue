<template>
  <SfHeader logo="/icons/logo.svg">
    <template #navigation>
      <SfHeaderNavigationItem>
        <nuxt-link to="/l/cat">
          WOMEN
        </nuxt-link>
      </SfHeaderNavigationItem>
      <SfHeaderNavigationItem>
        <nuxt-link to="/l/cat">
          KIDS
        </nuxt-link>
      </SfHeaderNavigationItem>
      <SfHeaderNavigationItem>
        <nuxt-link to="/l/cat">
          MEN
        </nuxt-link>
      </SfHeaderNavigationItem>
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