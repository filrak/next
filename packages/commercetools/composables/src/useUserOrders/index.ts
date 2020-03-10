import { useUserOrdersFactory, UseUserOrdersFactoryParams, OrdersSearchResult } from '@vue-storefront/factories';
import { Order } from '../types/GraphQL';
import { getMyOrders } from '@vue-storefront/commercetools-api';

type OrderSearchParams = {
  id?: string;
  page?: number;
  perPage?: number;
};

const searchOrders = async (params: OrderSearchParams = {}): Promise<OrdersSearchResult<Order>> => {
  const result = await getMyOrders(params);
  return {
    data: result.data.me.orders.results,
    total: result.data.me.orders.total
  };
};

const params: UseUserOrdersFactoryParams<Order, OrderSearchParams> = {
  searchOrders
};

export default useUserOrdersFactory<Order, OrderSearchParams>(params);
