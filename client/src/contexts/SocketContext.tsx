import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';

interface SocketProviderProps {
    children: React.ReactNode;
}

interface SocketContextType {
    clientId: string | null;
    isConnected: boolean;
    socket: any;
    sendMessage: (event: string, data?: any) => void;

    rooms: Object;
    roomUsers: Object;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children } : SocketProviderProps) => {
    const [socket, setSocket] = useState<any>();
    const [isConnected, setIsConnected] = useState(false);
    const [clientId, setClientId] = useState<string | null>(null);

    const [rooms, setRooms] = useState({});

    const [roomUsers, setRoomUsers] = useState({});

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

            newSocket.emit('getRooms');
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
            setClientId(null);
        });

        newSocket.on('reconnect', () => {
            setIsConnected(true);

            newSocket.emit('getRooms');
        });

        newSocket.on('roomUsers', (roomUsers) => {
            setRoomUsers(roomUsers);
        });

        newSocket.on('roomsList', (rooms: Object) => {
            setRooms(rooms);
        });

        return () => {
            newSocket.disconnect();
            setSocket(null);
            setIsConnected(false);
            setClientId(null);
        }
    }, []);

    function sendMessage(event: string, data?: any) {
        if (socket && isConnected) {
            socket.emit(event, data);
        }
    }

    const value = {
        socket,
        isConnected,
        clientId,
        sendMessage, 

        rooms,
        roomUsers,
    };

    return (
        <SocketContext value={value}>
            {children}
        </SocketContext>
    );
};

