import "../styles/globals.scss";
import "../styles/Grid.scss";
import "../styles/Node.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
