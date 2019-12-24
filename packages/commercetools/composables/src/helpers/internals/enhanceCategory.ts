import { ApolloQueryResult } from 'apollo-client'
import { CategoryQueryResult, ProductQueryResult, ProductVariant, Category } from './../../types/GraphQL'

interface CategoryData {
  categories: CategoryQueryResult
}

interface ProductData {
  products: ProductQueryResult
}

type ProductResponse = ApolloQueryResult<ProductData>
type CategoryResponse = ApolloQueryResult<CategoryData>

const applyProducts = (rawProducts: ProductVariant[]) => (category: Category) => {
  const _products = rawProducts.filter(prod => (prod as any)._categoriesRef.includes(category.id))

  return { ...category, _products }
}

const enhanceCategory = (categoryResponse: CategoryResponse, productResponse: ProductResponse): ApolloQueryResult<CategoryData> => {
  const rawProducts = (productResponse.data as any)._variants
  const { results } = categoryResponse.data.categories

  categoryResponse.data.categories.results = results.map(applyProducts(rawProducts))

  return categoryResponse
}

export default enhanceCategory
