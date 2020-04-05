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
  const loading: Ref<boolean> = ref(false);
  const currentLocale: Ref<AgnosticLocale> = ref(null);
  const currentCountry: Ref<AgnosticCountry> = ref(null);
  const currentState: Ref<AgnosticCurrency> = ref(null);
  const availableLocalesState: Ref<AgnosticLocale[]> = ref([]);
  const availableCountriesState: Ref<AgnosticCountry[]> = ref([]);
  const availableCurrenciesState: Ref<AgnosticCurrency[]> = ref([]);

  const setLocale = async (locale: AgnosticLocale) => {
    loading.value = true;
    await factoryParams.setLocale(locale);
    currentLocale.value = locale;
    loading.value = false;
  };
  const setCountry = async (country: AgnosticCountry) => {
    loading.value = true;
    await factoryParams.setCountry(country);
    currentCountry.value = country;
    loading.value = false;
  };
  const setCurrency = async (currency: AgnosticCurrency) => {
    loading.value = true;
    await factoryParams.setCurrency(currency);
    currentState.value = currency;
    loading.value = false;
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
      loadAvailableLocales,
      loadAvailableCountries,
      loadAvailableCurrencies,
      setCountry,
      setCurrency,
      setLocale,
      loading: computed<boolean>(() => loading.value),
      locale: computed<AgnosticLocale>(() => currentLocale.value),
      country: computed<AgnosticCountry>(() => currentCountry.value),
      currency: computed<AgnosticCurrency>(() => currentState.value),
      availableLocales: computed<AgnosticLocale[]>(() => availableLocalesState.value),
      availableCountries: computed<AgnosticCountry[]>(() => availableCountriesState.value),
      availableCurrencies: computed<AgnosticCurrency[]>(() => availableCurrenciesState.value)
    };
  };
}
