export default function use



const configuration = computed(() => getProductConfigurationFromUrl(this.$route.options))
const sku = computed(() => getProductConfigurationFromUrl(this.$route.params.sku))

const { search, products } = useProduct()

search({ sku })

const product = getProductVariants(products, { master: !!configuration, attributes: configuration ? { ...configuration } : {} })

// configuration = { label: value, label2: value } na potrzeby tego przykladu
function configure(configuration) {
  if(this.$route.options[configuration.label]) {
    this.$route.options[configuration.label] = configuration.value
  } else {
    this.$route.options.push(configuration)
  }
}


/// html 

<SfSelect v-for="c in configuration" value="c.value" @change="configure(c)">
// opcje
</SfSelect>