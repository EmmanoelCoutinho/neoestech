import { ConfigProvider } from "antd";
import { UserProvider } from "../contexts/userContext";
import { NewPriceModalProvider } from "../contexts/newPriceModalContext";

const composeProviders =
  (...providers: any[]) =>
  (props: any) =>
    providers.reduceRight(
      (children, Provider) => <Provider {...props}>{children}</Provider>,
      props.children
    );

export const AllProviders = composeProviders(
  ConfigProvider,
  UserProvider,
  NewPriceModalProvider
);
