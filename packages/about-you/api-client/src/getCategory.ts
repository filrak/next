
import { api } from './index';
import { CategoryWith } from '@aboutyou/backbone/types/CategoryWith';
import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';

export type getCategorySearchParams = { ids: number[]; path: string; with: CategoryWith; depth: number}

export default async function(options: getCategorySearchParams): Promise<BapiCategory[]> {
  if (!options) {
    this.options = {};
  }
  if (options.ids) {
    return await api.categories.getByIds(
      options.ids,
      { with: options.with }
    );
  } else if (options.path) {
    const response = await api.ctagories.getByPath(
      options.path,
      { width: options.with }
    );
    return [response];
  } else {
    return await api.categories.getRoots({
      with: options.with
    });
  }
}
