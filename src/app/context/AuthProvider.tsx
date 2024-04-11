'use client';
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../lib/apolloEndpoint";


export default function AuthProvider({ children, session }: any) {

  // const apolloClient = createApolloClient(process.env.NEXT_PUBLIC_APOLLO_URI);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={createApolloClient}>
        {children}
      </ApolloProvider>
    </SessionProvider>
  )
}