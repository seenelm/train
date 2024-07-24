import { io, Socket } from "socket.io-client";
import { CreateConversation, MessageRequest } from "../model/request/chatClientRequest";
import { CreateConversationResponse, MessageResponse } from "../model/response/chatClientResponse";
import { ObjectId } from "mongodb";
import { socketUrl } from "../../../common/config";

// class ChatClient {
//     private socket: Socket;
//     private static instance: ChatClient;

//     private setConnected = () => {};

//     private constructor(uri: string) {
//         this.socket = io(uri);
//     }

//     public static getInstance(uri: string): ChatClient {
//         if (!ChatClient.instance) {
//             ChatClient.instance = new ChatClient(uri);
//         }
//         return ChatClient.instance;
//     }

//     public createSocketConnection(user_id: ObjectId) {
//         this.socket.emit("join", user_id);
//     }

//     public handleJoinConversation(conversation_id: ObjectId) {
//         this.socket.emit("join-chat", conversation_id);
//     }

//     public waitForConnection(): Promise<void> {
//         return new Promise((resolve, reject) => {
//             this.socket.on("connect", () => {
//                 console.log("Connected to server");
//                 resolve();
//             });

//             this.socket.on("connect_error", (error: Error) => {
//                 console.error("Failed to connect to server: ", error);
//                 reject(error);
//             });
//         });
//     }

//     public createConversation(createConversationRequest: CreateConversation) {
//         this.socket.emit("create-chat", createConversationRequest);
//     }

//     public handleCreateConversation(): Promise<CreateConversationResponse> {
//         return new Promise((resolve, reject) => {
//             this.socket.on("create-chat-response", (response: CreateConversationResponse) => {
//                 console.log("Received create-conversation-response: ", response);
//                 resolve(response);
//             });

//             this.socket.on("error", (error: any) => {
//                 console.error("Error: ", error);
//                 reject(error);
//             });
//         });
//     }

//     public sendMessage(message: MessageRequest) {
//         this.socket.emit("new-message", message);
//     }

//     public handleMessage(): Promise<MessageResponse> {
//         return new Promise((resolve, reject) => {
//             this.socket.on("chat-message", (response: MessageResponse) => {
//                 console.log("Received message-response: ", response);
//                 resolve(response);
//             });
//         });
//     }
    

//     public disconnect() {
//         this.socket.disconnect();
//     }
// }

// export default ChatClient;

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