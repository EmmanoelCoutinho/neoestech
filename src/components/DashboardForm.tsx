import React, { useState } from "react";
import { useRouter } from "next/router";
import { Alert, Form, Input, Select } from "antd";

import { createNewPrice } from "../services/prices";

interface iDataProps {
  cidade: string;
  combustivel: string;
  preco: string;
}

interface iLog {
  status: string;
  message: any;
}

const DashboardForm: React.FC = () => {
  const router = useRouter();

  const [log, setLog] = useState({} as iLog);
  const [showAlert, setShowAlert] = useState(false);

  const onFinish = (values: iDataProps) => {
    sendNewPrice(values);
    setTimeout(() => router.reload(), 3000);
  };

  const onFinishFailed = (errorInfo: any) => {
    return errorInfo;
  };

  const sendNewPrice = async (data: iDataProps) => {
    const status: any = await createNewPrice(
      "1790|fiwdSKpyujL7Str9WNyxhXpa3c7hwHuWWVHzIRoQ",
      {
        cidade: data.cidade,
        combustivel: data.combustivel,
        preco: parseFloat(data.preco),
      }
    );
    setLog(status);
    setShowAlert(true);
    return status;
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 32 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full max-w-[520px] h-full flex flex-col items-end"
      >
        <Form.Item
          label=""
          name="cidade"
          rules={[{ required: true, message: "Por favor insira uma cidade!" }]}
          className="w-full"
        >
          <Input placeholder="Cidade" />
        </Form.Item>
        <Form.Item
          label=""
          name="combustivel"
          rules={[
            { required: true, message: "Por favor insira um combustível!" },
          ]}
          className="w-full mt-1"
        >
          <Select placeholder="Combustível">
            <Select.Option value="GASOLINA">GASOLINA</Select.Option>
            <Select.Option value="ETANOL">ETANOL</Select.Option>
            <Select.Option value="DIESEL">DIESEL</Select.Option>
            <Select.Option value="GNV">GNV</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label=""
          name="preco"
          rules={[{ required: true, message: "Por favor insira um username!" }]}
          className="w-full mt-1"
        >
          <Input placeholder="Preço Ex: 5.78" />
        </Form.Item>
        <button className="w-fit h-fit border border-[#f69b44] p-2 text-[#f69b44] font-black hover:bg-[#f69b44] hover:text-white hover:border-white ">
          Cadastrar novo preço
        </button>
      </Form>
      {showAlert && (
        <Alert
          message={log.message}
          type={log.status == "success" ? "success" : "error"}
          showIcon
        />
      )}
    </>
  );
};

export default DashboardForm;
