import { useQuery } from '@tanstack/react-query';
import { profileService } from '@/services/profile';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => profileService.get(),
  });
};
