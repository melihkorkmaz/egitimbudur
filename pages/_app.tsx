import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import "./app.scss";
import "../public/css/styles.css";
import { AuthenticationStoreProvider } from "../store/authentication/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationStoreProvider>
      <Component {...pageProps} />
    </AuthenticationStoreProvider>
  );
}

export default MyApp;
