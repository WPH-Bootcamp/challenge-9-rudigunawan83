export type CartItem = {
  restaurantId: number;
  restaurantName: string;
  menuId: number;
  foodName: string;
  price: number;
  image: string;
  qty: number;
};

const CART_KEY = "foody_cart";

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
