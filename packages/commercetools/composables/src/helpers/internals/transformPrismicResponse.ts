type PrismicType = 'html' | 'image' | 'link' | 'embed' | 'text'

interface TransformedPrismicObject {
  type: PrismicType;
  document: any;
}

const parseType = (document: any): PrismicType | undefined => {
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

export default (data: any): TransformedPrismicObject[] => Object.keys(data).map(key => ({
  type: parseType(data[key]),
  document: typeof data[key] === 'object'
    ? data[key]
    : [{
        type: 'paragraph',
        text: data[key],
        spans: [],
    }],
})).filter(data => data.type !== undefined) as TransformedPrismicObject[]
