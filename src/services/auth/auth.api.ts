import api from "@/services/api/axios";

/* ================= REGISTER ================= */

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export async function registerApi(payload: RegisterPayload) {
  const { data } = await api.post("/api/auth/register", payload);
  return data;
}

/* ================= LOGIN ================= */

export interface LoginPayload {
  email: string;
  password: string;
}

export async function loginApi(payload: LoginPayload) {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
}

/* ================= PROFILE ================= */

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export async function getProfileApi() {
  const { data } = await api.get("/api/auth/profile");
  return data.data as UserProfile;
}

export interface SearchRestoParams {
  q: string;
  page?: number;
  limit?: number;
}
export async function searchResto({
  q,
  page = 1,
  limit = 20,
}: SearchRestoParams) {
  const response = await api.get("/api/resto/search", {
    params: {
      q,
      page,
      limit,
    },
  });

  return response.data;
}