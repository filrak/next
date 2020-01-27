import getShippingMethodsByCartId from '../../../src/api/getShippingMethodsByCartId'
import { apolloClient } from '../../../src/index'
import defaultQuery from '../../../src/api/getShippingMethodsByCartId/defaultQuery'

describe('[commercetools-api-client] getShippingMethodsByCartId', () => {
  it('fetches shipping methods by given cart id', async () => {
    const givenVariables = {
      cartId: 'cart id',
    };

    (apolloClient.query as any).mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables)
      expect(query).toEqual(defaultQuery)

      return { data: 'shipping response' }
    })

    const { data } = await getShippingMethodsByCartId('cart id')

    expect(data).toBe('shipping response')
  });
});
