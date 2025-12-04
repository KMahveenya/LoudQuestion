import { createContext, useCallback, useContext, useEffect, useState } from "react";
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

    roomId: string | null;
    roomUsers: Object;
    roomOwner: string | null;
    asker: string | null;
    reader: string | null;
    gameReady: boolean;
    question: string | null;
    answer: string | null;
    gameStart: boolean;
    gameEnd: boolean;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children } : SocketProviderProps) => {
    const [socket, setSocket] = useState<any>();
    const [isConnected, setIsConnected] = useState(false);
    const [clientId, setClientId] = useState<string | null>(null);

    const [rooms, setRooms] = useState({});

    const [roomId, setRoomId] = useState(null);
    const [roomUsers, setRoomUsers] = useState({});
    const [roomOwner, setRoomOwner] = useState<string | null>(null);

    const [asker, setAsker] = useState<string | null>(null);
    const [reader, setReader] = useState<string | null>(null);
    const [gameReady, setGameReady] = useState(false);
    const [question, setQuestion] = useState<string | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);
    const [gameStart, setGameStart] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);

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
            setRoomId(null);
            setGameReady(false);
            setAsker(null);
            setReader(null);
            setQuestion(null);
            setAnswer(null);
            setGameStart(false);
        });

        newSocket.on('reconnect', () => {
            setIsConnected(true);

            newSocket.emit('getRooms');
        });

        newSocket.on('roomUsers', (roomId, roomUsers) => {
            setRoomUsers(roomUsers);
            setRoomId(roomId);
        });

        newSocket.on('roomsList', (rooms: Object) => {
            setRooms(rooms);
        });

        newSocket.on('roomOwner', (owner: string) => {
            setRoomOwner(owner);
        });

        newSocket.on('roles', (asker: string, reader: string) => {
            setAsker(asker);
            setReader(reader);
        });

        newSocket.on('gameReady', () => {
            setGameReady(true);
        });

        newSocket.on('question', (question: string) => {
            setQuestion(question);
        });

        newSocket.on('answer', (answer: string) => {
            setAnswer(answer);
        });

        newSocket.on('gameStart', () => {
            setGameReady(false);
            setGameStart(true);
        });

        newSocket.on('gameEnd', () => {
            setGameStart(false);
            setGameEnd(true);
        });

        newSocket.on('clearInfo', () => {
            clearInfo();
        });

        return () => {
            newSocket.disconnect();
            setSocket(null);
            setIsConnected(false);
            setClientId(null);
        }
    }, []);

    const sendMessage = useCallback((event: string, data?: any) => {
        if (socket && isConnected) {
            socket.emit(event, data);
        }
    }, [isConnected]);

    const clearInfo = () => {
        setAsker(null);
        setReader(null);
        setGameReady(false);
        setGameStart(false);
        setGameEnd(false);
        setQuestion(null);
        setAnswer(null);
    }

    const value = {
        socket,
        isConnected,
        clientId,
        sendMessage, 

        rooms,

        roomId,
        roomUsers,
        roomOwner,
        asker,
        reader,
        gameReady,
        question,
        answer,
        gameStart,
        gameEnd,
    };

    return (
        <SocketContext value={value}>
            {children}
        </SocketContext>
    );
};

