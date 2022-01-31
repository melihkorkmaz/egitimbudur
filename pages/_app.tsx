import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import "./app.scss";
import "../public/css/styles.css";
import '../firebase/clientApp';
import { UserProvider } from "../modules/auth/UserProvider";

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

const searchClient = algoliasearch('FY43U8NHZ5', '901ef297dc7e77d498294580d6ca8f07');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_teachers">
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </InstantSearch>
  );
}

export default MyApp;
