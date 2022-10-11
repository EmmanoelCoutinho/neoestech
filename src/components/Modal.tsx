import React from "react";
import { Modal } from "antd";

interface IProps {
  title: string;
  children: React.ReactNode;
  footerItems?: React.ReactNode[] | null;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function ({
  title,
  children,
  footerItems = null,
  open,
  setOpen,
}: IProps) {
  const handleOk = () => {
    setOpen(!open);
  };

  const handleCancel = () => {
    setOpen(!open);
  };

  return (
    <>
      <Modal
        open={open}
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
