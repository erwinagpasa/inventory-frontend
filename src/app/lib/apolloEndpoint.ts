import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_URI,
  credentials: "same-origin",
});

// Define a middleware to add headers to requests
const authMiddleware = new ApolloLink((operation, forward) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');

  // Add the authorization header to the request
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  });

  return forward(operation);
});

const createApolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink), // Concatenate the middleware with the httpLink
  cache: new InMemoryCache(),
});

export default createApolloClient;
