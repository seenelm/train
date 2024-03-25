import { useQuery, useMutation, useQueryClient } from "react-query";
import { ObjectId } from "mongodb";
import { addGroup, fetchUserGroups } from "../api/groupApi";
import { GroupType } from "../../types/group";

export const useAddGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (group: GroupType) => addGroup(group),
    onSuccess: () => {
      queryClient.invalidateQueries(["group"]);
    },
    onError: (error) => {
      // log error to file
      console.error("useAddGroup mutation error: ", error);
    },
  });
};

export const useFetchUserGroups = (userId: ObjectId) => {
  return useQuery({
    queryKey: ["group", userId],
    queryFn: () => fetchUserGroups(userId),
  });
};
