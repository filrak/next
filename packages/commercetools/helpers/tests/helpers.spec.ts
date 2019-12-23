import {
  getProductName,
  getProductSlug,
  getProductPrice,
  getProductGallery,
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
    expect(getProductName(product.masterData.current)).toBe('variant 1')
    expect(getProductName(product.masterData.staged)).toBe('variant 1 draft')
  })

  it('returns slug', () => {
    expect(getProductSlug(product.masterData.current)).toBe('variant-1')
    expect(getProductSlug(product.masterData.staged)).toBe('variant-1-draft')
  })

  it('returns price', () => {
    expect(getProductPrice(product.masterData.current.masterVariant)).toBe(12)
    expect(getProductPrice(product.masterData.staged.masterVariant)).toBe(30)
  })

  it('returns gallery', () => {
    expect(getProductGallery(product.masterData.current.masterVariant)).toEqual([
      { small: '', big: 'imageV11/url.jpg', normal: '' },
      { small: '', big: 'imageV12/url.jpg', normal: ''},
    ])
  })
})
