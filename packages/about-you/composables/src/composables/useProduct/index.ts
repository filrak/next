import { useProductFactory } from '@vue-storefront/factories';
import { enhanceProduct } from '../../helpers';
import { UseProduct, BapiProduct } from '../../types';

const useProduct: (cacheId: string) => UseProduct<BapiProduct> = useProductFactory<BapiProduct, any>({
  productsSearch: enhanceProduct
});

export default useProduct;
