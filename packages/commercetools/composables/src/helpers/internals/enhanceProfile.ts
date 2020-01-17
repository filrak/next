// import { ProfileResponse } from '@vue-storefront/commercetools-api/lib/src/types/Api'
import { enhanceLineItems } from './enhanceCart'

const enhanceProfile = (profileResponse: any): any => {
  const { lineItems } = profileResponse.data.me.activeCart

  profileResponse.data.me.activeCart.lineItems = enhanceLineItems(lineItems)

  return profileResponse
}

export default enhanceProfile
