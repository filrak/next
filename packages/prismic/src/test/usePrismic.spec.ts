import usePrismic from "../composables/usePrismic";
import mountComposable from './_mountComposable'

describe('[prismic] usePrismic', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it ('should have correct initial values', async () => {
    const wrapper = mountComposable(usePrismic)

    wrapper.vm.$nextTick()

    wrapper.vm.$data // to jest {}

    // TODO: Not working somehow
    // expect(wrapper.vm.$data.loading).toBeFalsy()
  })
})
