import api from "../api";

export const searchUsers = async (search: string) => {
  try {
    const { data } = await api.get(`/search/query?query=${search}`);
    return data;
  } catch (error) {
    console.error("searchUsers api error: ", error);
  }
};