import { ApolloClient, InMemoryCache } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

// Adds messages only in a dev environment
loadDevMessages();
loadErrorMessages();

export default apolloClient;