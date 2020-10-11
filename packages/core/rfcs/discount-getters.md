# Discount / coupons getters

## Motivation

There is no possibility to read discounts from the cart. We are not able to display discounted total price or even an information about applied discount code. Suggestion bellow:

```ts
export interface CartGetters<CART, CART_ITEM, DISCOUNT> {
  // ...
  // new ones:

  getDiscount: () => DISCOUNT; // don't think if it's needed
  getDiscountId: () => string;
  getDiscountedTotals: () => AgnosticTotals;
  getDiscountName: () => string;
  getDiscountValue: () => number;
  getDiscountType: () => string; // fixed or percentage

  [getterName: string]: (element: any, options?: any) => unknown;
}
```

Also I'm thinking about separated getters, which has even more sense as you can have multiple discounts applied to the cart.

```ts
export interface DiscountGetters {
  getId: () => string;
  getName: () => string;
  getValue: () => number;
  getType: () => string; // fixed or percentage
}

export interface CartGetters<CART, CART_ITEM, DISCOUNT> {
  // ...
  // new ones:

  getDiscounts: () => DISCOUNT[]; // now you can use discountGetters on each
  getDiscountedTotals: () => AgnosticTotals; // still useful

  [getterName: string]: (element: any, options?: any) => unknown;
}
```

And also we don't need a coupon property anomore:

```ts
export interface UseCart {
  // ...
  coupon: ComputedProperty<COUPON | null>; // to be removed
  // ...
}
```

## Migration process

Prety straightforward, just implement a new getters.
