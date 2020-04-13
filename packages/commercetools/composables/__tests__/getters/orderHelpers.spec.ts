import {
  getOrderDate,
  getOrderId,
  getOrderStatus,
  getOrderPrice,
  getOrderItems,
  getOrderBillingAddress,
  getOrderShippingAddress
} from './../../src/getters/orderGetters';
import { OrderState, Order } from './../../src/types/GraphQL';

const generatePrice = (centAmount: number) => ({
  centAmount,
  currencyCode: 'USD'
});

const order: Order = Object.freeze({
  createdAt: 123456789,
  id: '645ygdf',
  orderState: OrderState.Complete,
  totalPrice: generatePrice(12345),
  taxedPrice: {
    totalNet: generatePrice(1111),
    totalGross: generatePrice(2222),
    taxPortions: [
      {
        name: '15% incl.',
        amount: generatePrice(3333),
        rate: 0.15
      },
      {
        name: '25% incl.',
        amount: generatePrice(4444),
        rate: 0.25
      }
    ]
  },
  billingAddress: {
    id: '1234',
    firstName: 'Vue',
    lastName: 'Developer',
    __typename: 'Address'
  },
  shippingAddress: {
    id: '5678',
    firstName: 'Java',
    lastName: 'Script',
    __typename: 'Address'
  },
  lineItems: [
    {
      id: 'product-1'
    },
    {
      id: 'product-2'
    }
  ]
}) as any;

describe('[commercetools-getters] order getters', () => {
  it('returns default values', () => {
    expect(getOrderDate(null)).toBe('');
    expect(getOrderId(null)).toBe('');
    expect(getOrderStatus(null)).toBe('');
    expect(typeof getOrderPrice(null)).toBe('object');
    expect(typeof getOrderBillingAddress(null as any)).toEqual('string');
    expect(typeof getOrderShippingAddress(null as any)).toEqual('string');
    expect(getOrderItems(null as any)).toHaveLength(0);
  });

  it('returns date', () => {
    expect(getOrderDate(order)).toEqual(123456789);
  });

  it('returns order id', () => {
    expect(getOrderId(order)).toEqual('645ygdf');
  });

  it('returns status', () => {
    expect(getOrderStatus(order)).toEqual(OrderState.Complete);
  });

  it('returns total gross', () => {
    expect(getOrderPrice(order).regular).toEqual(123.45);
  });

  it('returns billing address', () => {
    expect(typeof getOrderBillingAddress(order)).toEqual('string');
  });

  it('returns shipping address', () => {
    expect(typeof getOrderShippingAddress(order)).toEqual('string');
  });

  it('returns line items', () => {
    const items = getOrderItems(order);

    expect(Array.isArray(items)).toBeTruthy();
    expect(items).toHaveLength(2);
    expect(items[0].id).toEqual('product-1');
    expect(items[1].id).toEqual('product-2');
  });
});
