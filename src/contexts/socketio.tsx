import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";

export type User = {
    id: string;
    socketId: string;
    name: string;
    avatar: string;
    color: string;
    isOnline: string;
    posX: number;
    posY: number;
    location: string;
    flag: string;
    lastSeen: string;
    createdAt: string;
};
export type Message = {
    id: string;
    sessionId: string;
    flag: string;
    country: string;
    username: string;
    avatar: string;
    color?: string;
    content: string;
    createdAt: string | Date;
};

type SocketContextType = {
    socket: Socket | null;
    users: User[];
    setUsers: Dispatch<SetStateAction<User[]>>;
    msgs: Message[];
    isCurrentUser: boolean;
};

const INITIAL_STATE: SocketContextType = {
    socket: null,
    users: [],
    setUsers: () => { },
    msgs: [],
    isCurrentUser: false,
};

export const SocketContext = createContext<SocketContextType>(INITIAL_STATE);

const SESSION_ID_KEY = "portfolio-site-session-id";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [msgs, setMsgs] = useState<Message[]>([]);
    const [isCurrentUser] = useState(false);
    const { toast } = useToast();

    // SETUP SOCKET.IO
    useEffect(() => {
        // Vite: use import.meta.env.VITE_WS_URL instead of process.env.NEXT_PUBLIC_WS_URL
        const wsUrl = import.meta.env.VITE_WS_URL;
        if (!wsUrl) return;

        let storedSessionId = null;
        try {
            storedSessionId = localStorage.getItem(SESSION_ID_KEY);
        } catch (e) {
            console.warn("Failed to get session ID from localStorage:", e);
        }

        const socket = io(wsUrl, {
            auth: {
                sessionId: storedSessionId, // send on reconnect to restore session
            },
        });
        setSocket(socket);
        socket.on("connect", () => { });
        socket.on("msgs-receive-init", (msgs) => {
            setMsgs(msgs);
        });
        socket.on("session", ({ sessionId }) => {
            try {
                localStorage.setItem(SESSION_ID_KEY, sessionId);
            } catch (e) {
                console.warn("Failed to save session ID to localStorage:", e);
            }
        });

        socket.on("msg-receive", (msgs) => {
            setMsgs((p) => [...p, msgs]);
        });

        socket.on("warning", (data: { message: string }) => {
            console.log(data);
            toast({
                variant: "destructive",
                title: "System Warning",
                description: data.message,
            });
        });

        socket.on("msg-delete", (data: { id: number }) => {
            console.log(data);
            setMsgs((prev) => prev.filter((m) => Number(m.id) !== data.id));
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket: socket, users, setUsers, msgs, isCurrentUser }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
