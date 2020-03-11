import { UseProduct } from '@vue-storefront/interfaces';
import { getProduct } from '@vue-storefront/about-you-api';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { useProductFactory } from '@vue-storefront/factories';

const useProduct: (params) => UseProduct<BapiProduct> = useProductFactory<BapiProduct, any>({
  productsSearch: getProduct
});

export default useProduct;
