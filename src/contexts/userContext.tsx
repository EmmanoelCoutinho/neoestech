import { createContext, ReactNode, useState, useEffect } from "react";

import IUser from "../@types/userType";

interface IUserProps {
  children: ReactNode;
}

interface IUserContext {
  userData: {};
  setUserData: (value: Promise<IUser>) => void;
}

export const UserContext = createContext({} as IUserContext);

export function UserProvider({ children }: IUserProps) {
  const [userData, setUserData] = useState({});

  // console.log(userData);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
