import PrismicDOM from 'prismic-dom'
import { PrismicBlockType, PrismicBlock } from 'src/types'

const getType = (block: PrismicBlock | number | string | PrismicBlock[]): PrismicBlockType | undefined => {
  if (typeof block === 'string' || typeof block === 'number') {
    return 'text'
  }

  if (Array.isArray(block)) {
    return 'html'
  }

  if (!block.dimensions) {
    return 'image'
  }

  if (!block.embed_url) {
    return 'embed'
  }

  if (!block.link_type) {
    return block.kind === 'image' ? 'image' : 'link'
  }

  return undefined
}

const getElement = (block: PrismicBlock | number | string): PrismicBlock | PrismicBlock[] => {
  if (typeof block === 'object') {
    return block
  }

  return [{ type: 'paragraph', text: block, spans: [] }]
}

const transformBlock = (block: PrismicBlock | PrismicBlock[]): string => {
  const blockType = getType(block)
  const element = getElement(block) as PrismicBlock

  switch (blockType) {
    case 'html':
      return PrismicDOM.RichText.asHtml(element)
    case 'image':
      const { height, width, url, alt, name } = element
      return `<img src="${url}" height="${height}" width="${width}" alt="${alt || name}" />`
    case 'text':
      return PrismicDOM.RichText.asText(element)
    case 'embed':
      return element.html || ''
    case 'link':
      return PrismicDOM.Link.url(element.url)
    default:
      return ''
  }
}

export { transformBlock }
