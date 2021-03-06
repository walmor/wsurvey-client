import history from './history';
import facebookAuthProvider from './facebook-auth-provider';
import googleAuthProvider from './google-auth-provider';
import CustomError from './custom-error';

const AUTH_TOKEN_KEY = 'authToken';

const authProviders = {
  facebook: facebookAuthProvider,
  google: googleAuthProvider,
};

let initialized = false;

const authManager = {
  init() {
    if (initialized) {
      return Promise.resolve();
    }

    const promises = [];
    const providers = Object.values(authProviders);

    for (let i = 0; i < providers.length; i++) {
      promises.push(providers[i].init());
    }

    initialized = true;

    return Promise.all(promises);
  },

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  async isSignedIn() {
    if (this.getToken()) return true;

    const providers = Object.values(authProviders);

    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i];

      try {
        /* eslint-disable no-await-in-loop */
        if (await provider.isConnected()) {
          const accessToken = await provider.signin();
          localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
          return true;
        }
      } catch (error) {
        // Fail-silent. Just let the function return
        // false case all providers fail to sign in.
      }
    }

    return false;
  },

  signin(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    this.redirectToAdminPage();
  },

  async signout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);

    const promises = [];
    const providers = Object.values(authProviders);

    for (let i = 0; i < providers.length; i++) {
      promises.push(providers[i].signout());
    }

    await Promise.all(promises);

    this.redirectToSignInPage();
  },

  redirectToSignInPage() {
    history.push('/signin');
  },

  redirectToAdminPage() {
    history.push('/admin');
  },

  async handleProviderCallback({
    providerName, action, qs, hash,
  }) {
    const provider = authProviders[providerName];

    if (!provider) {
      return {
        pathname: '/signin',
      };
    }

    try {
      const accessToken = await provider.handleAuthCallback({ qs, hash });

      localStorage.setItem(AUTH_TOKEN_KEY, accessToken);

      return {
        pathname: '/admin',
      };
    } catch (error) {
      let errorMessage = 'An error has ocurred. Try again.';
      if (error instanceof CustomError) {
        errorMessage = error.message;
      }

      return {
        pathname: `/${action}`,
        state: {
          error: errorMessage,
        },
      };
    }
  },
};

export default authManager;
