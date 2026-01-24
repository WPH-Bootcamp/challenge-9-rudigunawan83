import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= TYPES ================= */

type CartItem = {
  id: number; // cart item id
  menu: {
    id: number;
    foodName: string;
    price: number;
    image: string;
  };
  quantity: number;
};

type CartGroup = {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: CartItem[];
  subtotal: number;
};

/* ================= PAGE ================= */

export default function Cart() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [cart, setCart] = useState<CartGroup[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    if (!token) return;

    const res = await fetch(`${API_BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    setCart(json.data.cart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ================= UPDATE QTY ================= */
  const updateQty = async (cartItemId: number, newQty: number) => {
    if (!token || loading) return;

    setLoading(true);

    try {
      if (newQty === 0) {
        // 🔥 DELETE ITEM
        await fetch(`${API_BASE_URL}/api/cart/${cartItemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // 🔁 UPDATE QTY
        await fetch(`${API_BASE_URL}/api/cart/${cartItemId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQty }),
        });
      }

      await fetchCart();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="bg-neutral-50 min-h-screen pb-32 px-4 lg:px-20">
        <h1 className="text-2xl font-bold mt-6 mb-6">My Cart</h1>

        {cart.map((group) => (
          <div
            key={group.restaurant.id}
            className="bg-white rounded-2xl p-4 mb-6 shadow"
          >
            {/* RESTAURANT */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={group.restaurant.logo}
                className="w-8 h-8 rounded"
              />
              <h2 className="font-semibold">
                {group.restaurant.name}
              </h2>
            </div>

            {/* ITEMS */}
            {group.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex gap-3">
                  <img
                    src={item.menu.image}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm">{item.menu.foodName}</p>
                    <p className="font-bold text-sm">
                      Rp{item.menu.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* QTY CONTROL */}
                <div className="flex items-center gap-2">
                  <button
                    disabled={loading}
                    onClick={() =>
                      updateQty(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 border rounded-full disabled:opacity-50"
                  >
                    −
                  </button>

                  <span className="w-5 text-center">
                    {item.quantity}
                  </span>

                  <button
                    disabled={loading}
                    onClick={() =>
                      updateQty(item.id, item.quantity + 1)
                    }
                    className="w-8 h-8 bg-red-600 text-white rounded-full disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* TOTAL */}
            <div className="border-t pt-4 mt-4 text-left">
              <p className="text-sm">Total</p>
              <p className="font-bold">
                Rp{group.subtotal.toLocaleString("id-ID")}
              </p>
            </div>

            {/* CHECKOUT */}
            <button
              disabled={loading}
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-red-600 text-white py-3 rounded-full disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        ))}
      </main>

      <Footer />
    </>
  );
}
