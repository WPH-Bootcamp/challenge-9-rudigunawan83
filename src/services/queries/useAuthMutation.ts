import { useMutation } from "@tanstack/react-query"
import { login, register } from "../auth/auth.api"

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
  })

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: register,
  })
