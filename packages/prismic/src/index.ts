import PrismicVue from 'prismic-vue'

interface PrismicVueType {
  install: (Vue: any, options: any) => void
}

interface SetupConfig {
  endpoint: any
  htmlSerializer?: any
  linkResolver?: any
  apiOptions?: {
    accessToken: string
  }
}

let plugin = null
let prismic = null
let apiOptions = null
let linkResolver = null
let htmlSerializer = null
let endpoint = null

const setup = (setupConfig: SetupConfig): [PrismicVueType, SetupConfig] => {
  prismic = PrismicVue
  apiOptions = setupConfig.apiOptions || null
  linkResolver = setupConfig.linkResolver || null
  htmlSerializer = setupConfig.htmlSerializer || null
  endpoint = setupConfig.endpoint

  plugin = [PrismicVue, setupConfig]

  return plugin
}

export {
  setup,
  prismic,
  plugin,
  apiOptions,
  linkResolver,
  htmlSerializer,
  endpoint,
}
