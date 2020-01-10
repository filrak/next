import useCart from '../../src/useCart';
import loadCurrentCart from './../../src/useCart/currentCart'
import { processAddToCart, processRemoveFromCart, processUpdateQuantity } from './../../src/useCart/process'
import mountComposable from './../mountComposable'

jest.mock('./../../src/useCart/currentCart', () => jest.fn())
jest.mock('./../../src/useCart/process', () => ({
  processAddToCart: jest.fn(),
  processRemoveFromCart: jest.fn(),
  processUpdateQuantity: jest.fn()
}))

describe('[commercetools-composables] useCart', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('loads cart', async () => {
    const cartData = { products: [ { prod: 1 } ] };
    (loadCurrentCart as any).mockReturnValue(Promise.resolve(cartData));

    const wrapper = mountComposable(useCart)

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.loading).toBeTruthy()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.loading).toBeFalsy()
    expect(wrapper.vm.$data.cart).toEqual(cartData)
    expect(loadCurrentCart).toBeCalled()
  });

  it('adds product to the cart', async () => {
    const cartData = { products: [ { prod: 1 } ] };
    (loadCurrentCart as any).mockReturnValue(Promise.resolve(cartData));
    (processAddToCart as any).mockReturnValue(Promise.resolve({ data: { cart: cartData } }));

    const wrapper = mountComposable(useCart)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.$data.addToCart()

    expect(wrapper.vm.$data.loading).toBeTruthy()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.loading).toBeFalsy()
    expect(processAddToCart).toBeCalled()
  });

  it('removes product from the cart', async () => {
    const cartData = { products: [ { prod: 1 } ] };
    (loadCurrentCart as any).mockReturnValue(Promise.resolve(cartData));
    (processRemoveFromCart as any).mockReturnValue(Promise.resolve({ data: { cart: cartData } }));

    const wrapper = mountComposable(useCart)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.$data.removeFromCart()

    expect(wrapper.vm.$data.loading).toBeTruthy()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.loading).toBeFalsy()
    expect(processRemoveFromCart).toBeCalled()
  });

  it('updates quantity for given product', async () => {
    const cartData = { products: [ { prod: 1 } ] };
    (loadCurrentCart as any).mockReturnValue(Promise.resolve(cartData));
    (processUpdateQuantity as any).mockReturnValue(Promise.resolve({ data: { cart: cartData } }));

    const wrapper = mountComposable(useCart)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.$data.updateQuantity({ qty: '2' })
    expect(wrapper.vm.$data.loading).toBeTruthy()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.loading).toBeFalsy()
    expect(processUpdateQuantity).toBeCalled()
  });

  it('not updates quantity for given product when it is zero', async () => {
    const cartData = { products: [ { prod: 1 } ] };
    (loadCurrentCart as any).mockReturnValue(Promise.resolve(cartData));
    (processUpdateQuantity as any).mockReturnValue(Promise.resolve({ data: { cart: cartData } }));

    const wrapper = mountComposable(useCart)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.$data.updateQuantity({ qty: '0' })
    expect(wrapper.vm.$data.loading).toBeFalsy()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.loading).toBeFalsy()
    expect(processUpdateQuantity).not.toBeCalled()
  })

  it.skip('clears entire cart', async () => {
    const wrapper = mountComposable(useCart)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.$data.clearCart()
  })

  it.skip('applies coupon', async () => {
    const wrapper = mountComposable(useCart)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.$data.applyCoupon()
  })

  it.skip('removes coupon', async () => {
    const wrapper = mountComposable(useCart)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.$data.removeCoupon()
  })
});
