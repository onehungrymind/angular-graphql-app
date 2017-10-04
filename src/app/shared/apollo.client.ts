import { ApolloClient, createNetworkInterface } from 'apollo-client';

// Graph.cool instance
const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj864jf2302n30112ip74zkoy' });

// Local Instance
// const networkInterface = createNetworkInterface({ uri: 'http://localhost:8080/graphql' });

const client = new ApolloClient({ networkInterface });

export function provideClient(): ApolloClient {
  return client;
}
