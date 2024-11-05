import { useQuery, useMutation, useQueryClient } from "react-query";
import { ObjectId } from "mongodb";
import { addGroup, fetchGroup, fetchUserGroups, fetchGroupRequests, fetchGroupImage, updateGroupProfile, joinGroup } from "../api/groupApi";
import { GroupProfileType, GroupType } from "../../types/group";
import { useJoinGroupMutation } from "../../api/groupsApi";

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

export const useUpdateGroupProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (group: GroupProfileType) => updateGroupProfile(group),
    onSuccess: () => {
      queryClient.invalidateQueries(["group"]);
    },
    onError: (error) => {
      console.error("useUpdateGroupProfile mutation error: ", error);
    },
  });
};

export const useFetchGroup = (groupId: ObjectId) => {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => fetchGroup(groupId),
  });
};

export const useFetchUserGroups = (userId: ObjectId) => {
  return useQuery({
    queryKey: ["group", userId],
    queryFn: () => fetchUserGroups(userId),
  });
};

export const useFetchGroupRequests = (userId: ObjectId) => {
  return useQuery({
    queryKey: ["requests", userId],
    queryFn: () => fetchGroupRequests(userId),
  });
}

export const useFetchGroupImage = () => {
  return useQuery({
    queryKey: "groupImage",
    queryFn: () => fetchGroupImage(),
  });
}

export const useJoinGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: ObjectId) => joinGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries(["group"]);
    },
    onError: (error) => {
      console.error("useJoinGroupMutation error: ", error);
    },
  });
}
