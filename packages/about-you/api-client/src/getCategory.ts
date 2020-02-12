
import { api } from './index'
import { CategoryWith } from '@aboutyou/backbone/types/CategoryWith'

export default async function (options: { ids: number[], path: string, with: CategoryWith, depth: number} | any) {
  if (!options) this.options = {}
  if (options.ids) {
    return await api.categories.getByIds(
      options.ids,
      { with: options.with }
    );
  } else if (options.path) {
    return api.ctagories.getByPath(
      options.path,
      { width: options.with }
    )
  } else {
    return await api.categories.getRoots({
      with: options.with
    });
  }
}