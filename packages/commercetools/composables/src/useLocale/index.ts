import { UseLocale } from '@vue-storefront/interfaces';
import { useLocaleFactory } from '@vue-storefront/factories';
import { AvailableCountries, AvailableCurrencies, AvailableLocales, Country, Currency, Locale } from '../types/Locale';

import { params } from './factoryParams';

const useLocale: () => UseLocale<Locale, Country, Currency, AvailableLocales, AvailableCountries, AvailableCurrencies> =
  useLocaleFactory<Locale, Country, Currency, AvailableLocales, AvailableCountries, AvailableCurrencies>(params);

export default useLocale;
