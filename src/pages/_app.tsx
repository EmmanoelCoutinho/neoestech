import type { AppProps } from "next/app";

import { UserProvider } from "../contexts/userContext";

import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import "antd/dist/antd.css";

import "../../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={ptBR}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ConfigProvider>
  );
}

export default MyApp;
