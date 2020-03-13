import { UseProduct } from '@vue-storefront/interfaces';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { useProductFactory } from '@vue-storefront/factories';
import loadBapiProducts from '../helpers';

const useProduct: (cacheId: string) => UseProduct<BapiProduct> = useProductFactory<BapiProduct, any>({
  productsSearch: loadBapiProducts
});

export default useProduct;
