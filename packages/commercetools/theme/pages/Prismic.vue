<template>
  <div>ok</div>
</template>
<script>

import Vue from 'vue'
import { usePrismic } from '@vue-storefront/prismic'

export default {
  setup(props, context) {
    const { document, search } = usePrismic()

    search([])

    return {
      document
    }
  }
}
</script>
