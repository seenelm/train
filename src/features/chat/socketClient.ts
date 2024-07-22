import { useEffect } from "react";
import { io } from "socket.io-client";
import { CreateConversation } from "./types";
import { socketUrl } from "../../common/config";

export const socket = io(socketUrl);
export const useSocket = () => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket server');


        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        // Clean up the socket connection when the component using this hook unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    return socket;
};

export const createConversation = (createConversation: CreateConversation) => {
    socket.emit("create-chat", createConversation, (response: any) => {
        console.log("Response", response);
    });
};