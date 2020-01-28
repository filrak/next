import getDefaultConfiguration from '../../src/useProduct/getDefaultConfiguration'

const cart = { id: 'cartid' }
const cartResponse = { data: { cart } }

const storageMock = {
  setItem: jest.fn(),
  getItem: jest.fn()
}

jest.mock('@vue-storefront/commercetools-api', () => ({
  getStorage: () => storageMock,
  getMe: jest.fn(() => ({ data: { me: { activeCart: cart } } })),
  createCart: jest.fn(() => cartResponse),
}))

jest.mock('@vue-storefront/commercetools-helpers', () => ({
  getProductVariants: args => args,
  getProductOptions: () => ({
    color: [{ label: 'white', name: 'color', value: 'white' }],
    size: [{ label: 'xl', name: 'size', value: 'xl' }]
  })
}))

describe('[commercetools-composables] useCart/getDefaultConfiguration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns default configuration', async () => {
    const defaultConfiguration = getDefaultConfiguration([])

    expect(defaultConfiguration).toEqual({
      color: 'white',
      size: 'xl'
    })
  })

});
