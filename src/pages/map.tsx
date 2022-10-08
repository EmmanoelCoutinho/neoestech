import { NextPage } from "next";
import React from "react";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

// import Map from "../components/Map";

const MapPage: NextPage = () => {
  return <Map />;
  // return <div>teste</div>;
};

export default MapPage;
