import {
  getName,
  getSlug,
  getPrice,
  getGallery,
} from './../src/index'

const currentMasterVariant = {
  price: { value: { centAmount: 12 } },
  images: [{ url: 'imageV11/url.jpg' }, { url: 'imageV12/url.jpg' }],
}

const stagedMasterVariant = {
  price: { value: { centAmount: 30 } },
  images: [{ url: 'imageV11draft/url.jpg' }, { url: 'imageV12draft/url.jpg' }],
}

const product = {
  masterData: {
    current: {
      name: 'variant 1',
      slug: 'variant-1',
      masterVariant: currentMasterVariant,
    },
    staged: {
      name: 'variant 1 draft',
      slug: 'variant-1-draft',
      masterVariant: stagedMasterVariant,
    },
  },
} as any

describe('[commercetools-api-client] helpers', () => {
  it('returns name', () => {
    expect(getName(product.masterData.current)).toBe('variant 1')
    expect(getName(product.masterData.staged)).toBe('variant 1 draft')
  })

  it('returns slug', () => {
    expect(getSlug(product.masterData.current)).toBe('variant-1')
    expect(getSlug(product.masterData.staged)).toBe('variant-1-draft')
  })

  it('returns price', () => {
    expect(getPrice(product.masterData.current.masterVariant)).toBe(12)
    expect(getPrice(product.masterData.staged.masterVariant)).toBe(30)
  })

  it('returns gallery', () => {
    expect(getGallery(product.masterData.current.masterVariant)).toEqual([
      { small: { url: '' }, big: { url: 'imageV11/url.jpg' }, normal: { url: '' } },
      { small: { url: '' }, big: { url: 'imageV12/url.jpg' }, normal: { url: '' } },
    ])
  })
})
