import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import "./app.scss";
import "../public/css/styles.css";
import { AuthenticationStoreProvider } from "../store/authentication/store";
import { ApolloProvider } from "@apollo/client";
import client from '../graphql/apollo-client';
import { UserStoreProvider } from "../store/user/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserStoreProvider>
        <AuthenticationStoreProvider>
          <Component {...pageProps} />
        </AuthenticationStoreProvider>
      </UserStoreProvider>
    </ApolloProvider>
  );
}

export default MyApp;
