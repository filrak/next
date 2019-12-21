import {
  getCurrent,
  getStaged,
  getMasterVariant,
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
  it('returns current product data', () => {
    expect(getCurrent(product)).toEqual({
      name: 'variant 1',
      slug: 'variant-1',
      masterVariant: currentMasterVariant,
    })
  })

  it('returns staged product data', () => {
    expect(getStaged(product)).toEqual({
      name: 'variant 1 draft',
      slug: 'variant-1-draft',
      masterVariant: stagedMasterVariant,
    })
  })

  it('returns master variant', () => {
    expect(getMasterVariant(getStaged(product))).toEqual(stagedMasterVariant)
    expect(getMasterVariant(getCurrent(product))).toEqual(currentMasterVariant)
  })

  it('returns name', () => {
    expect(getName(getCurrent(product))).toBe('variant 1')
    expect(getName(getStaged(product))).toBe('variant 1 draft')
  })

  it('returns slug', () => {
    expect(getSlug(getCurrent(product))).toBe('variant-1')
    expect(getSlug(getStaged(product))).toBe('variant-1-draft')
  })

  it('returns price', () => {
    expect(getPrice(getMasterVariant(getCurrent(product)))).toBe(12)
    expect(getPrice(getMasterVariant(getStaged(product)))).toBe(30)
  })

  it('returns gallery', () => {
    expect(getGallery(getMasterVariant(getCurrent(product)))).toEqual([
      { small: { url: '' }, big: { url: 'imageV11/url.jpg' }, normal: { url: '' } },
      { small: { url: '' }, big: { url: 'imageV12/url.jpg' }, normal: { url: '' } },
    ])
  })
})
