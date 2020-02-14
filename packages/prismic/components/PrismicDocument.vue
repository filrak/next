<template>
  <div>
    <prismic-block :key="block.key" v-for="block in blocks" :block="block.element" />
    <prismic-slice :key="i" v-for="(slice, i) in slices" :slice="slice" />
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import PrismicBlock from '@vue-storefront/prismic/components/PrismicBlock'
import PrismicSlice from '@vue-storefront/prismic/components/PrismicSlice'

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

export default {
  components: {
    PrismicBlock,
    PrismicSlice
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup({ data }) {
    const blocks = reactive([])
    const slices = reactive([])

    Object.keys(data).forEach((key) => {
      const element = data[key]

      if (key === 'body') {
        // TODO
        element.forEach(slice => {
          slices.push(slice);
        })
      } else {
        blocks.push({ key, element })
      }
    })

    return {
      blocks,
      slices
    }
  }
}
</script>