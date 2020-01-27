import gql from 'graphql-tag'
import { ShippingMethodFragment } from '../../fragments'

export default gql`
  ${ShippingMethodFragment}

  query shippingMethods($cartId: String!) {
    shippingMethods: shippingMethodsByCart(id: $cartId) {
      ...DefaultShippingMethod
    }
  }
`;
