import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth-service";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload) => authService.login(payload),
  });
};
