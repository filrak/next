import {
  createAddLineItemAction,
  createRemoveLineItemAction,
  createChangeLineItemQuantityAction
} from '../../src/useCart/actions'


describe('[commercetools-composables] useCart/actions', () => {
  it('creates AddLineItemAction', () => {
    const variant = { id: 123, sku: 'WS123' } as any

    expect(createAddLineItemAction(variant, 2)).toEqual({
      addLineItem: {
        variantId: 123,
        sku: 'WS123',
        quantity: 2
      }
    })
  })

  it('creates RemoveLineItemAction', () => {
    const variant = { id: 123, sku: 'WS123', qty: 2 } as any

    expect(createRemoveLineItemAction(variant)).toEqual({
      removeLineItem: {
        lineItemId: 123,
        quantity: 2
      }
    })
  })

  it('creates ChangeLineItemQuantityAction', () => {
    const variant = { id: 123, sku: 'WS123', qty: 2 } as any

    expect(createChangeLineItemQuantityAction(variant)).toEqual({
      changeLineItemQuantity: {
        lineItemId: 123,
        quantity: 2
      }
    })
  })
});
