import api from "@/services/api/axios";
import { MenuItem } from "@/types/menu"; // ⬅️ WAJIB DARI TYPES

/* =====================================================
 * TYPES
 * ===================================================== */

export interface PriceRange {
  min: number;
  max: number;
}

export interface Restaurant {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: PriceRange;
  distance: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchRestoResponse {
  success: boolean;
  data: {
    restaurants: Restaurant[];
    pagination: Pagination;
    searchQuery: string;
  };
}

export interface SearchRestoParams {
  q: string;
  page?: number;
  limit?: number;
}

/* =====================================================
 * API FUNCTIONS
 * ===================================================== */

/**
 * 🔍 Search restaurant by name
 * Endpoint: GET /api/resto/search
 */
export async function searchResto({
  q,
  page = 1,
  limit = 20,
}: SearchRestoParams): Promise<SearchRestoResponse> {
  const response = await api.get<SearchRestoResponse>(
    "/api/resto/search",
    {
      params: {
        q,
        page,
        limit,
      },
    }
  );

  return response.data;
}

/* =====================================================
 * (OPTIONAL FUTURE API)
 * ===================================================== */

/**
 * 📋 Get all restaurants (future)
 */
// export async function getRestaurants(page = 1, limit = 20) {
//   const response = await api.get("/api/resto", {
//     params: { page, limit },
//   });
//   return response.data;
// }

/* ===============================
 * TYPES
 * =============================== */

// export interface MenuItem {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   category: "FOOD" | "DRINK";
//   rating: number;
// }
export interface RestaurantDetail {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  distance: number;

  menus: MenuItem[]; // ⬅️ PAKAI TYPE DARI types/menu
}

export interface RestaurantDetailResponse {
  success: boolean;
  data: RestaurantDetail;
}

export async function getRestaurantDetail(
  restoId: number
): Promise<RestaurantDetailResponse> {
  const res = await api.get<RestaurantDetailResponse>(
    `/api/resto/${restoId}`
  );

  return res.data;
}