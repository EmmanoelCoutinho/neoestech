import { createContext, ReactNode, useState } from "react";

interface IModalProps {
  children: ReactNode;
}

interface IModalContext {
  newPriceModalState: boolean;
  setNewModalPriceState: (value: boolean) => void;
  editOrCreate: string;
  setEditOrCreate: (value: string) => void;
}

export const NewPriceModalContext = createContext({} as IModalContext);

export function NewPriceModalProvider({ children }: IModalProps) {
  const [newPriceModalState, setNewModalPriceState] = useState(false);
  const [editOrCreate, setEditOrCreate] = useState("create");

  return (
    <NewPriceModalContext.Provider
      value={{
        newPriceModalState,
        setNewModalPriceState,
        editOrCreate,
        setEditOrCreate,
      }}
    >
      {children}
    </NewPriceModalContext.Provider>
  );
}
