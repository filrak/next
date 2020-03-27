/* istanbul ignore file */

import useCategory from './useCategory';
import useProduct from './useProduct';
import useCart from './useCart';
import useCheckout from './useCheckout';
import useUser from './useUser';
import useLocale from './useLocale';
import useUserOrders from './useUserOrders';
import { foo } from '@vue-storefront/utils';
import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters
} from './getters';

export {
  useCategory,
  useProduct,
  useCart,
  useCheckout,
  useUser,
  useLocale,
  useUserOrders,
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters,
  foo
};

