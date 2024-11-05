import { ObjectId } from "mongodb";
import { chatApi}  from "../api";
import { ConversationListResponse } from "../../features/chat/types";;

export const fetchConversations = async (userId: ObjectId): Promise<ConversationListResponse | undefined> => {
    try {
      console.log(`Fetching conversations for userId: ${userId}`);
      const response = await chatApi.get(`/conversations/${userId}`);
      console.log('API response:', response);
      return response.data;
    } catch (error) {
      console.error("fetchGroupRequests api error: ", error);
    }
}
  
export const fetchMessages = async (conversationId: ObjectId) => {
    try {
        const response = await chatApi.get(`/conversations/${conversationId}`);
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}