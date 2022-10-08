import "leaflet/dist/leaflet.css";

import { useEffect, useState, useContext } from "react";

import { UserContext } from "../contexts/userContext";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { getQuaters } from "../services/monitoring";
import { text } from "stream/consumers";

const Map = () => {
  const { userData } = useContext(UserContext);

  const [quater, setQuater] = useState([]);

  const getQuaterData = async () => {
    const data: any = await getQuaters(
      "1790|fiwdSKpyujL7Str9WNyxhXpa3c7hwHuWWVHzIRoQ"
    );
    setQuater(data);
  };

  useEffect(() => {
    getQuaterData();
  }, []);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {quater.map(
        (item: any) =>
          item.cliente.nome == "CSD VAREJO" && (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>
                <div className="flex flex-col">
                  <span className="font-semibold text-[#f69b44]">
                    {item.prefixo}
                  </span>
                  <strong
                    className={
                      item.status_internet == "Online"
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  >
                    {item.status_internet}
                  </strong>
                  <span>
                    {item.cidade} / {item.estado}
                  </span>
                  <span>
                    <strong>lat:</strong> {item.latitude} <strong>long:</strong>{" "}
                    {item.longitude}
                  </span>
                </div>
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default Map;
