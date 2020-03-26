import { UseLocale } from '@vue-storefront/interfaces';
import { UseLocaleFactoryParams, useLocaleFactory } from '../src';

const params: UseLocaleFactoryParams<string, string, string> = {
  loadAvailableLocales: jest.fn(async () => []),
  loadAvailableCountries: jest.fn(async () => []),
  loadAvailableCurrencies: jest.fn(async () => [])
};
let useLocale: () => UseLocale<string, string, string, string[], string[], string[]>;

function createComposable(): void {
  useLocale = useLocaleFactory<any, any, any>(params);
}

describe('[CORE - factories] useLocaleFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial setup', () => {
    it('should have proper initial props', () => {
      createComposable();
      const { loading, currency, locale, country, availableLocales, availableCountries, availableCurrencies } = useLocale();
      expect(loading.value).toEqual(true);
      expect(currency.value).toEqual(null);
      expect(locale.value).toEqual(null);
      expect(country.value).toEqual(null);
      expect(availableLocales.value).toEqual([]);
      expect(availableCountries.value).toEqual([]);
      expect(availableCurrencies.value).toEqual([]);
    });

    it('asynchronously loads available settings on initialization', done => {
      (params.loadAvailableLocales as jest.Mock).mockResolvedValue(['en']);
      (params.loadAvailableCountries as jest.Mock).mockResolvedValue(['us']);
      (params.loadAvailableCurrencies as jest.Mock).mockResolvedValue(['usd']);
      createComposable();
      const { availableLocales, availableCountries, availableCurrencies } = useLocale();
      process.nextTick(() => {
        expect(availableLocales.value).toEqual(['en']);
        expect(availableCountries.value).toEqual(['us']);
        expect(availableCurrencies.value).toEqual(['usd']);
        done();
      });
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      createComposable();
    });

    describe('setters', () => {
      it('should set exported locale to provided value', async () => {
        const { setLocale, locale } = useLocale();
        setLocale('en');
        expect(locale.value).toEqual('en');
      });

      it('should set exported country to provided value', async () => {
        const { setCountry, country } = useLocale();
        setCountry('us');
        expect(country.value).toEqual('us');
      });

      it('should set exported currency to provided value', async () => {
        const { setCurrency, currency } = useLocale();
        setCurrency('usd');
        expect(currency.value).toEqual('usd');
      });
    });

    describe('useLocaleFactory', () => {
      it('asynchronously reloads available settings', async () => {
        (params.loadAvailableLocales as jest.Mock).mockResolvedValue(['en']);
        (params.loadAvailableCountries as jest.Mock).mockResolvedValue(['gb']);
        (params.loadAvailableCurrencies as jest.Mock).mockResolvedValue(['gbp']);
        const { refreshAvailableElements, availableLocales, availableCountries, availableCurrencies } = useLocale();
        await refreshAvailableElements();
        expect(availableLocales.value).toEqual(['en']);
        expect(availableCountries.value).toEqual(['gb']);
        expect(availableCurrencies.value).toEqual(['gbp']);
      });
      it('throws error when one of settings loaders rejects', () => {
        (params.loadAvailableLocales as jest.Mock).mockRejectedValue('error');
        const { refreshAvailableElements } = useLocale();
        return expect(refreshAvailableElements()).rejects.toEqual('error');
      });
    });
  });
});
