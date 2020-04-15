/* istanbul ignore file */

import { UserOrderGetters } from '@vue-storefront/core';
import { BapiOrder } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDate = (order: BapiOrder): string => '123';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getId = (order: BapiOrder): string => '123';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStatus = (order: BapiOrder): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getPrice = (order: BapiOrder): number | null => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const formatPrice = (price: number) => String(price);

const orderGetters: UserOrderGetters<BapiOrder> = {
  getDate,
  getId,
  getStatus,
  getPrice,
  formatPrice
};

export default orderGetters;
