import { PrismicTransformedBlock } from '../../types';
import PrismicDOM from 'prismic-dom'

const renderBlock = ({ type, element }: PrismicTransformedBlock): string => {
  switch (type) {
    case 'html':
      return PrismicDOM.RichText.asHtml(element)
    case 'image':
      const { height, width, url, alt, name } = element
      return `<img src="${url}" height="${height}" width="${width}" alt="${alt || name}" />`
    case 'text':
      return PrismicDOM.RichText.asText(element)
    case 'embed':
      if (element.html) {
        return element.html
      }
    case 'link':
      return PrismicDOM.Link.url(element.url)
    default:
      return ''
  }
}

export default renderBlock
