import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';

interface SocketProviderProps {
    children: React.ReactNode;
}

interface SocketContextType {
    clientId: string | null;
    isConnected: boolean;
    socket: any;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children } : SocketProviderProps) => {
    const [socket, setSocket] = useState<any>();
    const [isConnected, setIsConnected] = useState(false);
    const [clientId, setClientId] = useState<string | null>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
        })

        setSocket(newSocket);

        newSocket.on('connect', () => {
            setIsConnected(true);
            setClientId(newSocket.id || null);
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
            setClientId(null);
        });

        newSocket.on('reconnect', () => {
            setIsConnected(true);
        });

        return () => {
            newSocket.disconnect();
            setSocket(null);
            setIsConnected(false);
            setClientId(null);
        }
    }, []);

    const value = {
        socket,
        isConnected,
        clientId,
    };

    return (
        <SocketContext value={value}>
            {children}
        </SocketContext>
    );
};

