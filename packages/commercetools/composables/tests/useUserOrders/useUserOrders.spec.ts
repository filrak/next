import useUserOrders from '../../src/useUserOrders';
import mountComposable from '../_mountComposable';

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads current customer\'s orders', async () => {
    const wrapper = mountComposable(useUserOrders);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.orders.data).toEqual([]);
    expect(wrapper.vm.$data.orders.total).toEqual(500);
  });

});
