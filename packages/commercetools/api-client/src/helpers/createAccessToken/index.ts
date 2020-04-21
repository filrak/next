import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { Token, ApiConfig, CustomerCredentials } from '../../types/setup';
import { api, currentToken } from './../../index';

// %7B%22access_token%22%3A%22uDAmp-v7A32jkaUezGwvKHlAsDyxAE_L%22%2C%22expires_in%22%3A172800%2C%22scope%22%3A%22create_anonymous_token%3Avsf-ct-dev%20manage_my_orders%3Avsf-ct-dev%20manage_my_profile%3Avsf-ct-dev%20anonymous_id%3A89038268-78ec-41a5-aeca-797cc4249c95%20manage_my_shopping_lists%3Avsf-ct-dev%20manage_my_payments%3Avsf-ct-dev%20view_products%3Avsf-ct-dev%20view_published_products%3Avsf-ct-dev%22%2C%22refresh_token%22%3A%22ZtGL5kEc_I-AKxGYpw0uYwii8sYZNtutSeuTWuiekSY%3D%22%2C%22token_type%22%3A%22Bearer%22%2C%22expires_at%22%3A1587033011585%7D
interface FlowOptions {
  currentToken?: Token;
  customerCredentials?: CustomerCredentials;
}

const createAuthClient = (config: ApiConfig): SdkAuth =>
  new SdkAuth({
    host: config.authHost,
    projectKey: config.projectKey,
    disableRefreshToken: false,
    credentials: {
      clientId: config.clientId,
      clientSecret: config.clientSecret
    },
    scopes: config.scopes
  });

const isValid = (token: Token) => token && Boolean(token.refresh_token);

const getCurrentToken = (options: FlowOptions = {}) => {
  if (currentToken) {
    return currentToken;
  }

  return options.currentToken;
};

const getTokenFlow = async (sdkAuth: SdkAuth, options: FlowOptions = {}) => {
  const currentToken = getCurrentToken(options);

  if (options.customerCredentials) {
    return sdkAuth.customerPasswordFlow(options.customerCredentials);
  }

  if (isValid(currentToken)) {
    return Promise.resolve(currentToken);
  }

  return sdkAuth.anonymousFlow();
};

const createAccessToken = async (options: FlowOptions = {}): Promise<Token> => {
  const sdkAuth = createAuthClient(api);
  const tokenInfo = await getTokenFlow(sdkAuth, options);
  const tokenProvider = new TokenProvider({ sdkAuth }, tokenInfo);

  return tokenProvider.getTokenInfo();
};

export default createAccessToken;
