import React, { useEffect, useContext } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { UserContext } from "../contexts/userContext";
import { getLastDayInfos } from "../services/monitoring";

interface Iprops {
  equipament: string;
  category: string;
  currentTemperature: string;
  unitOfMeasurenment: string;
  lastTempCheck: string;
  equipId: number;
  equipKey: string;
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
  equipId,
  equipKey,
}: Iprops) {
  const { userData } = useContext(UserContext);

  const [graphicTemps, setGraphicTemps] = React.useState([]);

  const getLastDayTemps = async () => {
    const data: any = await getLastDayInfos(
      `${userData.token}`,
      `${equipId}`,
      `${equipKey}`
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
      {/* <div className="mb-6 ml-11 flex flex-col">
        <h3 className="text-2xl text-bold ">{equipament}</h3>
        <span>{category}</span>

        <span>
          Temperatura atual:{" "}
          <strong className="text-blue-500">
            {currentTemperature}
            {unitOfMeasurenment}
          </strong>
        </span>

        <span>
          Última checagem de temperata:{" "}
          {new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(lastTempCheck))}
        </span>
      </div> */}
      <LineChart width={1200} height={200} data={graphicTemps}>
        <Line type="monotone" dataKey="temperatura" stroke="#f69b44" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="data_hora" />
        <YAxis />
      </LineChart>
    </div>
  );
}
