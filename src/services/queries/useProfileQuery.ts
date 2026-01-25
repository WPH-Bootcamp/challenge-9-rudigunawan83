import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/services/auth/auth.api";

export function useProfileQuery() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
    staleTime: 1000 * 60 * 5, // 5 menit
  });
}
