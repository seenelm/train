import { ObjectId } from "mongodb";

export interface ConversationResponse {
    id: ObjectId;
    name: string;
    owner_id: ObjectId;
    members: ObjectId[];
    created_at: Date;
    updated_at: Date;
}

export interface ConversationListResponse {
    conversations: ConversationResponse[];
}