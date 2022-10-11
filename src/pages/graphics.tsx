import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MainLayout from "../layout/Layout";

import { getEquipmentList } from "../services/monitoring";

const GraphicCards = dynamic(() => import("../components/GraphicChart"), {
  ssr: false,
});

export default function Graphics() {
<<<<<<< HEAD
  // const { userData } = useContext(UserContext);

  const [equipaments, setEquipaments] = useState([]);

  const getEquips = async () => {
    const data: any = await getEquipmentList(``, "CSDTAM");
    // const filtredData: any = filterData(data, ["CSDTAM0006", "CSDTAM0007"]);
    // setEquipaments(data);
    // console.log(filtredData);
=======
  const [equipaments, setEquipaments] = useState([]);

  const getEquips = async () => {
    const data: any = await getEquipmentList(
      "1790|fiwdSKpyujL7Str9WNyxhXpa3c7hwHuWWVHzIRoQ",
      "CSDTAM"
    );
    const filtredData: any = filterData(data, ["CSDTAM0006", "CSDTAM0007"]);
    setEquipaments(filtredData);
>>>>>>> parent of 653516c... limpeza no codigo :)
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
