import { usersService } from '@/services/users';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateUser = () => {
  return useMutation({
    mutationFn: ({ data, role }) => {
      if (role === 'student') {
        console.log('student', data, role);
        return usersService.create(data, role);
      } else {
        console.log('staff', data, role);
        return usersService.create(data, role);
      }
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.get(),
  });
};
