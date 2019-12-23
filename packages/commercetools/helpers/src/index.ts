import { UiMediaGalleryItem, UiProductName, UiProductPrice } from '@vue-storefront/interfaces'
import { ProductVariant, Image, ProductData } from './types/GraphQL'

export const getName = (product: ProductData): UiProductName => product.name

export const getSlug = (product: ProductData): UiProductName => product.slug

export const getPrice = (product: ProductVariant): UiProductPrice => product.price.value.centAmount

export const getGallery = (product: ProductVariant): UiMediaGalleryItem[] =>
  product.images.map((image: Image) => ({
    small: { url: '' },
    big: { url: image.url },
    normal: { url: '' }
  }))
