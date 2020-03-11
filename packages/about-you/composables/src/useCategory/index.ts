import { UseCategory } from '@vue-storefront/interfaces';
import { getCategory } from '@vue-storefront/about-you-api';
import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';
import { useCategoryFactory } from '@vue-storefront/factories';

const useCategory: (params) => UseCategory<BapiCategory> = useCategoryFactory<BapiCategory, any>({
  categorySearch: getCategory
});

export default useCategory;
