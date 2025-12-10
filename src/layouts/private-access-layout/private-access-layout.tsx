import { createContext } from "react";
import { Outlet } from "react-router-dom";
import usePrivateAccessLayoutLogic from "./hooks/use-private-access-layout-logic";

export const PrivateAccessLayoutContext = createContext(
  {} as ReturnType<typeof usePrivateAccessLayoutLogic>
);

export default function PrivateAccessLayout() {

    const contextValue = usePrivateAccessLayoutLogic()

    return (
        <PrivateAccessLayoutContext.Provider value={contextValue}>
            <Outlet/>
        </PrivateAccessLayoutContext.Provider>
    )
}