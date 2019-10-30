import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Root from './Root';
import Auth from './components/Auth';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: ' http://127.0.0.1:8000/graphql/'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Auth />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
