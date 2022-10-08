import { NextPage } from "next";

import dynamic from "next/dynamic";

import Layout from "../layout/Layout";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const MapPage: NextPage = () => {
  return (
    <Layout>
      <Map />
    </Layout>
  );
};

export default MapPage;
