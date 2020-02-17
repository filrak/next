import { PrismicBlockType } from "src/types";

const parseType = (block: any | any[]): PrismicBlockType | undefined => {
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

export default parseType
