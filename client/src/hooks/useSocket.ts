import { useContext } from "react"
import { SocketContext } from "../contexts/SocketContext"

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('SocketContext is undefined')
    }
    return context;
}