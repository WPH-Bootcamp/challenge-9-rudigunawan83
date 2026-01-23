import api from "../api/axios"
import { LoginPayload, RegisterPayload, AuthResponse } from "@/types/auth"

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload)
  return data
}

export const register = async (payload: RegisterPayload) => {
  const { data } = await api.post<AuthResponse>("/auth/register", payload)
  return data
}
