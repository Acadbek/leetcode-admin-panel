import { useMutation, useQuery } from '@tanstack/react-query';
import { companyService } from '@/services/company';

export const useCompany = () => {
  return useMutation({
    mutationFn: (payload) => companyService.create(payload),
  });
};

export const useGetCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: () => companyService.get(),
  });
};

export const useGetCompany = (id) => {
  return useQuery({
    queryKey: ['company', id],
    queryFn: () => companyService.getWithId(id),
    enabled: !!id,
  });
};

export const useUpdateCompany = (id) => {
  return useMutation({
    mutationFn: (payload) => companyService.update(id, payload),
  });
};

export const useDeleteCompany = (id) => {
  return useMutation({
    mutationFn: () => companyService.delete(id),
  });
};
