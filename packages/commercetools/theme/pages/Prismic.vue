<template>
  <div>
    <div v-for="page in pages" :key="getPageId(page)">
      <div v-for="(block, i) in getBlocks(page)" :key="i">
        <div v-html="block" />
      </div>
    </div>
  </div>
</template>
<script>

import { ref, computed } from '@vue/composition-api'
import { usePrismic, getPages, getBlocks, getPageId } from '@vue-storefront/prismic'

export default {
  setup() {
    const { doc, search, loading, error } = usePrismic()
    const pages = computed(() => getPages(doc.value))

    // doc.page -> getCurrentPage: number
    // doc.results_per_page -> getResultsPerPage: number
    // doc.results_size: -> getResultsSize: number
    // doc.total_results_size -> getTotalResultsSize: number
    // doc.total_pages ->  getTotalPages: number
    // doc.next_page -> getNextPage: string | null
    // doc.prev_page -> getPrevPage: string | null

    // search({
    //   at: {
    //     fragment: 'document.type',
    //     value: 'privacy-policy'
    //   },
    // })

    search({}, {
      pageSize: 1,
    })

    return {
      pages,
      loading,
      error,
      getBlocks,
      getPageId
    }
  }
}
</script>
