import { useQuery } from 'react-query';
import { fetchUser } from '../api/userApi';

export const useFetchUser = (userIds: string[]) => {
  return useQuery({
    queryKey: ['user', userIds],
    queryFn: () => fetchUser(userIds),
  });
};