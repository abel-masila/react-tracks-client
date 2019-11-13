import React from "react";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import withRoot from "./withRoot";

const Root = () => (
  <Query query={GET_ME}>
    {({ data, loading, error }) => {
      if (loading) return <p>loading...</p>;
      if (error) return <p>{error.message}</p>;

      return <div>{JSON.stringify(data, 0, 2)}</div>;
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
      username
      lastName
      firstName
      isActive
      dateJoined
    }
  }
`;

export default withRoot(Root);
