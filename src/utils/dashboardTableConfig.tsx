import { IDataType } from "../@types/dashboardTableDataType";
import type { ColumnsType } from "antd/es/table";

import { DeleteOnePrice } from "../services/prices";

export const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: IDataType) => ({
    name: record.cidade,
  }),
};

export const columns: ColumnsType<IDataType> = [
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
    render: (record: IDataType) => (
      <div className="flex justify-end gap-2">
        <button className="w-fit h-fit bg-blue-500 p-2 rounded-md text-white font-black">
          Editar
        </button>
        <button
          onClick={() =>
            DeleteOnePrice(
              "1790|fiwdSKpyujL7Str9WNyxhXpa3c7hwHuWWVHzIRoQ",
              record.id
            )
          }
          className="w-fit h-fit bg-red-500 p-2 rounded-md  text-white font-black"
        >
          Deletar
        </button>
      </div>
    ),
  },
];
