import { ProductVariant } from './types/GraphQL'
import { formatAttributeList } from './_utils'

const getVariantByAttributes = (products: ProductVariant[], attributes: any): ProductVariant => {
  if (!products || products.length === 0) {
    return null
  }

  const configurationKeys = Object.keys(attributes)

  return products.find(product => {
    const currentAttributes = formatAttributeList(product.attributeList)

    return configurationKeys.every(attrName =>
      currentAttributes.find(({ name, value }) => attrName === name && attributes[attrName] === value)
    )
  })
}

export default getVariantByAttributes
