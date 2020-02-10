import { ref, Ref, computed, watch } from '@vue/composition-api'
import {
  countries,
  currencies,
  currency as defaultCurrency,
  country as defaultCountry,
  setup
} from '@vue-storefront/commercetools-api'
import Cookies from 'js-cookie'
import { UseLocale } from '@vue-storefront/interfaces'

type Locale = Ref<string>
type Country = Ref<string>
type Currency = Ref<string>
type AvailableLocales = Ref<Readonly<string[]>>
type AvailableCountries = Ref<Readonly<string[]>>
type AvailableCurrencies = Ref<Readonly<string[]>>

export default function useLocales(context: any): UseLocale<Locale, Country, Currency, AvailableLocales, AvailableCountries, AvailableCurrencies> {
  const loading = ref(false)
  const error = ref(null)
  const locale: Locale = ref(context.root.$i18n.locale)
  const availableLocales: AvailableLocales = computed<string[]>(() => context.root.$i18n.availableLocales)
  const availableCountries: AvailableCountries = computed<string[]>(() => countries)
  const availableCurrencies: AvailableCurrencies = computed<string[]>(() => currencies)
  const country: Country = ref(null)
  const currency: Currency = ref(null)

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
