import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: ' http://127.0.0.1:8000/graphql/'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
