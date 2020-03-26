import { Ref } from '@vue/composition-api';
import { LocaleItem } from '@vue-storefront/commercetools-api/lib/src/types/setup';

export type Locale = Ref<string>
export type Country = Ref<string>
export type Currency = Ref<string>
export type AvailableLocales = Ref<Readonly<LocaleItem[]>>
export type AvailableCountries = Ref<Readonly<LocaleItem[]>>
export type AvailableCurrencies = Ref<Readonly<LocaleItem[]>>
