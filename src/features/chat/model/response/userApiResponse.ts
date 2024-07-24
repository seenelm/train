import { ObjectId } from "mongodb";

export interface UserRegisterResponse {
    userId: ObjectId;
    token: string | void;
    username: string;
    name: string;
}


export interface UserLoginResponse {
    userId: ObjectId;
    token: string | void;
    username: string;
    name: string;
}