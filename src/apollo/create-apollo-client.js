import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'isomorphic-fetch';

const createApolloClient = () => {
  const hasuraLink = new HttpLink({
    uri: 'https://project-cost-app.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'EBxaNpdFLrkA4EDme2bs0uY8ib5dI7fOq7eenYxHvTTZoXbxF5Ca2JeWYGpi9taz',
    },
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    fetch,
    link: hasuraLink,
    cache,
  });
  return client;
};

export default createApolloClient;
