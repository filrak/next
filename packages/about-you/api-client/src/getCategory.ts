import { apiClient } from './index';
import { CategoryWith } from '@aboutyou/backbone/types/CategoryWith';

export type getCategorySearchParams = { ids: number[]; path: string; with: CategoryWith; depth: number} | any

export default async function(options: getCategorySearchParams) {
  if (!options) {
    this.options = {};
  }
  if (options.ids) {
    return await apiClient.categories.getByIds(
      options.ids
    );
  } else if (options.path) {
    return apiClient.categories.getByPath(
      options.path
    );
  } else {
    return await apiClient.categories.getRoots({
      with: options.with
    });
  }
}
