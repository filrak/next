import {computed, Ref, ref} from '@vue/composition-api';
import { UseLocale } from '@vue-storefront/interfaces';

export type UseLocaleFactoryParams<
  LOCALE,
  COUNTRY,
  CURRENCY,
  AVAILABLE_LOCALES = LOCALE[],
  AVAILABLE_COUNTRIES = COUNTRY[],
  AVAILABLE_CURRENCIES = CURRENCY[]> = {
  loadAvailableLocales: () => Promise<AVAILABLE_LOCALES>;
  loadAvailableCountries: () => Promise<AVAILABLE_COUNTRIES>;
  loadAvailableCurrencies: () => Promise<AVAILABLE_CURRENCIES>;
};

export function useLocaleFactory<
  LOCALE,
  COUNTRY,
  CURRENCY,
  AVAILABLE_LOCALES = LOCALE[],
  AVAILABLE_COUNTRIES = COUNTRY[],
  AVAILABLE_CURRENCIES = CURRENCY[],
  >(factoryParams: UseLocaleFactoryParams<
  LOCALE,
  COUNTRY,
  CURRENCY,
  AVAILABLE_LOCALES,
  AVAILABLE_COUNTRIES,
  AVAILABLE_CURRENCIES>
) {
  let loadingLocale = false;
  const localeCache: Ref<LOCALE> = ref(null);
  const countryCache: Ref<COUNTRY> = ref(null);
  const currencyCache: Ref<CURRENCY> = ref(null);
  const availableLocalesCache: Ref<AVAILABLE_LOCALES> = ref([]);
  const availableCountriesCache: Ref<AVAILABLE_COUNTRIES> = ref([]);
  const availableCurrenciesCache: Ref<AVAILABLE_CURRENCIES> = ref([]);

  const loading = computed<boolean>(() => loadingLocale);
  const locale = computed<LOCALE>(() => localeCache.value);
  const country = computed<COUNTRY>(() => countryCache.value);
  const currency = computed<CURRENCY>(() => currencyCache.value);
  const availableLocales = computed<AVAILABLE_LOCALES>(() => availableLocalesCache.value);
  const availableCountries = computed<AVAILABLE_COUNTRIES>(() => availableCountriesCache.value);
  const availableCurrencies = computed<AVAILABLE_CURRENCIES>(() => availableCurrenciesCache.value);

  const setLocale = (locale: LOCALE) => localeCache.value = locale;
  const setCountry = (country: COUNTRY) => countryCache.value = country;
  const setCurrency = (currency: CURRENCY) => currencyCache.value = currency;
  const refreshAvailableElements = async () => {
    loadingLocale = true;

    try {
      await Promise.all([
        (async () => availableLocalesCache.value = await factoryParams.loadAvailableLocales())(),
        (async () => availableCountriesCache.value = await factoryParams.loadAvailableCountries())(),
        (async () => availableCurrenciesCache.value = await factoryParams.loadAvailableCurrencies())()
      ]);
    } finally {
      loadingLocale = false;
    }
  };

  refreshAvailableElements();

  return function useLocale(): UseLocale<
    LOCALE,
    COUNTRY,
    CURRENCY,
    AVAILABLE_LOCALES,
    AVAILABLE_COUNTRIES,
    AVAILABLE_CURRENCIES
    > {
    return {
      locale,
      country,
      currency,
      setLocale,
      setCountry,
      setCurrency,
      availableLocales,
      availableCountries,
      availableCurrencies,
      refreshAvailableElements,
      loading
    };
  };
}
