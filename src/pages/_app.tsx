import type { AppProps } from "next/app";

import ptBR from "antd/lib/locale/pt_BR";
import "antd/dist/antd.css";

import { AllProviders } from "../utils/AllProviders";

import "../styles/main.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AllProviders locale={ptBR}>
      <Component {...pageProps} />
    </AllProviders>
  );
}
