
import { apiClient } from '../..';
import { CategoryWith } from '@aboutyou/backbone/types/CategoryWith';
import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';

export type getCategorySearchParams = { ids?: number[]; path?: string[]; with?: CategoryWith; depth?: number; includeHidden?: boolean }

export default async function(options: getCategorySearchParams = {}): Promise<BapiCategory[]> {
  if (options.ids) {
    return await apiClient.categories.getByIds(
      options.ids,
      { depth: options.depth }
    );
  } else if (options.path) {
    const response = await apiClient.categories.getByPath(
      options.path,
      { with: options.with }
    );
    return [response];
  } else {
    return await apiClient.categories.getRoots({
      with: options.with
    });
  }
}
