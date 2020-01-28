import {
  getProductVariants,
  getProductOptions,
} from '@vue-storefront/commercetools-helpers'
import { ProductVariant } from "../../../api-client/src/types/GraphQL";

const getDefaultConfiguration = (products: ProductVariant[]) => {
  const defaultOptions = getProductOptions([getProductVariants(products, { master: true }) as ProductVariant])

  return Object.keys(defaultOptions).reduce((prev, curr) => ({
    ...prev,
    [curr]: defaultOptions[curr][0].value
  }), {})
}

export default getDefaultConfiguration
