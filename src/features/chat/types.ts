import { ObjectId } from 'mongodb';

export interface User {
  id: ObjectId;
  name: string;
}

export interface ConversationRequest {
  name?: string;
  ownerId: ObjectId;
  members: User[];
  createdAt: Date;
}

export interface MessageRequest {
  senderId: ObjectId;
  conversationId?: ObjectId;
  text: string;
  createdAt: Date;
}

export interface CreateConversation {
  conversationRequest: ConversationRequest;
  messageRequest: MessageRequest;
}

export interface MessageResponse {
  text: string;
}