import { setup, onTokenChange } from '@vue-storefront/commercetools-api';
import { config } from '../config';

export default ({ app }) => {
  if (!app.$cookies) {
    throw 'Error cookie-universal-nuxt module is not applied in nuxt.config.js';
  }
  const contextToken = app.$cookies.get(config.cookies.tokenCookieName) || '';

  /**
   * Setup Shopware API client
   */
  setup({
    ...config,
    contextToken
  });

  onTokenChange(token => {
    try {
      app.$cookies.set(config.cookies.tokenCookieName, token, { maxAge: 60 * 60 * 24 * 365 });
    } catch {
      // Sometimes cookie is set on server after request is send, it can fail silently
    }
  });
};
