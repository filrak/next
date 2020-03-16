import { BapiClient } from '@aboutyou/backbone';
import getProductApi from './getProduct';
import getCategoryApi from './getCategory';
import addToCartApi from './api/addToCart';
import removeFromCartApi from './api/removeFromCart';
import clearCartApi from './api/clearCart';
import placeOrderApi from './placeOrder';
import getUserApi from './getUser';
import addCouponApi from './addCoupon';
import removeCouponApi from './removeCoupon';

let apiClient: BapiClient = null;

let methods = {
  getProduct: getProductApi,
  getCategory: getCategoryApi,
  addToCart: addToCartApi,
  removeFromCart: removeFromCartApi,
  clearCart: clearCartApi,
  placeOrder: placeOrderApi,
  getUser: getUserApi,
  addCoupon: addCouponApi,
  removeCoupon: removeCouponApi
};

function override(overrides) {
  methods = { ...methods,
    ...overrides };
}

function setup() {
  apiClient = new BapiClient({
    host: 'https://boston.backbone-api.demo.aboutyou.cloud/v1/',
    auth: { username: 'aboutyou',
      password: 'OmNErAb96Y5Qn75SFhXr' },
    shopId: 121
  });
}

/** just because you can't simply do "export x as y..." */
const getProduct = methods.getProduct;
const getCategory = methods.getCategory;
const addToCart = methods.addToCart;
const removeFromCart = methods.removeFromCart;
const clearCart = methods.clearCart;
const placeOrder = methods.placeOrder;
const getUser = methods.getUser;
const addCoupon = methods.addCoupon;
const removeCoupon = methods.removeCoupon;

export {
  getProduct,
  getCategory,
  addToCart,
  removeFromCart,
  clearCart,
  placeOrder,
  getUser,
  addCoupon,
  removeCoupon,
  override,
  setup,
  apiClient
};

