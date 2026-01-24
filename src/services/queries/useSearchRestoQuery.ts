import { useQuery } from "@tanstack/react-query";
import { searchResto } from "@/services/api/menu.api";

export function useSearchRestoQuery(
  q: string,
  page = 1,
  limit = 20
) {
  return useQuery({
    queryKey: ["search-resto", q, page, limit],
    queryFn: () => searchResto({ q, page, limit }),
    enabled: !!q, // ⬅️ wajib ada keyword
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}
