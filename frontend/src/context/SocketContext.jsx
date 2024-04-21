import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {

    const [socket, setsocket] = useState(null)
    const [onlineUser, setonlineUser] = useState([])

    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io('http://localhost:8000', {
                query: {
                    userId: authUser.data.user._id
                }
            })
            setsocket(socket)

            socket.on("connect", () => {
                console.log("Socket connected");
            });

            socket.on("getOnlineUsers", (users) => {
                console.log("Online users received:", users);
                setonlineUser(users)
            });

            socket.on("disconnect", () => {
                console.log("Socket disconnected");
            });

            return () => {
                console.log("Socket cleanup");
                socket.close()
            }
        } else {
            if (socket) {
                socket.close()
                setsocket(null)
            }
        }
    }, [authUser])

    return (
        <SocketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketContext.Provider>
    )
}
