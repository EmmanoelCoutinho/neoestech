import React, { useContext } from "react";
import { Modal } from "antd";

import { NewPriceModalContext } from "../contexts/newPriceModalContext";

interface IProps {
  title: string;
  children: React.ReactNode;
  footerItems?: React.ReactNode[] | null;
}

export default function App({ title, children, footerItems = null }: IProps) {
  const { newPriceModalState, setNewModalPriceState } =
    useContext(NewPriceModalContext);

  const handleOk = () => {
    setNewModalPriceState(false);
  };

  const handleCancel = () => {
    setNewModalPriceState(false);
  };

  return (
    <>
      <Modal
        open={newPriceModalState}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={footerItems}
      >
        <div className="w-full h-full">{children}</div>
      </Modal>
    </>
  );
}
