
const getAttributeValue = (attribute) => {
  switch(attribute.__typename) {
    case 'StringAttribute':
      return attribute.stringValue
    case 'DateAttribute':
      return attribute.dateValue
    case 'DateTimeAttribute':
      return attribute.dateTimeValue
    case 'TimeAttribute':
      return attribute.timeValue
    case 'NumberAttribute':
      return attribute.numberValue
    case 'EnumAttribute':
      return attribute.label
    case 'LocalizedEnumAttribute':
      return attribute.localizedLabel
    case 'LocalizedStringAttribute':
      return attribute.localizedString
    case 'MoneyAttribute':
      return attribute.centAmount
    case 'BooleanAttribute':
      return attribute.booleanValue
    case 'ReferenceAttribute': 
      return { typeId: attribute.typeId, id: attribute.id }
    default:
      return null
  }
}

const formatAttributeList = (attributes: any) => {
  return attributes.map(attr => ({
    name: attr.name,
    value: getAttributeValue(attr),
    label: attr.label
  }))
}

const formatProductAttributeList = (product) => {
  product.masterData.current.masterVariant.attributeList = formatAttributeList(product.masterData.current.masterVariant.attributeList)
  product.masterData.current.variants = product.masterData.current.variants.map(variant => {
    variant.attributeList = formatAttributeList(variant.attributeList)
    return variant
  })
  return product
}

export {
  formatProductAttributeList
}