import api from "../api";

export const followUser = async (followeeId: string) => {
  try {
    const { data } = await api.post(`/users/${followeeId}/follow`);
    return data;
  } catch (error) {
    console.error("followUser api error: ", error);
  }
};

export const followPrivateUser = async (followeeId: string) => {
  try {
    const { data } = await api.post(`/users/follow/requests/${followeeId}`);
    return data;
  } catch (error) {
        console.error("followPrivateUser api error: ", error);
  }
};

export const acceptFollowRequest = async (followerId: string) => {
  try {
    const { data } = await api.post(`/users/follow/requests/${followerId}/accept`);
    return data;
  } catch (error) {
    console.error("acceptFollowRequest api error: ", error);
  }
};

export const rejectFollowRequest = async (followerId: string) => {
  try {
    const { data } = await api.post(`/users/follow/requests/${followerId}/reject`);
    return data;
  } catch (error) {
    console.error("rejectFollowRequest api error: ", error);
  }
};

export const removeFollowRequest = async (followerId: string) => {
  try {
    const { data } = await api.delete(`/users/follow/requests/${followerId}/remove`);
    return data;
  } catch (error) {
    console.error("removeFollowRequest api error: ", error);
  }
};

export const unfollowUser = async (followerId: string) => {
  try {
    const { data } = await api.delete(`/users/follow/requests/${followerId}/unfollow`);
    return data;
  } catch (error) {
    console.error("unfollowUser api error: ", error);
  }
};