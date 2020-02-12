<template>
  <div v-if="!loading">
    <prismic-document :data="document.results[0].data" />
  </div>
</template>
<script>

import Vue from 'vue'
import { usePrismic } from '@vue-storefront/prismic'
import PrismicDocument from '@vue-storefront/prismic/components/PrismicDocument'

export default {
  components: {
    PrismicDocument
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
