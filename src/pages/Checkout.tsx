import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= TYPES ================= */

type CartItem = {
  id: number;
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

type CartResponse = {
  cart: CartGroup[];
  summary: {
    totalItems: number;
    totalPrice: number;
    restaurantCount: number;
  };
};

/* ================= PAGE ================= */

export default function Checkout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(false);

  /* ===== ADDRESS ===== */
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [editingAddress, setEditingAddress] = useState(false);

  /* ===== PAYMENT ===== */
  const [paymentMethod, setPaymentMethod] = useState(
    "BNI Bank Negara Indonesia"
  );

  /* ================= LOAD CART ================= */

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetch(`${API_BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((json) => setCartData(json.data))
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, [navigate, token]);

  /* ================= LOAD ADDRESS ================= */

  useEffect(() => {
    const saved = localStorage.getItem("user_delivery_address");
    if (saved) {
      const parsed = JSON.parse(saved);
      setAddress(parsed.address || "");
      setPhone(parsed.phone || "");
    }
  }, []);

  /* ================= SAVE ADDRESS ================= */

  const handleSaveAddress = () => {
    if (!address.trim() || !phone.trim()) {
      alert("Alamat dan nomor telepon wajib diisi");
      return;
    }

    localStorage.setItem(
      "user_delivery_address",
      JSON.stringify({ address, phone })
    );

    setEditingAddress(false);
  };

  /* ================= BUY / CHECKOUT ================= */

  const handleCheckout = async () => {
    if (loading || !cartData) return;

    if (!address.trim() || !phone.trim()) {
      alert("Silakan isi alamat & nomor telepon pengiriman");
      return;
    }

    setLoading(true);

    const payload = {
      restaurants: cartData.cart.map((c) => ({
        restaurantId: c.restaurant.id,
        items: c.items.map((i) => ({
          menuId: i.menu.id,
          quantity: i.quantity,
        })),
      })),
      deliveryAddress: address,
      phone,
      paymentMethod,
      notes: "Please ring the doorbell",
    };

    try {
      /* === 1. CHECKOUT (WAJIB BERHASIL) === */
      const res = await fetch(`${API_BASE_URL}/api/order/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Checkout gagal");
      }

      const result = await res.json();

      /* === 2. PINDAH KE SUCCESS PAGE DULU === */
      navigate("/payment-success", {
        replace: true,
        state: {
          orderId: result?.data?.orderId,
          paymentMethod,
          totalPrice: cartData.summary.totalPrice,
          totalItems: cartData.summary.totalItems,
          deliveryFee: 10000,
          serviceFee: 1000,
          createdAt: new Date().toISOString(),
        },
      });

      /* === 3. CLEAR CART (BACKGROUND, TIDAK BOLEH BLOCK UI) === */
      fetch(`${API_BASE_URL}/api/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {});
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(error.message || "Checkout gagal, silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  if (!cartData) return null;

  return (
    <>
      <Header />

      <main className="bg-neutral-50 min-h-screen pb-32">
        <section className="px-4 lg:px-20 mt-8">
          <h1 className="text-xl font-bold mb-6">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ================= LEFT ================= */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* ===== DELIVERY ADDRESS ===== */}
              <div className="bg-white rounded-2xl p-4 shadow">
                <h3 className="font-semibold mb-3">📍 Delivery Address</h3>

                {!editingAddress ? (
                  <>
                    {address && phone ? (
                      <>
                        <p className="text-sm">{address}</p>
                        <p className="text-sm mt-1">{phone}</p>
                      </>
                    ) : (
                      <p className="text-sm text-neutral-400 italic">
                        Isi alamat dan nomor telepon pengiriman
                      </p>
                    )}

                    <button
                      onClick={() => setEditingAddress(true)}
                      className="mt-4 border px-6 py-2 rounded-full text-sm"
                    >
                      Change
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Alamat Pengiriman"
                        className="border rounded-lg px-3 py-2 text-sm"
                      />
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="No. Telepon"
                        className="border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>

                    <button
                      onClick={handleSaveAddress}
                      className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full text-sm"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>

              {/* ===== CART ITEMS ===== */}
              {cartData.cart.map((group) => (
                <div
                  key={group.restaurant.id}
                  className="bg-white rounded-2xl p-4 shadow"
                >
                  <h3 className="font-semibold mb-4">
                    🏪 {group.restaurant.name}
                  </h3>

                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-4"
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.menu.image}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {item.menu.foodName}
                          </p>
                          <p className="text-sm font-bold">
                            Rp
                            {item.menu.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm">x {item.quantity}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ================= RIGHT ================= */}
            <div className="bg-white rounded-2xl p-4 shadow h-fit">
              <h3 className="font-semibold mb-4">Payment Method</h3>

              {[
                "BNI Bank Negara Indonesia",
                "BRI Bank Rakyat Indonesia",
                "BCA Bank Central Asia",
                "Mandiri",
              ].map((bank) => (
                <label
                  key={bank}
                  className="flex justify-between items-center mb-3 cursor-pointer"
                >
                  <span className="text-sm">{bank}</span>
                  <input
                    type="radio"
                    checked={paymentMethod === bank}
                    onChange={() => setPaymentMethod(bank)}
                  />
                </label>
              ))}

              <hr className="my-4" />

              <div className="flex justify-between font-bold mb-4">
                <span>Total</span>
                <span>
                  Rp{cartData.summary.totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={handleCheckout}
                className="w-full bg-red-600 disabled:opacity-50 text-white py-3 rounded-full"
              >
                {loading ? "Processing..." : "Buy"}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
