import React, { useEffect, useState } from "react";

import { Table, Alert } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";

import { getAllPriceList } from "../services/prices";

import MainLayout from "../layout/Layout";

interface IDataType {
  key: React.Key;
  cidade: string;
  combustivel: string;
  preco: string;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const [priceList, setPriceList] = useState([]);

  const getList = async () => {
    const res = await getAllPriceList(
      "1790|fiwdSKpyujL7Str9WNyxhXpa3c7hwHuWWVHzIRoQ"
    );
    setPriceList(res);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: IDataType) => ({
      disabled: record.cidade === "Disabled User", // Column configuration not to be checked
      name: record.cidade,
      key: record.key,
    }),
  };

  const columns: ColumnsType<IDataType> = [
    {
      title: "Cidade",
      dataIndex: "cidade",

      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Combustível",
      dataIndex: "combustivel",
    },

    {
      title: "Preço",
      dataIndex: "preco",
    },
    {
      title: "Ações",
      render: (text: string, record: IDataType) => (
        <div>
          <button>Editar</button>
          <button>Deletar</button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getList();
  }, []);

  return (
    <MainLayout>
      <div className="w-full h-full overflow-hidden">
        <div>
          <Alert message="Preços atualizados" type="success" showIcon />
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={priceList}
          />
          <button
            className="w-fit h-fit bg-[#f69b44] mt-4 ml-4
          flex items-center justify-center p-2 gap-2 rounded-md text-white font-black"
          >
            <PlusOutlined /> Adicionar novo preço
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
