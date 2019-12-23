import { CategorySearch } from './../../types/Api'
import { locale } from './../../index'

const buildProductWhere = (search: CategorySearch) => {
  if (search && search.catId) {
    return `masterData(current(categories(id="${search.catId}")))`
  }

  return ''
}

const buildCategoryWhere = (search: CategorySearch) => {
  if (search && search.catId) {
    return `id="${search.catId}"`
  }

  if (search && search.slug) {
    return `slug(${locale}="${search.slug}")`
  }

  return ''
}

export { buildProductWhere, buildCategoryWhere }
