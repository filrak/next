<template>
  <div :class="{ [`${className}`]: true, 'slice-container': true }">
    <div class="slice-element" v-html="renderBlock(slice)" :key="i" v-for="(slice, i) in slices">
    </div>
  </div>
</template>

<script>
import { usePrismic } from '@vue-storefront/prismic'
import { ref, reactive } from '@vue/composition-api'

const transformRepeatableBlock = (block) => {
  return block[Object.keys(block)[0]]
}

const parseType = (repeatableBlock) => {
  const block = transformRepeatableBlock(repeatableBlock)

  if (typeof block === 'string' || typeof block === 'number') {
    return 'text'
  }

  if (Array.isArray(block)) {
    return 'html'
  }

  if (block.dimensions !== undefined) {
    return 'image'
  }

  if (block.embed_url !== undefined) {
    return 'embed'
  }

  if (block.link_type !== undefined) {
    return block.kind === 'image' ? 'image' : 'link'
  }

  return undefined
}

const transformBlock = (block) => ({
  type: parseType(block),
  document: typeof transformRepeatableBlock(block) === 'object'
    ? transformRepeatableBlock(block)
    : [{
      type: 'paragraph',
      text: transformRepeatableBlock(block),
      spans: []
    }]
})

export default {
  props: {
    slice: {
      type: Object,
      require: true
    }
  },
  setup({ slice }) {
    const className = ref(slice.slice_type)
    const slices = reactive([])

    slice.items.forEach(item => {
      slices.push(transformBlock(item))
    })

    const renderBlock = (element) => {
      const { type, document } = element

      switch (type) {
        case 'html':
          return render.RichText.asHtml(document)
        case 'image':
          const { height, width, url, alt, name } = document
          return `<img src="${url}" height="${height}" width="${width}" alt="${alt || name}" />`
        case 'text':
          return render.RichText.asText(document)
        case 'embed':
          if (document.html) {
            return document.html
          }
        case 'link':
          return render.Link.url(document.url)
        default:
          return ''
      }
    }

    return {
      className,
      slices,
      renderBlock
    }
  }  
}
</script>

<style lang="scss" scoped>
  .slice-container {
    margin: 15px 0
  }

  .grid-slce {
    display: flex;
    justify-content: space-around;
  }
</style>