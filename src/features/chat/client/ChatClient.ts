import { io, Socket } from "socket.io-client";
import { CreateConversation, MessageRequest } from "../model/request/chatClientRequest";
import { CreateConversationResponse, MessageResponse } from "../model/response/chatClientResponse";
import { ObjectId } from "mongodb";
import { socketUrl } from "../../../common/config";


export const socketClient = io(socketUrl);

export const createSocketConnection = (user_id: ObjectId) => {
    socketClient.emit("join", user_id);
}

export const handleJoinConversation = (conversation_id: ObjectId) => {
    socketClient.emit("join-chat", conversation_id);
}

export const createConversation = (createConversationRequest: CreateConversation) => {
    socketClient.emit("create-chat", createConversationRequest);
}

export const handleCreateConversation = (): Promise<CreateConversationResponse> => {
    return new Promise((resolve, reject) => {
        socketClient.on("create-chat-response", (response: CreateConversationResponse) => {
            console.log("Received create-conversation-response: ", response);
            resolve(response);
        });
    });
}

export const sendMessage = (message: MessageRequest) => {
    socketClient.emit("new-message", message);
}

export const handleMessage = (): Promise<MessageResponse> => {
    return new Promise((resolve, reject) => {
        socketClient.on("chat-message", (response: MessageResponse) => {
            console.log("Received message-response: ", response);
            resolve(response);
        });
    });
}


export const disconnect = () => {
    socketClient.disconnect();
}