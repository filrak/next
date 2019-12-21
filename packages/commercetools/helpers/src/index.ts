import { UiMediaGalleryItem } from '@vue-storefront/interfaces'
import { Product, ProductVariant, Image, ProductData } from './types/GraphQL'

export const getCurrent = (product: Product): ProductData => product.masterData.current

export const getStaged = (product: Product): ProductData => product.masterData.staged

export const getMasterVariant = (product: ProductData): ProductVariant => product.masterVariant

export const getName = (product: ProductData): string => product.name

export const getSlug = (product: ProductData): string => product.slug

export const getPrice = (product: ProductVariant): number => product.price.value.centAmount

export const getGallery = (product: ProductVariant): UiMediaGalleryItem[] =>
  product.images.map((image: Image) => ({
    small: { url: '' },
    big: { url: image.url },
    normal: { url: '' }
  }))
