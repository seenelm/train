import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Config from "react-native-config";
import { getToken } from "./actions";
import { ObjectId } from 'mongodb';

//TODO: rename to Group, and include all properties in the backend
interface GroupType {
groupName: string;
userId: ObjectId;
}

const api = axios.create({
baseURL: `${Config.API_URL}/api`,
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
//TODO: Add error handling
  const addGroup = async ({ groupName, userId }: { groupName: string; userId: ObjectId }): Promise<GroupType> => {
    const { data } = await api.post('/groups', { groupName: groupName, userId });
    console.log("Add Group Response: ", data);
    return data;
  };

  export const useAddGroup = () => {
    const queryClient = useQueryClient();
    
    return useMutation(
      ({ groupName, userId }: { groupName: string; userId: ObjectId }) => addGroup({ groupName, userId }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['group']);
        },
      }
    );
  };
  

//TODO: seperate out FetchGroup and also add error handling
export const useFetchGroup = (userId: string) => {
  return useQuery(['group', userId], async () => {
    const { data } = await api.get(`/users/${userId}/groups`);
    console.log("Fetch Group Response: ", data);
    return data;
  });
};
