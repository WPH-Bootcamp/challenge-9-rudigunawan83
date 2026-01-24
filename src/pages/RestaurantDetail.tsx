import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Share2 } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= TYPES ================= */

type Menu = {
  id: number;
  foodName: string;
  price: number;
  type: "food" | "drink";
  image: string;
};

type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
  };
};

type RestaurantDetail = {
  id: number;
  name: string;
  averageRating: number;
  place: string;
  distance: number;
  logo: string;
  images: string[];
  menus: Menu[];
  reviews: Review[];
  totalReviews: number;
};

type CartItem = {
  cartItemId: number;
  menuId: number;
  qty: number;
  price: number;
};

/* ================= CONSTANT ================= */

const MENU_PAGE_SIZE = 8;

/* ================= HELPER ================= */

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

/* ================= PAGE ================= */

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<RestaurantDetail | null>(null);
  const [menuType, setMenuType] = useState<"all" | "food" | "drink">("all");
  const [visibleMenus, setVisibleMenus] = useState(MENU_PAGE_SIZE);

  const [cart, setCart] = useState<CartItem[]>([]);

  /* ================= FETCH DETAIL ================= */

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || !id) return;

    fetch(`${API_BASE_URL}/api/resto/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, [id]);

  /* ================= FILTER MENU ================= */

  const filteredMenus = useMemo(() => {
    if (!data) return [];
    if (menuType === "all") return data.menus;
    return data.menus.filter((m) => m.type === menuType);
  }, [data, menuType]);

  /* ================= CART HELPERS ================= */

  const getItem = (menuId: number) =>
    cart.find((c) => c.menuId === menuId);

  const addToCart = async (menu: Menu) => {
    if (!data) return;
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const res = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        restaurantId: data.id,
        menuId: menu.id,
        quantity: 1,
      }),
    });

    const json = await res.json();

    setCart((prev) => [
      ...prev,
      {
        cartItemId: json.data.id,
        menuId: menu.id,
        qty: 1,
        price: menu.price,
      },
    ]);
  };

  const updateQty = async (menuId: number, newQty: number) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const item = getItem(menuId);
    if (!item) return;

    await fetch(`${API_BASE_URL}/api/cart/${item.cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity: newQty }),
    });

    setCart((prev) =>
      prev.map((c) =>
        c.menuId === menuId ? { ...c, qty: newQty } : c
      )
    );
  };

  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.qty * c.price, 0);

  if (!data) return null;

  return (
    <>
      <Header />

      <main className="bg-neutral-50 min-h-screen pb-32">
        {/* ================= INFO ================= */}
        <section className="px-4 lg:px-20 mt-6 flex justify-between">
          <div className="flex gap-4">
            <img src={data.logo} className="w-16 h-16 rounded-full" />
            <div>
              <h1 className="font-bold text-xl">{data.name}</h1>
              <p className="text-sm text-neutral-500">
                ⭐ {data.averageRating} · {data.place} · {data.distance} km
              </p>
            </div>
          </div>
          <button className="hidden lg:flex items-center gap-2 border px-4 py-2 rounded-full">
            <Share2 size={16} /> Share
          </button>
        </section>

        {/* ================= MENU ================= */}
        <section className="px-4 lg:px-20 mt-10">
          <h2 className="font-bold text-lg mb-4">Menu</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMenus.slice(0, visibleMenus).map((menu) => {
              const item = getItem(menu.id);

              return (
                <div key={menu.id} className="bg-white rounded-2xl shadow">
                  <img src={menu.image} className="h-48 w-full object-cover rounded-t-2xl" />

                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold">{menu.foodName}</h3>
                    <p className="font-bold">
                      Rp{menu.price.toLocaleString("id-ID")}
                    </p>

                    {!item ? (
                      <button
                        onClick={() => addToCart(menu)}
                        className="bg-red-600 text-white w-full py-2 rounded-full"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex justify-center items-center gap-4">
                        <button
                          onClick={() =>
                            updateQty(menu.id, Math.max(1, item.qty - 1))
                          }
                          className="w-9 h-9 border rounded-full"
                        >
                          −
                        </button>
                        <span className="font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(menu.id, item.qty + 1)}
                          className="w-9 h-9 bg-red-600 text-white rounded-full"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ================= CHECKOUT BAR ================= */}
      {totalQty > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t p-4 flex justify-between items-center">
          <div>
            <p className="text-sm">{totalQty} items</p>
            <p className="font-bold">
              Rp{totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <button
            onClick={() => navigate("/cart")}
            className="bg-red-600 text-white px-8 py-2 rounded-full"
          >
            Checkout
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}
