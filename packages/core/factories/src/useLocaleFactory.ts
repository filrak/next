import { computed, Ref, ref } from '@vue/composition-api';
import { AgnosticCountry, AgnosticCurrency, AgnosticLocale, UseLocale } from '@vue-storefront/interfaces';

export type UseLocaleFactoryParams = {
  setLocale: (AgnosticLocale) => Promise<void>;
  setCountry: (AgnosticCountry) => Promise<void>;
  setCurrency: (AgnosticCurrency) => Promise<void>;
  loadAvailableLocales: () => Promise<AgnosticLocale[]>;
  loadAvailableCountries: () => Promise<AgnosticCountry[]>;
  loadAvailableCurrencies: () => Promise<AgnosticCurrency[]>;
};

export function useLocaleFactory(factoryParams: UseLocaleFactoryParams) {
  const loadingLocale = false;
  const localeState: Ref<AgnosticLocale> = ref(null);
  const countryState: Ref<AgnosticCountry> = ref(null);
  const currencyState: Ref<AgnosticCurrency> = ref(null);
  const availableLocalesState: Ref<AgnosticLocale[]> = ref([]);
  const availableCountriesState: Ref<AgnosticCountry[]> = ref([]);
  const availableCurrenciesState: Ref<AgnosticCurrency[]> = ref([]);

  const loading = computed<boolean>(() => loadingLocale);
  const locale = computed<AgnosticLocale>(() => localeState.value);
  const country = computed<AgnosticCountry>(() => countryState.value);
  const currency = computed<AgnosticCurrency>(() => currencyState.value);
  const availableLocales = computed<AgnosticLocale[]>(() => availableLocalesState.value);
  const availableCountries = computed<AgnosticCountry[]>(() => availableCountriesState.value);
  const availableCurrencies = computed<AgnosticCurrency[]>(() => availableCurrenciesState.value);

  const setLocale = async (locale: AgnosticLocale) => {
    await factoryParams.setLocale(locale);
    localeState.value = locale;
  };
  const setCountry = async (country: AgnosticCountry) => {
    await factoryParams.setCountry(country);
    countryState.value = country;
  };
  const setCurrency = async (currency: AgnosticCurrency) => {
    await factoryParams.setCurrency(currency);
    currencyState.value = currency;
  };
  const loadAvailableLocales = async () => {
    availableLocalesState.value = await factoryParams.loadAvailableLocales();
  };
  const loadAvailableCountries = async () => {
    availableCountriesState.value = await factoryParams.loadAvailableCountries();
  };
  const loadAvailableCurrencies = async () => {
    availableCurrenciesState.value = await factoryParams.loadAvailableCurrencies();
  };

  return function useLocale(): UseLocale {
    return {
      availableLocales,
      availableCountries,
      availableCurrencies,
      country,
      currency,
      loadAvailableLocales,
      loadAvailableCountries,
      loadAvailableCurrencies,
      loading,
      locale,
      setCountry,
      setCurrency,
      setLocale
    };
  };
}
