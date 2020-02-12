<template>
  <div>
    <prismic-block :key="block.key" v-for="block in blocks" :block="block.element" />
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import PrismicBlock from '@vue-storefront/prismic/components/PrismicBlock'

const parseType = (document) => {
  if (typeof document === 'string' || typeof document === 'number') {
    return 'text'
  }

  if (Array.isArray(document)) {
    return 'html'
  }

  if (document.dimensions !== undefined) {
    return 'image'
  }

  if (document.embed_url !== undefined) {
    return 'embed'
  }

  if (document.link_type !== undefined) {
    return document.kind === 'image' ? 'image' : 'link'
  }

  return undefined
}

const transformToBlocks = (data) => (
  Object
    .keys(data)
    .map(key => ({
      type: parseType(data[key]),
      document: typeof data[key] === 'object'
        ? data[key]
        : [{
          type: 'paragraph',
          text: data[key],
          spans: [],
        }]
      }))
    .filter(data => data.type !== undefined)
)

export default {
  components: {
    PrismicBlock
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup({ data }) {
    const blocks = reactive([])

    Object.values(data).forEach((element, key) => {
      blocks.push({ key, element })
    })

    return {
      blocks
    }
  }
}
</script>