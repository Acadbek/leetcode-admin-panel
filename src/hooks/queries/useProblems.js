import { problemsService } from '@/services/problems';
import { useQuery } from '@tanstack/react-query';

export const useProblems = () => {
  return useQuery({
    queryKey: ['problems'],
    queryFn: () => problemsService.getProblems(),
  });
};
