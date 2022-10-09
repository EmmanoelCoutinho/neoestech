import React, { ReactNode } from "react";

import AsideMenu from "../components/AsideMenu";

export default function ({ children }: any) {
  return (
    <div className="w-screen h-screen flex  overflow-x-hidden">
      <AsideMenu />
      <div className="w-full flex">{children}</div>
    </div>
  );
}
