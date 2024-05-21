import api from "../api";

export const fetchUser = async (userIds: string[]) => {
  try {
    const { data } = await api.get(`/users`, {params: {userIds}});
    return data;
  } catch (error) {
    console.error("getUser api error: ", error);
  }
};