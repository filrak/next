import { UseCategory } from '@vue-storefront/interfaces';
import { getCategory } from '@vue-storefront/about-you-api';
import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';
import { useCategoryFactory } from '@vue-storefront/factories';

const loadBapiCategories = async (params): Promise<BapiCategory[]> => {
  const searchParams = {
    ...params
  };

  return await getCategory(searchParams);
};

const useCategory: (id: string) => UseCategory<BapiCategory> = useCategoryFactory<BapiCategory, any>({
  categorySearch: loadBapiCategories
});

export default useCategory;
