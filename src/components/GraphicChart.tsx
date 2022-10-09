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
    setGraphicTemps(data);
  };

  useEffect(() => {
    getLastDayTemps();
  }, []);

  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 4567, amt: 2400 },
    { name: "Page C", uv: 300, pv: 1398, amt: 2400 },
    { name: "Page D", uv: 200, pv: 9800, amt: 2400 },
    { name: "Page E", uv: 278, pv: 3908, amt: 2400 },
    { name: "Page F", uv: 189, pv: 4800, amt: 2400 },
  ];

  return (
    <div className="max-w-fit min-h-fit bg-white p-3 mb-16">
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
      <LineChart width={600} height={200} data={data}>
        <Line type="monotone" dataKey="pv" stroke="#f69b44" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  );
}
