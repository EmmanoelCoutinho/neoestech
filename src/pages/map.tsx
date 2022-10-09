import { NextPage } from "next";

import dynamic from "next/dynamic";

import MainLayout from "../layout/Layout";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const MapPage: NextPage = () => {
  return (
    <MainLayout>
      <Map />
    </MainLayout>
  );
};

export default MapPage;
