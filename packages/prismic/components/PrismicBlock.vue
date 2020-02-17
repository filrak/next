<template>
  <div v-html="renderedBlock" />
</template>

<script>
import PrismicDom from 'prismic-dom'
import { usePrismic } from '@vue-storefront/prismic'

export default {
  props: {
    block: {
      type: Object | String | Number,
      required: true
    }
  },
  setup({ block }) {
    const { renderBlock, transformBlock } = usePrismic()

    const renderedBlock = renderBlock(transformBlock(block))

    return {
      renderedBlock
    }
  }
}
</script>
