import config from './config';
import CustomError from './custom-error';
import apolloClient from './apollo-client';
import getLocationOrigin from './location-origin';
import { SIGN_IN_WITH_GOOGLE } from '../graphql/mutations';
import getGraphQLErrorMessage from '../graphql/get-graphql-error-msg';

/* global gapi */

let GoogleAuth = null;
let initFailure = false;

function loadGoogleApi() {
  return new Promise((resolve, reject) => {
    gapi.load('client', {
      callback: resolve,
      onerror: reject,
    });
  });
}

function initGoogleApi() {
  return new Promise((resolve, reject) => {
    gapi.client
      .init({
        clientId: config.googleClientId,
        scope: 'profile email',
      })
      .then(resolve, reject);
  });
}

async function signinWithGoogle(idToken) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: SIGN_IN_WITH_GOOGLE,
      variables: {
        idToken,
      },
    });

    const accessToken = data.signinWithGoogle;

    return accessToken;
  } catch (error) {
    throw new CustomError(getGraphQLErrorMessage(error));
  }
}

const googleAuthManager = {
  async init() {
    try {
      await loadGoogleApi();
      await initGoogleApi();
      GoogleAuth = gapi.auth2.getAuthInstance();
    } catch (error) {
      initFailure = true;
    }
  },

  async isConnected() {
    if (initFailure) return false;
    return GoogleAuth.isSignedIn.get();
  },

  async signin() {
    if (!this.isConnected()) {
      throw new CustomError('No user is connected.');
    }

    const user = GoogleAuth.currentUser.get();

    const authResponse = await user.reloadAuthResponse();

    if (!authResponse || !authResponse.id_token) {
      return null;
    }

    return signinWithGoogle(authResponse.id_token);
  },

  async signout() {
    if (initFailure) return;
    await GoogleAuth.signOut();
  },

  redirectToAuthPage({ action }) {
    if (initFailure) {
      throw new CustomError('Google authentication is not available at the moment.');
    }

    const redirectUri = `${getLocationOrigin()}/auth-callback/${action}/google`;

    GoogleAuth.signIn({
      ux_mode: 'redirect',
      redirect_uri: redirectUri,
    });
  },

  async handleAuthCallback() {
    if (initFailure) {
      throw new CustomError('Error processing the Google response. Try again.');
    }

    const user = GoogleAuth.currentUser.get();

    if (!user.isSignedIn()) {
      throw new CustomError('You should accept the Google login dialog to proceed.');
    }

    const authResponse = user.getAuthResponse();

    return signinWithGoogle(authResponse.id_token);
  },
};

export default googleAuthManager;
