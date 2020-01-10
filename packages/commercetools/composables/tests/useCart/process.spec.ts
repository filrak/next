import {
  processAddToCart,
  processUpdateQuantity,
  processRemoveFromCart
} from '../../src/useCart/process'


jest.mock('@vue-storefront/commercetools-api', () => ({
  updateCart: args => args
}))

jest.mock('./../../src/helpers/internals', () => ({
  enhanceCart: args => args
}))

const cart = {
  id: 1,
  version: 1
} as any

describe('[commercetools-composables] useCart/process', () => {
  it('process AddToCartAction', async () => {
    const product = { id: 1, sku: '123' } as any

    const response = await processAddToCart(cart, product, 2)

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          addLineItem: {
            variantId: 1,
            sku: '123',
            quantity: 2
          }
        }
      ]
    })
  })

  it('process RemoveLineItemAction', async () => {
    const product = { id: 1, sku: '123', qty: 2 } as any

    const response = await processRemoveFromCart(cart, product)

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          removeLineItem: {
            lineItemId: 1,
            quantity: 2
          }
        }
      ]
    })
  })

  it('process ChangeLineItemQuantityAction', async () => {
    const product = { id: 1, sku: '123', qty: 2 } as any

    const response = await processUpdateQuantity(cart, product)

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          changeLineItemQuantity: {
            lineItemId: 1,
            quantity: 2
          }
        }
      ]
    })
  })
});
