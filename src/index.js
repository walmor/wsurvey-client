import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import authManager from './core/auth-manager';
import './styles/index.css';

authManager.init().then(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
});
