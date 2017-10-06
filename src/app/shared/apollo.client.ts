import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions';

const GRAPHQL_SUBSCRIPTION_ENDPOINT = 'wss://subscriptions.us-west-2.graph.cool/v1/cj864jf2302n30112ip74zkoy';
const GRAPHQL_ENDPOINT = 'https://api.graph.cool/simple/v1/cj864jf2302n30112ip74zkoy';
const EXPRESS_ENDPOINT = 'http://localhost:8080/graphql';

const wsClient = new SubscriptionClient(GRAPHQL_SUBSCRIPTION_ENDPOINT, {
  reconnect: true
});

// Graph.cool Instance
const networkInterface = createNetworkInterface({ uri: GRAPHQL_ENDPOINT });

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

// Finally, create your ApolloClient instance with the modified network interface
const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

export function provideClient(): ApolloClient {
  return client;
}
