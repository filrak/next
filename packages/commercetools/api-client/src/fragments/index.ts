
export const AddressFragment = `
  fragment DefaultAddress on Address {
    title
    firstName
    lastName
    streetName
    streetNumber
    postalCode
    city
    region
    country
    company
  }
`

export const CustomerFragment = `
  fragment DefaultCustomer on Customer {
    firstName
    lastName
    email
  }
`

export const CartFragment = `
  ${AddressFragment}
  ${CustomerFragment}

  fragment DefaultCart on Cart {
    id
    customerId
    customerEmail
    lineItems {
      id
      productId
      name(locale: $locale)
      productSlug(locale: $locale)
      quantity
      variant {
        id
        sku
        images {
          url
          label
        }
        attributeList {
          name
          ... on BooleanAttribute {
            booleanValue: value
          }
          ... on DateAttribute {
            dateValue: value
          }
          ... on DateTimeAttribute {
            dateTimeValue: value
          }
          ... on StringAttribute {
            stringValue: value
          }
          ... on TimeAttribute {
            timeValue: value
          }
          ... on NumberAttribute {
            numberValue: value
          }
          ... on EnumAttribute {
            key
            label
          }
          ... on LocalizedEnumAttribute {
            key
            localizedLabel: label(locale: $locale)
          }
          ... on LocalizedStringAttribute {
            localizedString: value(locale: $locale)
          }
          ... on MoneyAttribute {
            centAmount
            currencyCode
          }
          ... on ReferenceAttribute {
            typeId
            id
          }
        }
      }
      price {
        value {
          centAmount
        }
      }
    }
    totalPrice {
      centAmount
    }
    shippingAddress {
      ...DefaultAddress
    }
    billingAddress {
      ...DefaultAddress
    }
    customer {
      ...DefaultCustomer
    }
    cartState
    version
  }
`
