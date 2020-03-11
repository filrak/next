import { UseProduct } from '@vue-storefront/interfaces';
import { getProduct } from '@vue-storefront/about-you-api';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { useProductFactory } from '@vue-storefront/factories';

const loadBapiProducts = async (params): Promise<BapiProduct[]> => {
  const searchParams = {
    ids: params.ids,
    with: params.term,
    where: params.term,
    sort: params.sort,
    page: params.pagination.page,
    masterKey: '',
    term: params.term
  };

  return await getProduct(searchParams);
};

const useProduct: (cacheId: string) => UseProduct<BapiProduct> = useProductFactory<BapiProduct, any>({
  productsSearch: loadBapiProducts
});

export default useProduct;
