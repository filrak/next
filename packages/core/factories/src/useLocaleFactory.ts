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
  let loadingLocale = false;
  const currentLocale: Ref<AgnosticLocale> = ref(null);
  const currentCountry: Ref<AgnosticCountry> = ref(null);
  const currentState: Ref<AgnosticCurrency> = ref(null);
  const availableLocalesState: Ref<AgnosticLocale[]> = ref([]);
  const availableCountriesState: Ref<AgnosticCountry[]> = ref([]);
  const availableCurrenciesState: Ref<AgnosticCurrency[]> = ref([]);

  const loading = computed<boolean>(() => loadingLocale);
  const locale = computed<AgnosticLocale>(() => currentLocale.value);
  const country = computed<AgnosticCountry>(() => currentCountry.value);
  const currency = computed<AgnosticCurrency>(() => currentState.value);
  const availableLocales = computed<AgnosticLocale[]>(() => availableLocalesState.value);
  const availableCountries = computed<AgnosticCountry[]>(() => availableCountriesState.value);
  const availableCurrencies = computed<AgnosticCurrency[]>(() => availableCurrenciesState.value);

  const setLocale = async (locale: AgnosticLocale) => {
    loadingLocale = true;
    await factoryParams.setLocale(locale);
    currentLocale.value = locale;
    loadingLocale = false;
  };
  const setCountry = async (country: AgnosticCountry) => {
    loadingLocale = true;
    await factoryParams.setCountry(country);
    currentCountry.value = country;
    loadingLocale = false;
  };
  const setCurrency = async (currency: AgnosticCurrency) => {
    loadingLocale = true;
    await factoryParams.setCurrency(currency);
    currentState.value = currency;
    loadingLocale = false;
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
