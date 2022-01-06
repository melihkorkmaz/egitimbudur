import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import "./app.scss";
import "../public/css/styles.css";
import '../firebase/clientApp';
import { UserProvider } from "../providers/UserProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
