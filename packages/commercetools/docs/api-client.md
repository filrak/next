<ApiClient />

<!-- Code example for setup method -->
::: slot setup
```javascript
import { setup } from '@vue-storefront/commercetools-api'

setup({
  config: {
    uri: 'https://api.commercetools.com/vue-storefront-next/graphql',
    authHost: 'https://auth.sphere.io',
    projectKey: 'vue-storefront-next',
    clientId: 'ULi2QVos7ZoeBD_cY90aFNmc',
    clientSecret: '2eX7tGiZsZt0uexGQlcF2tgwbWEXIgbf',
    scopes: ['manage_products:vue-storefront-next'],
  }
})
```
:::

::: slot methods

### `getProduct`


Method responsible for fetching single or multiple products from commercetools GraphQL API. 

```js
const { data } = await getProduct({ slug: 'black-dress' })
```

It accepts configuration object with following properties:

- `limit?: number`
- `offset?: number`
- `sort?: string[]`
- `catId?: string[]`
- `skus?: string[]`
- `slug?: string`
- `query?: CustomQuery` - custom GraphQL query. Please keep in mind that modifying this property can break helper functions.

:::
