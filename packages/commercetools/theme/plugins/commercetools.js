import { setup, onTokenChange } from '@vue-storefront/commercetools-api';
import { config } from './commercetools-config';

export default ({ app }) => {
  if (!app.$cookies) {
    throw 'Error cookie-universal-nuxt module is not applied in nuxt.config.js';
  }
  const contextToken = app.$cookies.get(config.cookies.authTokenCookieName) || '';

  /**
   * Setup commercetools API client
   */
  setup({
    ...config,
    contextToken
  });

  onTokenChange(token => {
    try {
      app.$cookies.set(config.cookies.authTokenCookieName, token, { maxAge: 60 * 60 * 24 * 365 });
    } catch {
      // Sometimes cookie is set on server after request is send, it can fail silently
    }
  });
};
