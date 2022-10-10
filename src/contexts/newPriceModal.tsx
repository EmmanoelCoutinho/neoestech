import { createContext, ReactNode, useState, useEffect } from "react";

interface IModalProps {
  children: ReactNode;
}

interface IModalContext {
  newPriceModalState: boolean;
  setNewModalPriceState: (value: boolean) => void;
}

export const NewPriceModalContext = createContext({} as IModalContext);

export function NewPriceModalProvider({ children }: IModalProps) {
  const [newPriceModalState, setNewModalPriceState] = useState(false);

  return (
    <NewPriceModalContext.Provider
      value={{ newPriceModalState, setNewModalPriceState }}
    >
      {children}
    </NewPriceModalContext.Provider>
  );
}
