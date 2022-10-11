import { createContext, ReactNode, useState } from "react";

interface IModalProps {
  children: ReactNode;
}

interface IModalContext {
  updatePriceModalState: boolean;
  setUpdateModalPriceState: (value: boolean) => void;
}

export const UpdatePriceModalContext = createContext({} as IModalContext);

export function UpdatePriceModalProvider({ children }: IModalProps) {
  const [updatePriceModalState, setUpdateModalPriceState] = useState(false);

  return (
    <UpdatePriceModalContext.Provider
      value={{ updatePriceModalState, setUpdateModalPriceState }}
    >
      {children}
    </UpdatePriceModalContext.Provider>
  );
}
