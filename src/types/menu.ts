export interface MenuItem {
  id: string; // ✅ pakai string (AMAN)
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: "FOOD" | "DRINK";
  rating: number;
}
