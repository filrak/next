import gql from 'graphql-tag'

export default gql`
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

  query getCart($cartId: String!, $locale: Locale!, $attributesIncluded: [String!]!) {
    cart(id: $cartId) {
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
          attributesRaw(includeNames: $attributesIncluded) {
            name
            value
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
      cartState
      version
    }
  }
`;
