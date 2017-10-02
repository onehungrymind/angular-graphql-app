import { ApolloClient, createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj864jf2302n30112ip74zkoy' });

const client = new ApolloClient({ networkInterface });

export function provideClient(): ApolloClient {
  return client;
}
