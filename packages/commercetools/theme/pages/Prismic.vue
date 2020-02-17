<template>
  <div>
    <prismic-document v-if="!loading && !error" :data="doc.results[0].data" />
  </div>
</template>
<script>

import { usePrismic } from '@vue-storefront/prismic'
import PrismicDocument from '@vue-storefront/prismic/components/PrismicDocument'

export default {
  components: {
    PrismicDocument
  },
  setup() {
    const { doc, search, loading, error } = usePrismic()

    search({
      at: {
        fragment: 'document.type',
        value: 'privacy-policy'
      }
    })

    return {
      doc,
      loading,
      error,
    }
  }
}
</script>
