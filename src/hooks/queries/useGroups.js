import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupsService } from '@/services/groups';

export const useCreateGroups = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => groupsService.create(payload),
    // onSuccess: () => {
    //   // queryClient.invalidateQueries({ queryKey: ['groups'] });
    // },
  });
};

export const useGetGroupsWithCompanyId = (companyId) => {
  return useQuery({
    queryKey: ['groups', companyId],
    queryFn: () => groupsService.getWithCompanyId(companyId),
    enabled: !!companyId,
  });
};

export const useGetGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: () => groupsService.get(),
  });
};
