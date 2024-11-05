import { ObjectId } from "mongodb";
import { useQuery } from "react-query";
import { fetchConversations } from "../api/chatApi";

export const useFetchConversations = (userId: ObjectId) => {
    return useQuery({
      queryKey: ["requests", userId],
      queryFn: () => fetchConversations(userId),
    });
}