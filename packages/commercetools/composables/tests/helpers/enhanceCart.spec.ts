import enhanceCart from './../../src/helpers/internals/enhanceCart'

const createCartResponse = (items): any => ({
  data: {
    cart: {
      lineItems: items
    }
  }
})

describe('[commercetools-composables] enhanceCart', () => {
  it('returns cart response items configurations', () => {
    const cartResponse = createCartResponse([
      { prod: '1', variant: { attributesRaw: [{ name: 'attr1', value: '20' }] } }
    ])

    expect(enhanceCart(cartResponse)).toEqual({
      data: {
        cart: {
          lineItems: [
            {
              prod: '1',
              variant: { attributesRaw: [{ name: 'attr1', value: '20' }] },
              _configuration: [{ name: 'attr1', value: '20' }]
            }
          ]
        }
      }
    })
  })

  it('returns cart response items configurations with attributes transformation', () => {
    const colorValue = { label: { en: 'white' } }
    const otherValue =  { label: 'xxx' }
    const cartResponse = createCartResponse([
      {
        prod: '1',
        variant: {
          attributesRaw: [
            { name: 'color', value: colorValue },
            { name: 'other', value: otherValue }
          ]
        }
      }
    ])

    expect(enhanceCart(cartResponse)).toEqual({
      data: {
        cart: {
          lineItems: [
            {
              prod: '1',
              variant: { attributesRaw: [{ name: 'color', value: colorValue }, { name: 'other', value: otherValue }] },
              _configuration: [{ name: 'color', value: 'white' }, { name: 'other', value: otherValue }]
            }
          ]
        }
      }
    })
  })
})
