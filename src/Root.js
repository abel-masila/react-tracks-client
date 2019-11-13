import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import App from "./pages/App";
import Profile from "./pages/Profile";
import Header from "./components/Shared/Header";
import Loading from "./components/Shared/Loading";
import Error from "./components/Shared/Error";
import withRoot from "./withRoot";

const Root = () => (
  <Query query={GET_ME}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error} />;
      const currentUser = data.me;
      return (
        <Router>
          <>
            <Header currentUser={currentUser} />
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/profile/:id" component={Profile} />
            </Switch>
          </>
        </Router>
      );
    }}
  </Query>
);

// const GET_TRACKS = gql`
//   {
//     tracks {
//       id
//       title
//       description
//       url
//       createdAt
//     }
//   }
// `;

const GET_ME = gql`
  {
    me {
      id
      username
      email
      lastName
      firstName
      isActive
      dateJoined
    }
  }
`;

export default withRoot(Root);
