import { ApolloClient, createNetworkInterface } from 'apollo-client';

const BASE_URL = 'http://localhost:8080/graphql';
const networkInterface = createNetworkInterface({ uri: BASE_URL });

const client = new ApolloClient({ networkInterface });

export function provideClient(): ApolloClient {
  return client;
}
