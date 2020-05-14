# Errors handling in composables

## Motivation

We need to handle errors, that are caused by external api calls provided by factory params.
Furthermore, it must be something to recognize where that error comes from (which call).

We can solve it by introducing fields inside the errors object and the `AgnosticError`:

Factory
```js
const useProductFactory = (factoryParams) => {
  const useProduct = () => {
    const products = ref([]);
    const errors = ref({};)


    const search = async (params) => {
      try {
        products.value = factoryParams.searchProducts(params);
      } catch (err) {
        errors.searchProducts = factoryParams.convertError(err);
      }
    }


    return { products, search }
  }
}

export default useProductFactory
```

Usage:

```js
import { useProductFactory } from '@vue-storefront/factories';


const factoryParams = {
  searchProducts: async (params) => {
    return await getProductsFromApi(params);
  },
  convertError: (error) => {
    if ('this is search product error ?') {
      return 'this is error message for searching products';
    }

    return error;
  }
};

export default useProductFactory()

```

Summary:
- factory catches errors, and convert them to the readable message using `convertError`
- `convertError` is a new factory param, you have to provide it in order to handle and react on errors


## Migration process
Transparent, `convertError` is optional, also you don't have to implement errors if you don't need now
