import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MainLayout from "../layout/Layout";

import { getEquipmentList } from "../services/monitoring";

const GraphicCards = dynamic(() => import("../components/GraphicChart"), {
  ssr: false,
});

export default function Graphics() {
  const [equipaments, setEquipaments] = useState([]);

  const getEquips = async () => {
    const data: any = await getEquipmentList(
      "1790|fiwdSKpyujL7Str9WNyxhXpa3c7hwHuWWVHzIRoQ",
      "CSDTAM"
    );
    const filtredData: any = filterData(data, ["CSDTAM0006", "CSDTAM0007"]);
    setEquipaments(filtredData);
  };

  const filterData = (arr: [], filters: String[]) => {
    const newArr = filters.map((item) => {
      return arr.filter((i: any) => i.qr_code_neo === item);
    });
    return newArr;
  };

  useEffect(() => {
    getEquips();
  }, []);

  return (
    <MainLayout>
      <div className="w-full h-full bg-white ">
        {equipaments.map((item: any) => (
          <GraphicCards
            key={item[0].id}
            category={item[0].categoria}
            currentTemperature={item[0].temperatura_atual}
            equipament={item[0].equipamento}
            unitOfMeasurenment={item[0].unidade_medida}
            lastTempCheck={item[0].data_hora_ultima_medicao}
          />
        ))}
      </div>
    </MainLayout>
  );
}