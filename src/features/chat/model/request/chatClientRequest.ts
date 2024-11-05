import { ObjectId } from 'mongodb';

export interface User {
  id: ObjectId;
  name: string;
}

export interface ConversationRequest {
  name?: string;
  owner_id: ObjectId;
  members: User[];
  created_at: Date;
}

export interface MessageRequest {
  sender_id: ObjectId;
  conversation_id: ObjectId;
  text: string;
  created_at: Date;
}

export interface InitMessageRequest {
    sender_id: ObjectId;
    text: string;
    created_at: Date;
}

export interface CreateConversation {
  conversation_request: ConversationRequest;
  init_message_request: InitMessageRequest;
}
