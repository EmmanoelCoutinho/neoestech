import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { Form, Input } from "antd";
import { NextPage } from "next";
import Image from "next/image";

import { UserLogin } from "../services/user";

import { UserContext } from "../contexts/userContext";

const Home: NextPage = () => {
  const { setUserData } = useContext(UserContext);
  const Router = useRouter();

  const [err, setErr] = useState("");

  const onFinish = async (values: any) => {
    const user: any = await UserLogin(values.username, values.password);
    if ((await user) != undefined) {
      setUserData(user);
      Router.push("/map");
    }
    setErr("Senha ou usuário incorretos");
    console.log(user);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#f69b44]">
      <div className="bg-white w-11/12 max-w-lg flex flex-col p-5">
        <div className="w-full flex justify-center">
          <Image src="/logo.png" width={188} height={133} />
        </div>
        <div>
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 32 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="flex flex-col items-center w-full"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Por favor, Informe um login!" },
              ]}
              className="w-full mt-5"
            >
              <Input className="w-full mb-4" placeholder="Login" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Por favor, Informe uma senha!" },
              ]}
              className="w-full"
            >
              <Input.Password className="w-full mb-4" placeholder="Senha" />
            </Form.Item>
            {err ?? <span className="text-white">{err}</span>}
            <button
              type="submit"
              className=" mb-5 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-5"
            >
              ENTRAR
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Home;
