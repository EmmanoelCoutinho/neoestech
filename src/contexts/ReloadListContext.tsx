import { createContext, ReactNode, useState } from "react";

interface IReloadProps {
  children: ReactNode;
}

interface IReloadContext {
  reload: boolean;
  setReload: (value: boolean) => void;
}

export const ReloadListContext = createContext({} as IReloadContext);

export function ReloadListProvider({ children }: IReloadProps) {
  const [reload, setReload] = useState(false);

  return (
    <ReloadListContext.Provider
      value={{
        reload,
        setReload,
      }}
    >
      {children}
    </ReloadListContext.Provider>
  );
}
