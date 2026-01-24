import { useMutation } from "@tanstack/react-query";
import {
  registerApi,
  loginApi,
  RegisterPayload,
  LoginPayload,
} from "@/services/auth/auth.api";

/* REGISTER */
export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerApi(payload),
  });
}

/* LOGIN */
export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
  });
}
