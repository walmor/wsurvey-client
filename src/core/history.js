import { createBrowserHistory } from 'history';
import { getCurrentRoute } from './routes';
import apolloClient from './apollo-client';

const history = createBrowserHistory();

history.listen((location) => {
  saveCurrentRoute(location);
});

function saveCurrentRoute(location) {
  const currentRoute = getCurrentRoute(location.pathname);

  apolloClient.writeData({
    data: {
      currentRoute,
    },
  });
}

saveCurrentRoute(history.location);

export default history;
