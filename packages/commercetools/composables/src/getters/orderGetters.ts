import { UserOrderGetters, AgnosticOrderStatus, AgnosticPrice } from '@vue-storefront/interfaces';
import { Order, OrderState, LineItem, Money, Address } from './../types/GraphQL';

export const getOrderDate = (order: Order): string => order?.createdAt || '';

export const getOrderId = (order: Order): string => order?.id || '';

const orderStatusMap = {
  [OrderState.Open]: AgnosticOrderStatus.Open,
  [OrderState.Confirmed]: AgnosticOrderStatus.Confirmed,
  [OrderState.Complete]: AgnosticOrderStatus.Complete,
  [OrderState.Cancelled]: AgnosticOrderStatus.Cancelled
};

const getPrice = (money: Money): AgnosticPrice => ({
  regular: money?.centAmount ? money.centAmount / 100 : 0
});

export const getOrderStatus = (order: Order): AgnosticOrderStatus | '' => order?.orderState ? orderStatusMap[order.orderState] : '';

export const getOrderItems = (order: Order): LineItem[] => order?.lineItems || [];

export const getOrderPrice = (order: Order): AgnosticPrice => getPrice(order?.totalPrice);

// TODO: billing and shipping addresses are returned as string temporary. It's a part of discussion now: https://github.com/DivanteLtd/next/pull/361
const transformAddressToString = (address: Address): string => (
  `${address.country}, ${address.postalCode}, ${address.city}, ${address.streetName}, ${address.streetNumber}`
);

export const getOrderBillingAddress = (order: Order): string => transformAddressToString(order?.billingAddress || {} as Address);

export const getOrderShippingAddress = (order: Order): string => transformAddressToString(order?.shippingAddress || {} as Address);

const orderGetters: UserOrderGetters<Order, LineItem> = {
  getDate: getOrderDate,
  getId: getOrderId,
  getStatus: getOrderStatus,
  getPrice: getOrderPrice,
  getItems: getOrderItems,
  getBillingAddress: getOrderBillingAddress,
  getShippingAddress: getOrderShippingAddress
};

export default orderGetters;
