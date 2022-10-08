import {
  PushpinOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import React, { useState, useRef } from "react";

import { useRouter } from "next/router";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Mapa", "1", <PushpinOutlined />),
  getItem("Gráficos", "2", <PieChartOutlined />),
  getItem("Dashboard", "3", <DesktopOutlined />),
];

const AsideMenu: React.FC = () => {
  const Router = useRouter();
  const pages = ["/map", "/graphics", "/dashboard"];

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="w-64 bg-white">
      <Button
        type="default"
        onClick={toggleCollapsed}
        className="w-full flex justify-center items-center text-[#f69b44] border-none focus:text-[#f69b44] "
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={({ key }: any) => {
          Router.push(pages[key - 1]);
        }}
        className="bg-white w-full text-[#f69b44]"
      />
    </div>
  );
};

export default AsideMenu;
