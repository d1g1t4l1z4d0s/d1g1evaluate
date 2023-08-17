import { useContext } from "react";
import { StatusContext } from "../context/status-context";

export const useStatusContext = () => {
    const context = useContext(StatusContext);
    if (!context) throw new Error('useStatusContext must be used inside an StatusContextProvider');
    return context;
}