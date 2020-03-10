import { ref, Ref, computed } from '@vue/composition-api';

export type OrdersSearchResult<ORDER> = {
  data: ORDER[];
  total: number;
};

export type UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS> = {
  searchOrders: (params: ORDER_SEARCH_PARAMS) => Promise<OrdersSearchResult<ORDER>>;
};

export function useUserOrdersFactory<ORDER, ORDER_SEARCH_PARAMS>(factoryParams: UseUserOrdersFactoryParams<ORDER, ORDER_SEARCH_PARAMS>) {
  return function useUserOrders() {
    const orders: Ref<OrdersSearchResult<ORDER>> = ref(null);
    const loading: Ref<boolean> = ref(false);
    const searchOrders = async (params?: ORDER_SEARCH_PARAMS): Promise<void> => {
      loading.value = true;
      orders.value = await factoryParams.searchOrders(params);
      loading.value = false;
    };

    return {
      orders: computed(() => orders.value),
      searchOrders,
      loading: computed(() => loading.value)
    };
  };
}
