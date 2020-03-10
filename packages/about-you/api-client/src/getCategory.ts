
import { api } from './';
import { CategoryWith } from '@aboutyou/backbone/types/CategoryWith';
import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';

export type getCategorySearchParams = { ids: number[]; path: string; with: CategoryWith; depth: number; includeHidden: boolean }

export default async function(options: getCategorySearchParams): Promise<BapiCategory[]> {
  if (!options) {
    this.options = {};
  }
  if (options.ids) {
    return await api.categories.getByIds(
      options.ids,
      {
        with: options.with,
        includeHidden: options.includeHidden
      }
    );
  } else if (options.path) {
    const response = await api.categories.getByPath(
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
