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

  mutation updateCart($id: String!, $version: Long!, $actions: [CartUpdateAction!]!, $locale: Locale!) {
    cart: updateCart(id: $id, version: $version, actions: $actions) {
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
          attributesRaw {
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
