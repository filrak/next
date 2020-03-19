import { BaseSearch } from '@vue-storefront/commercetools-api/lib/src/types/Api';
import { AgnosticPaginatedSearchParams } from '@vue-storefront/interfaces';

export default (params: AgnosticPaginatedSearchParams): Pick<BaseSearch, 'limit' | 'offset'> => {
  return {
    limit: params.perPage,
    offset: (params.page - 1) * params.perPage
  };
};
