import { ref, Ref, computed, watch } from '@vue/composition-api'
import {
  countries,
  currencies,
  currency as defaultCurrency,
  country as defaultCountry,
  setup
} from '@vue-storefront/commercetools-api'
import Cookies from 'js-cookie'
import { UseProduct } from '@vue-storefront/interfaces'

export default function useLocales(context: any): any {
  const loading = ref(false)
  const error = ref(null)
  const locale = ref(context.root.$i18n.locale)
  const availableLocales = computed(() => context.root.$i18n.availableLocales)
  const availableCountries = computed(() => countries)
  const availableCurrencies = computed(() => currencies)
  const country = ref(null)
  const currency = ref(null)

  watch(() => {
    if (!country.value || !currency.value) {
      country.value = Cookies.get('vsf-country') || defaultCountry
      currency.value = Cookies.get('vsf-currency') || defaultCurrency
    }
  })

  watch(country, () => {
    if (!country.value) return
    Cookies.set('vsf-country', country.value)
    setup({ country: country.value })
  })

  watch(currency, () => {
    if (!currency.value) return

    console.log('changed currency', currency.value)
    setup({ currency: currency.value })
  })


  return {
    locale,
    country,
    currency,
    availableLocales,
    availableCountries,
    availableCurrencies,
    loading,
    error
  }
}
