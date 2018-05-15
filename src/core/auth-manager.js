import history from './history';
import facebookAuthProvider from './facebook-auth-provider';
import googleAuthProvider from './google-auth-provider';
import CustomError from './custom-error';

const AUTH_TOKEN_KEY = 'authToken';

const authProviders = {
  facebook: facebookAuthProvider,
  google: googleAuthProvider,
};

const authManager = {
  init() {
    const promises = [];
    const providers = Object.values(authProviders);

    for (let i = 0; i < providers.length; i++) {
      promises.push(providers[i].init());
    }

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
  signout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
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
        redirectTo: '/signin',
      };
    }

    try {
      const accessToken = await provider.handleAuthCallback({ qs, hash });

      localStorage.setItem(AUTH_TOKEN_KEY, accessToken);

      return {
        redirectTo: '/admin',
      };
    } catch (error) {
      let errorMessage = 'An error has ocurred. Try again.';
      if (error instanceof CustomError) {
        errorMessage = error.message;
      }

      return {
        redirectTo: `/${action}`,
        redirectState: {
          error: errorMessage,
        },
      };
    }
  },
};

export default authManager;
