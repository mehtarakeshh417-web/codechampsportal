import { createContext, useContext, ReactNode } from "react";

const DataContext = createContext<any>({});

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};
