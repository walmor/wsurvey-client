import history from './history';

const AUTH_TOKEN_KEY = 'authToken';

const authManager = {
  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
  isSignedIn() {
    return !!this.getToken();
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
    history.push('/');
  },
  redirectToAdminPage() {
    history.push('/admin');
  },
};

export default authManager;
