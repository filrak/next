import { UiMediaGalleryItem } from '@vue-storefront/interfaces'
import { ProductVariant, Image, ProductData } from './types/GraphQL'

export const getName = (product: ProductData): string => product.name

export const getSlug = (product: ProductData): string => product.slug

export const getPrice = (product: ProductVariant): number => product.price.value.centAmount

export const getGallery = (product: ProductVariant): UiMediaGalleryItem[] =>
  product.images.map((image: Image) => ({
    small: '',
    big: image.url,
    normal: ''
  }))
