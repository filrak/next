import { CategorySearch } from './../../types/Api'
import { locale } from './../../index'

const buildProductWhere = (search: CategorySearch) => {
  if (search.catId) {
    return `masterData(current(categories(id="${search.catId}")))`
  }

  return undefined
}

const buildCategoryWhere = (search: CategorySearch) => {
  if (search.catId) {
    return `id="${search.catId}"`
  }

  if (search.slug) {
    return `slug(${locale}="${search.slug}")`
  }

  return undefined
}

export { buildProductWhere, buildCategoryWhere }
