import { useQuery } from "@tanstack/react-query";
import { getRestaurantDetail } from "@/services/api/menu.api";

export function useRestaurantDetailQuery(restoId: number) {
  return useQuery({
    queryKey: ["restaurant-detail", restoId],
    queryFn: () => getRestaurantDetail(restoId),
    enabled: !!restoId,
  });
}
