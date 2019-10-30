import React from 'react';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import withRoot from './withRoot';

const Root = () => (
  <Query query={GET_TRACKS}>
    {({ data, loading, error }) => {
      if (loading) return <p>loading...</p>;
      if (error) return <p>{error.message}</p>;

      return <div>{JSON.stringify(data, 0, 2)}</div>;
    }}
  </Query>
);

const GET_TRACKS = gql`
  {
    tracks {
      id
      title
      description
      url
      createdAt
    }
  }
`;

export default withRoot(Root);
