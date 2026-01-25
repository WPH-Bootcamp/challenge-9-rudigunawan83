import api from "@/services/api/axios"
import { MenuItem } from "@/types/menu"

export const getMenus = async (): Promise<MenuItem[]> => {
  const { data } = await api.get("/menus")
  return data.data ?? data
}

export interface RestaurantDetail {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  distance: number;
  menus: MenuItem[]; // ✅ sama persis
}

export interface RestaurantDetailResponse {
  success: boolean;
  data: RestaurantDetail;
}

export async function getRestaurantDetail(
  restoId: number
): Promise<RestaurantDetailResponse> {
  const response = await api.get<RestaurantDetailResponse>(
    `/api/resto/${restoId}`
  );
  return response.data;
}
