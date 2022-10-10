import React, { useEffect, useState, useContext } from "react";
import { IDataType } from "../@types/dashboardTableDataType";

import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { getAllPriceList } from "../services/prices";

import Modal from "../components/Modal";
import DashboardForm from "../components/DashboardForm";

import { NewPriceModalContext } from "../contexts/newPriceModalContext";

import { rowSelection, columns } from "../utils/dashboardTableConfig";

import MainLayout from "../layout/Layout";

export default function Dashboard() {
  const { newPriceModalState, setNewModalPriceState } =
    useContext(NewPriceModalContext);

  const [priceList, setPriceList] = useState<IDataType[]>([]);

  const getList = async () => {
    const res = await getAllPriceList(
      "1790|fiwdSKpyujL7Str9WNyxhXpa3c7hwHuWWVHzIRoQ"
    );
    setPriceList(res);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <MainLayout>
      <div className="w-full h-full overflow-hidden">
        <div>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={priceList}
          />
          <button
            onClick={() => setNewModalPriceState(true)}
            className="w-fit h-fit bg-[#f69b44] mt-4 ml-4
          flex items-center justify-center p-2 gap-2 rounded-md text-white font-black"
          >
            <PlusOutlined /> Adicionar novo preço
          </button>
        </div>
      </div>
      {newPriceModalState && (
        <Modal title="Informe o novo preço" children={<DashboardForm />} />
      )}
    </MainLayout>
  );
}
