import { transformBlock } from './_utils'
import { PrismicDocument, PrismicPage } from '../types'

export const getPages = (doc: PrismicDocument): PrismicPage[] => doc ? doc.results : []

export const getPageUid = (page: PrismicPage): string => page.uid

export const getPageId = (page: PrismicPage): string => page.id

export const getPageType = (page: PrismicPage): string => page.type

export const getPageHref = (page: PrismicPage): string => page.href

export const getPageTags = (page: PrismicPage): string[] => page.tags

export const getPageSlugs = (page: PrismicPage): string[] => page.slugs

export const getPageLang = (page: PrismicPage): string => page.lang

export const getBlocks = ({ data }: PrismicPage, blockName?: string): string | string[] => {
  const blockKeys = Object.keys(data || {})

  if (blockName) {
    const key = blockKeys.find(blockKey => blockKey === blockName)

    return transformBlock(data[key])
  }

  return blockKeys.map(key => transformBlock(data[key]))
}

// TODO: slices
export const getSlices = () => {}

// TODO: meta data
export const getMeta = () => {}
