import { UiMediaGalleryItem, UiProductVariants } from '@vue-storefront/interfaces'
import { ProductVariant, Image, ProductData } from './types/GraphQL'

export const getProductName = (product: ProductData): string => product.name

export const getProductSlug = (product: ProductData): string => product.slug

export const getProductPrice = (product: ProductVariant): number => product.price.value.centAmount

export const getProductVariants = (product: ProductData): UiProductVariants<ProductData, ProductVariant> => ({
  parent: product,
  variants: product.allVariants
})

export const getProductGallery = (product: ProductVariant): UiMediaGalleryItem[] =>
  product.images.map((image: Image) => ({
    small: '',
    big: image.url,
    normal: ''
  }))
