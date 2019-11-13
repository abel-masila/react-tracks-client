import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";
import Root from "./Root";
import Auth from "./components/Auth";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: " http://127.0.0.1:8000/graphql/",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("jwt-token") || "";
    operation.setContext({
      headers: {
        Authorization: `JWT ${token} `
      }
    });
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem("jwt-token")
    }
  }
});

const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`;
ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({ data }) => (data.isLoggedIn ? <Root /> : <Auth />)}
    </Query>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
