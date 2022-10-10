import { createContext, ReactNode, useState, useEffect } from "react";

interface IModalProps {
  children: ReactNode;
}

interface IModalContext {
  newPriceModalState: boolean;
  setNewModalPriceState: (value: boolean) => void;
  log: string;
  setLog: (value: string) => void;
}

export const NewPriceModalContext = createContext({} as IModalContext);

export function NewPriceModalProvider({ children }: IModalProps) {
  const [newPriceModalState, setNewModalPriceState] = useState(false);
  const [log, setLog] = useState("");

  console.log(log);

  return (
    <NewPriceModalContext.Provider
      value={{ newPriceModalState, setNewModalPriceState, log, setLog }}
    >
      {children}
    </NewPriceModalContext.Provider>
  );
}
