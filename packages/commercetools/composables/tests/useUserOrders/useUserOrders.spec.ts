import mountComposable from '../_mountComposable';
import useUserOrders from '../../src/useUserOrders';

jest.mock('@vue-storefront/commercetools-api', () => ({
  getMyOrders: () => ({
    data: {
      me: {
        orders: {
          offset: 0,
          limit: 20,
          total: 500,
          results: []
        }
      }
    }
  })
}));

describe('[commercetools-composables] useUserOrders', () => {

  it('loads current customer\'s orders', async () => {
    const wrapper = mountComposable(useUserOrders);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.orders.data).toEqual([]);
    expect(wrapper.vm.$data.orders.total).toEqual(500);
  });

});
