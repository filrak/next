import { getCartProducts, getCartTotals, getCartShippingPrice, getCartTotalItems } from './../src/index'

const price = p => ({ value: { centAmount: p } })
const variant = (p = {}) => ({ ...p, images: [{ url: 'a.jpg' }, { url: 'b.jpg' }] })
const rawConfiguration = [
  { name: 'size', label: '38', stringValue: '38', __typename: 'StringAttribute' },
  { name: 'color', label: 'white', stringValue: 'white', __typename: 'StringAttribute' }
]

const configuration = [
  {  __typename: 'StringAttribute', name: 'size', label: '38', stringValue: '38' },
  {  __typename: 'StringAttribute', name: 'color', label: 'white', stringValue: 'white' }
]

const cart = {
  lineItems: [
    { name: 'prod1', id: 1, price: price(1100), variant: variant(), quantity: 1, _configuration: rawConfiguration },
    { name: 'prod2', id: 2, price: price(1500), variant: variant(), quantity: 2, _configuration: rawConfiguration }
  ],
  totalPrice: {
    centAmount: 12444
  },
  shippingInfo: {
    price: {
      centAmount: 444
    }
  }
} as any

describe('[commercetools-helpers] cart helpers', () => {
  it('returns default values', () => {
    expect(getCartProducts(null)).toEqual([])
  })

  it('returns products', () => {
    expect(getCartProducts(cart)).toEqual([
      { title: 'prod1', id: 1, price: { regular: 11 }, image: 'a.jpg', qty: 1, attributeList: configuration },
      { title: 'prod2', id: 2, price: { regular: 15 }, image: 'a.jpg', qty: 2, attributeList: configuration },
    ])
  })

  it('returns cart total price', () => {
    expect(getCartTotals(null)).toEqual(null)
    expect(getCartTotals(cart).total).toEqual(128.88)
    expect(getCartTotals({ ...cart, shippingInfo: null }).total).toEqual(124.44)
  })

  it('returns cart subtotal price', () => {
    expect(getCartTotals(cart).subtotal).toEqual(124.44)
    expect(getCartTotals({ ...cart, shippingInfo: null }).subtotal).toEqual(124.44)
  })

  it('returns cart shipping price', () => {
    expect(getCartShippingPrice(cart)).toEqual(4.44)
    expect(getCartShippingPrice({ ...cart, shippingInfo: null })).toEqual(0)
  })

  it('returns cart total items', () => {
    expect(getCartTotalItems(null)).toEqual(0)
    expect(getCartTotalItems(cart)).toEqual(3)
  })
})
