<template>
  <div v-if="!loading">
    <prismic-recursive :data="document.results[0].data" />
  </div>
</template>
<script>

import Vue from 'vue'
import { usePrismic } from '@vue-storefront/prismic'
import PrismicRecursive from '@vue-storefront/prismic/components/PrismicRecursive'

export default {
  components: {
    PrismicRecursive
  },
  setup(props, context) {
    const { document, search, loading } = usePrismic()

    search({
      at: {
        fragment: 'document.type',
        value: 'privacy-policy'
      }
    })

    return {
      document,
      loading
    }
  }
}
</script>
