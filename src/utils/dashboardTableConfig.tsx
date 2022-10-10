import { IDataType } from "../@types/dashboardTableDataType";
import type { ColumnsType } from "antd/es/table";

export const rowSelection = {
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
    render: (text: string, record: IDataType) => (
      <div>
        <button>Editar</button>
        <button>Deletar</button>
      </div>
    ),
  },
];
