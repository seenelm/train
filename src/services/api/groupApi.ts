import { ObjectId } from "mongodb";
import { GroupType } from "../../types/group";
import api from "../api";

export const addGroup = async ( group: GroupType ): Promise<GroupType | undefined> => {
  try {
    const { data } = await api.post("/groups", group);
    console.log("Add Group Response: ", data);
    return data;
  } catch (error) {
    console.error("addGroup api error: ", error);
  }
};

export const fetchUserGroups = async (userId: ObjectId) => {
  try {
    const { data } = await api.get(`/users/${userId}/groups`);
    console.log("Fetch Group Response: ", data);
    return data;
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
