import * as Facebook from 'fb-sdk-wrapper';
import queryString from 'query-string';
import config from './config';
import CustomError from './custom-error';
import getLocationOrigin from './location-origin';
import apolloClient from './apollo-client';
import { SIGN_IN_WITH_FACEBOOK } from '../graphql/mutations';
import getGraphQLErrorMessage from '../graphql/get-graphql-error-msg';

const APP_ID = config.facebookAppId;
const AUTH_URL = 'https://www.facebook.com/v3.0/dialog/oauth';

async function signinWithFacebook(fbAccessToken) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: SIGN_IN_WITH_FACEBOOK,
      variables: {
        accessToken: fbAccessToken,
      },
    });

    const accessToken = data.signinWithFacebook;

    return accessToken;
  } catch (error) {
    throw new CustomError(getGraphQLErrorMessage(error));
  }
}

const facebookAuthManager = {
  async init() {
    await Facebook.load();
    await Facebook.init({
      appId: APP_ID,
    });
  },

  async isConnected() {
    const { status } = await Facebook.getLoginStatus();
    return status === 'connected';
  },

  async signin() {
    const { authResponse } = await Facebook.getLoginStatus();

    if (!authResponse || !authResponse.accessToken) {
      return null;
    }

    const fbAccessToken = authResponse.accessToken;

    return signinWithFacebook(fbAccessToken);
  },

  redirectToAuthPage({ action }) {
    const redirectUri = `${getLocationOrigin()}/auth-callback/${action}/facebook`;

    const qs = queryString.stringify({
      app_id: APP_ID,
      response_type: 'token',
      scope: 'email',
      auth_type: 'rerequest',
      redirect_uri: redirectUri,
    });

    const url = `${AUTH_URL}?${qs}`;

    window.location = url;
  },

  async handleAuthCallback({ qs, hash }) {
    const { error, error_description: errorDescription } = queryString.parse(qs);

    if (error) {
      if (error === 'access_denied') {
        throw new CustomError('You should accept the Facebooks login dialog to proceed.');
      }

      throw new Error(errorDescription);
    }

    const { access_token: fbAccessToken } = queryString.parse(hash);

    return signinWithFacebook(fbAccessToken);
  },
};

export default facebookAuthManager;
