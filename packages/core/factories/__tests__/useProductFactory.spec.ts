import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);
import { useProductFactory } from '../src';
import { UseProduct } from '@vue-storefront/interfaces';

const useProduct: (cacheId: string) => UseProduct<any> = useProductFactory<
  any,
  any
>({
  productsSearch: searchParams => {
    return Promise.resolve({ data: [{ name: 'product' + searchParams }], total: 1 });
  }
});

describe('[CORE - factories] useProductFactory', () => {
  it('creates properties', () => {
    const { products, loading } = useProduct('test-product');

    expect(products.data.value).toEqual([]);
    expect(loading.value).toEqual(false);
    expect(products.total.value).toEqual(0);
  });

  it('returns product response', async () => {
    const { search, products } = useProduct('test-use-product');

    await search({ slug: 'product-slug' });

    expect(products.data.value).toEqual([{name: 'product' + { slug: 'product-slug' }}]);
  });
});
