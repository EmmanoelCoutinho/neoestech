import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MainLayout from "../layout/Layout";

import { getEquipmentList } from "../services/monitoring";
import { UserContext } from "../contexts/userContext";

const GraphicCards = dynamic(() => import("../components/GraphicChart"), {
  ssr: false,
});

export default function Graphics() {
  const { userData } = useContext(UserContext);

  const [equipaments, setEquipaments] = useState([]);

  const getEquips = async () => {
    const data: any = await getEquipmentList(`${userData.token}`, "CSDTAM");
    // const filtredData: any = filterData(data, ["CSDTAM0006", "CSDTAM0007"]);
    // setEquipaments(data);
    // console.log(filtredData);
  };

  // const filterData = (arr: [], filters: String[]) => {
  //   const newArr = filters.map((item) => {
  //     return arr.filter((i: any) => i.qr_code_neo === item);
  //   });
  //   return newArr;
  // };

  // useEffect(() => {
  //   getEquips();
  // }, []);

  return <div>teste</div>;
}
