import updateCart from '../../../src/api/updateCart'
import { apolloClient } from '../../../src/index'
import defaultMutation from '../../../src/api/updateCart/defaultMutation'

describe('[commercetools-api-client] updateCart', () => {
  it('updates cart', async () => {
    const givenVariables = {
      locale: 'en',
      id: 'cart id',
      version: 1,
      actions: [{ addLineItem: {} }],
      attributesIncluded: ['color', 'size']
    };

    (apolloClient.mutate as any).mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables)
      expect(mutation).toEqual(defaultMutation)

      return { data: 'cart response' }
    })

    const { data } = await updateCart({
      id: 'cart id',
      version: 1,
      actions: [{ addLineItem: {} }]
    })

    expect(data).toBe('cart response')
  });
});
