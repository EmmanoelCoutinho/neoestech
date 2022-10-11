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
    const filtredData: any = filterData(data, ["CSDTAM0006", "CSDTAM0007"]);
    setEquipaments(data);
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
        <h1 className="ml-14 mt-4 font-bold text-3xl text-[#f69b44]">
          Gráficos das ultimas 24h de operação
        </h1>
        {equipaments.map((item: any) => (
          <GraphicCards
            key={item[0].id}
            equipId={item[0].id}
            equipKey={item[0].chave}
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
