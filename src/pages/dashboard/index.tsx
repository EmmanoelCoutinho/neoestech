import React, { useEffect, useState, useContext } from "react";
import { IDataType } from "../../@types/dashboardTableDataType";

import { Table } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SendOutlined,
} from "@ant-design/icons";

import { DeletePrice, getAllPriceList } from "../../services/prices";

import Modal from "../../components/Modal";
import DashboardForm from "./components/DashboardForm";

import { NewPriceModalContext } from "../../contexts/newPriceModalContext";

import { columns } from "../../utils/dashboardTableConfig";

import MainLayout from "../../layout/Layout";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/userContext";

export default function Dashboard() {
  const router = useRouter();
  const { newPriceModalState, setNewModalPriceState, setEditOrCreate } =
    useContext(NewPriceModalContext);
  const { userData } = useContext(UserContext);

  const [priceList, setPriceList] = useState<IDataType[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const getList = async () => {
    const res = await getAllPriceList(`${userData.token}`);
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
      deletePrice(`${userData.token}`, item.id);
    });
  };

  const handleSearch = () => {
    const filteredData = priceList.filter((item: any) => {
      return item.cidade.toLowerCase().includes(searchText.toLowerCase());
    });
    console.log(filteredData);
    setPriceList(filteredData);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <MainLayout>
      <div className="w-screen h-full ">
        <div className="w-full h-fit flex justify-center items-center">
          <input
            type="text"
            className="w-20 h-fit border border-[#f69b44] my-4 mr-4
          flex items-center justify-center p-2 gap-2 rounded-md font-black"
            placeholder="Buscar por cidades"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="w-fit h-fit bg-green-500 my-4 mr-4
          flex items-center justify-center p-2 gap-2 rounded-md text-white font-black"
            onClick={handleSearch}
          >
            <SendOutlined />
          </button>
          <button
            className="w-fit h-fit bg-violet-500 my-4 mr-4
          flex items-center justify-center p-2 gap-2 rounded-md text-white font-black"
            onClick={getList}
          >
            <ReloadOutlined />
          </button>

          <button
            onClick={() => {
              setNewModalPriceState(true);
              setEditOrCreate("create");
            }}
            className="w-fit h-fit bg-[#f69b44] my-4 mr-4
          flex items-center justify-center p-2 gap-2 rounded-md text-white font-black"
          >
            <PlusOutlined />
          </button>
          <button
            onClick={() => {
              setNewModalPriceState(true);
              setEditOrCreate("edit");
            }}
            className="w-fit h-fit bg-blue-500 my-4 mr-4
          flex items-center justify-center p-2 gap-2 rounded-md text-white font-black"
          >
            <EditOutlined />
          </button>

          <button
            onClick={() => deletingSelecteds(selectedRows)}
            className="w-fit h-fit bg-red-500 my-4 mr-4
          flex items-center justify-center p-2 gap-2 rounded-md text-white font-black"
          >
            <DeleteOutlined />
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
            pagination={false}
          />
        </div>
      </div>
      {newPriceModalState && (
        <Modal
          title="Informe o novo preço"
          open={newPriceModalState}
          setOpen={setNewModalPriceState}
        >
          <DashboardForm selectedRows={selectedRows} />
        </Modal>
      )}
    </MainLayout>
  );
}
