const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type PriceRange = {
  min: number;
  max: number;
};

export type Restaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  menuCount: number;
  priceRange?: PriceRange;
  distance?: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

async function fetcher<T>(url: string, token: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  const json = await res.json();
  return json.data;
}

/* ===== BEST SELLER ===== */
export function getBestSeller(
  token: string,
  page: number,
  limit: number
) {
  return fetcher<{
    restaurants: Restaurant[];
    pagination: Pagination;
  }>(
    `${API_BASE_URL}/api/resto/best-seller?page=${page}&limit=${limit}`,
    token
  );
}

/* ===== NEARBY ===== */
export function getNearby(
  token: string,
  range = 10,
  limit = 20
) {
  return fetcher<{
    restaurants: Restaurant[];
  }>(
    `${API_BASE_URL}/api/resto/nearby?range=${range}&limit=${limit}`,
    token
  );
}

/* ===== DETAIL ===== */
export function getRestaurantDetail(
  token: string,
  id: string
) {
  return fetcher<Restaurant>(
    `${API_BASE_URL}/api/resto/${id}`,
    token
  );
}
