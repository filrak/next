import gql from 'graphql-tag'
import { ShippingMethodFragment } from './../../fragments'

export default gql`
  ${ShippingMethodFragment}

  query shippingMethods($country: Country!) {
    shippingMethods: shippingMethodsByLocation(country: $country) {
      ...DefaultShippingMethod
    }
  }
`;
