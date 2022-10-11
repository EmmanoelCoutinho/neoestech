import { IDataType } from "../@types/dashboardTableDataType";
import type { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<IDataType> = [
  {
    title: "Cidade",
    dataIndex: "cidade",

    render: (text: string) => <span>{text}</span>,
  },
  {
    title: "Combustível",
    dataIndex: "combustivel",
  },

  {
    title: "Preço",
    dataIndex: "preco",
    render: (text: string) => <span>R$ {text}</span>,
  },
];
