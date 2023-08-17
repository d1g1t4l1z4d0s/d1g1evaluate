import { PropsWithChildren, createContext, useState } from "react"
import { IStatus, StatusParams } from "../types/context-params"

const initialStatus: IStatus = {
    activeMessage: false,
    message: '',
    kind: 'success'
}

export const StatusContext = createContext<StatusParams | null>(
    {
        status: initialStatus,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setStatus: () => { },
    }
)

export const StatusContextProvider = ({ children }: PropsWithChildren) => {
    const [status, setStatus] = useState<IStatus>(initialStatus)
    return (
        <StatusContext.Provider value={{ status, setStatus }}>
            {children}
        </ StatusContext.Provider >
    )
}