<template>
  <div v-html="renderBlock()" />
</template>

<script>
import PrismicDom from 'prismic-dom'
import { usePrismic } from '@vue-storefront/prismic'

const parseType = (block) => {
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
  document: typeof block === 'object'
    ? block
    : [{
      type: 'paragraph',
      text: block,
      spans: []
    }]
})

export default {
  props: {
    block: {
      type: Object | String | Number,
      required: true
    }
  },
  setup({ block }) {
    const { render } = usePrismic()

    const { type, document } = transformBlock(block)

    const renderBlock = () => {
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
      render,
      renderBlock
    }
  }
}
</script>
