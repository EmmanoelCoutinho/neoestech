import React, { useEffect, useState, useContext } from "react";
import { IDataType } from "../../@types/dashboardTableDataType";

import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { DeletePrice, getAllPriceList } from "../../services/prices";

import Modal from "../../components/Modal";
import DashboardForm from "./components/DashboardForm";

import { NewPriceModalContext } from "../../contexts/modalsContexts/newPriceModalContext";

import { columns } from "../../utils/dashboardTableConfig";

import MainLayout from "../../layout/Layout";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const { newPriceModalState, setNewModalPriceState, setEditOrCreate } =
    useContext(NewPriceModalContext);

  const [priceList, setPriceList] = useState<IDataType[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const getList = async () => {
    const res = await getAllPriceList(
      "1790|fiwdSKpyujL7Str9WNyxhXpa3c7hwHuWWVHzIRoQ"
    );
    const addingKey = res.map((item: any, index: any) => {
      return { ...item, key: `${++index}` };
    });
    setPriceList(addingKey);
  };

  const deletePrice = async (token: string, id: number) => {
    const status: any = await DeletePrice(token, id);
    if (status === "success") {
      router.reload();
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any[], selectedRows: IDataType[]) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.cidade === "Disabled User",
      cidade: record.cidade,
    }),
  };

  const deletingSelecteds = (arr: any[]) => {
    arr.map((item: any) => {
      deletePrice("1790|fiwdSKpyujL7Str9WNyxhXpa3c7hwHuWWVHzIRoQ", item.id);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <MainLayout>
      <div className="w-full h-full overflow-hidden">
        <div className="w-full h-fit flex justify-center">
          <button
            onClick={() => {
              setNewModalPriceState(true);
              setEditOrCreate("create");
            }}
            className="w-fit h-fit bg-[#f69b44] my-4 mr-4
          flex items-center justify-center p-2 gap-2 rounded-md text-white font-black"
          >
            <PlusOutlined /> Adicionar novo preço
          </button>
          <button
            onClick={() => {
              setNewModalPriceState(true);
              setEditOrCreate("edit");
            }}
            className="w-fit h-fit bg-blue-500 my-4 mr-4
          flex items-center justify-center p-2 gap-2 rounded-md text-white font-black"
          >
            <PlusOutlined /> Editar preços selecionados
          </button>

          <button
            onClick={() => deletingSelecteds(selectedRows)}
            className="w-fit h-fit bg-red-500 my-4 mr-4
          flex items-center justify-center p-2 gap-2 rounded-md text-white font-black"
          >
            <PlusOutlined /> Deletar preços selecionados
          </button>
        </div>
        <div>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={priceList}
          />
        </div>
      </div>
      {newPriceModalState && (
        <Modal
          title="Informe o novo preço"
          children={<DashboardForm selectedRows={selectedRows} />}
          open={newPriceModalState}
          setOpen={setNewModalPriceState}
        />
      )}
    </MainLayout>
  );
}
