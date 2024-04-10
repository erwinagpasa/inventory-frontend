import { ApolloClient, InMemoryCache } from '@apollo/client';


// const apolloClient = new ApolloClient({
//   uri: process.env.NEXT_PUBLIC_APOLLO_URI,
//   cache: new InMemoryCache(),
// });

// export default apolloClient;



const createApolloClient = (endpoint: any) => {
  const apolloClient = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache(),
  });

  return apolloClient;
};

export default createApolloClient;