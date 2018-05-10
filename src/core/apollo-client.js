import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import authManager from '../core/auth-manager';
import config from './config';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // TODO: handle authorization errors
  }

  if (networkError) {
    if (networkError.statusCode === 401) {
      authManager.signout();
    }
  }
});

const httpLink = new HttpLink({
  uri: config.graphqlEndpoint,
});

const authLink = setContext((_, { headers }) => {
  const token = authManager.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
