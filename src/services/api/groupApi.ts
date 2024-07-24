import { ObjectId } from "mongodb";
import { GroupProfileType, GroupType, UserGroupsResponse, GroupResponse } from "../../types/group";
import api from "../api";

export const addGroup = async ( group: GroupType ): Promise<GroupType | undefined> => {
  try {
    const { data } = await api.post("/groups", group);
    return data;
  } catch (error) {
    console.error("addGroup api error: ", error);
  }
};

export const updateGroupProfile = async (group: GroupProfileType) => {
  try {
    const { data } = await api.put(`/groups/${group.id}/profile`, {
      groupBio: group.bio,
      groupName: group.name,
      accountType: group.type
    });
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error("updateGroupProfile api error: ", error);
    return null;
  }
};


export const fetchGroup = async (groupId: ObjectId) => {
  try {
    const { data } = await api.get(`/groups/${groupId}`);
    return data;
  } catch (error) {
    console.error("fetchGroup api error: ", error);
  }
}

export const fetchUserGroups = async (userId: ObjectId): Promise<GroupResponse[] | undefined> => {
  try {
    const { data } = await api.get(`/users/${userId}/groups`);
    console.log("fetchUserGroups data: ", data);
    return data.groups;
  } catch (error) {
    // log error to file
    console.error("fetchGroup api error: ", error);
  }
};

export const fetchGroupRequests = async (userId: ObjectId) => {
  try {
    const { data } = await api.get(`/groups/${userId}/requests`);
    return data;
  } catch (error) {
    console.error("fetchGroupRequests api error: ", error);
  }
}

export const fetchGroupImage = async () => {
  try {
    const { data } = await api.get("https://jsonplaceholder.typicode.com/photos/26");
    return data;
  } catch (error) {
    console.error("fetchGroupImage api error: ", error);
  }
}

export const joinGroup = async (groupId: ObjectId) => {
  try {
    const { data } = await api.put(`/groups/${groupId}/join`);
    return data;
  } catch (error) {
    console.error("joinGroup api error: ", error);
  }
}

