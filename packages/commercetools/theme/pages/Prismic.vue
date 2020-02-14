<template>
  <div>
    <prismic-document v-if="!loading && !error" :data="document.results[0].data" />
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
    const { document, search, loading, error } = usePrismic()

    search({
      at: {
        fragment: 'document.type',
        value: 'slices'
      }
    })

    return {
      document,
      loading,
      error,
    }
  }
}
</script>
