import React, { useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { getLastDayInfos } from "../services/monitoring";

interface Iprops {
  equipament: string;
  category: string;
  currentTemperature: string;
  unitOfMeasurenment: string;
  lastTempCheck: string;
}

interface IArr {
  temperatura: number;
  degelo: boolean;
  setpoint: any;
  temperatura_erro: any;
  data_hora: string;
}

export default function GraphicCards({
  equipament,
  category,
  currentTemperature,
  unitOfMeasurenment,
  lastTempCheck,
}: Iprops) {
  const [graphicTemps, setGraphicTemps] = React.useState([]);

  const getLastDayTemps = async () => {
    const data: any = await getLastDayInfos(
      "1790|fiwdSKpyujL7Str9WNyxhXpa3c7hwHuWWVHzIRoQ",
      "2475",
      "temp_saida"
    );
    const filtredData: any = formateDateTime(data);
    setGraphicTemps(filtredData);
  };

  const formateDateTime = (arr: []) => {
    const newArr = arr.map((item: IArr) => {
      return {
        ...item,
        data_hora: new Intl.DateTimeFormat("pt-BR", {
          timeStyle: "short",
        }).format(new Date(item.data_hora)),
      };
    });
    return newArr;
  };

  useEffect(() => {
    getLastDayTemps();
  }, []);

  return (
    <div className="max-w-fit min-h-fit bg-white p-3 mb-16 overflow-auto ">
      <div className="mb-6 ml-8 flex flex-col">
        <h3 className="text-2xl ">{equipament}</h3>
        <span>{category}</span>

        <span>
          Temperatura atual: {currentTemperature}
          {unitOfMeasurenment}
        </span>

        <span>
          Última checagem de temperata:{" "}
          {new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(lastTempCheck))}
        </span>
      </div>
      <LineChart width={1200} height={200} data={graphicTemps}>
        <Line type="monotone" dataKey="temperatura" stroke="#f69b44" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="data_hora" />
        <YAxis />
      </LineChart>
    </div>
  );
}