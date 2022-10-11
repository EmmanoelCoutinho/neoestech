import React, { useState, useEffect } from "react";

import { PageHeader } from "antd";

import { useRouter } from "next/router";

import AsideMenu from "../components/AsideMenu";

export default function MainLayout({ children }: any) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const checkPath = () => {
    if (router.pathname === "/") {
      setTitle("Mapa");
      setSubtitle("Mapa de equipamentos");
    } else if (router.pathname === "/graphics") {
      setTitle("Gráficos");
      setSubtitle("Gráficos do aquecimento dos equipamentos no ultimo dia");
    } else if (router.pathname === "/dashboard") {
      setTitle("Dashboard");
      setSubtitle("Dashboard de gerenciamento");
    }
  };

  useEffect(() => {
    checkPath();
  }, []);

  return (
    <div className="w-screen h-full flex flex-col">
      <PageHeader
        className=" w-screen border-b-[1px] border-[#f69b44] "
        onBack={() => router.back()}
        title={title}
        subTitle={subtitle}
      />
      <div className="flex ">
        <AsideMenu />
        <div className="w-full flex">{children}</div>
      </div>
    </div>
  );
}
