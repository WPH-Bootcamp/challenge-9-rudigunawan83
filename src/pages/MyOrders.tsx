import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, FileText, LogOut, User } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GiveReviewModal from "@/components/review/GiveReviewModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= TYPES ================= */

type UserProfile = {
  name: string;
  avatar?: string;
};

type OrderItem = {
  menuId: number;
  menuName: string;
  price: number;
  image: string;
  quantity: number;
};

type RestaurantOrder = {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: OrderItem[];
};

type Order = {
  id: number;
  transactionId: string;
  status: "preparing" | "on_the_way" | "delivered" | "done" | "cancelled";
  pricing: {
    totalPrice: number;
  };
  restaurants: RestaurantOrder[];
};

type Pagination = {
  page: number;
  totalPages: number;
};

/* ================= HELPER ================= */

const isReviewed = (transactionId: string, restaurantId: number) =>
  localStorage.getItem(
    `reviewed_${transactionId}_${restaurantId}`
  ) === "true";

/* ================= PAGE ================= */

export default function MyOrders() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  /* ===== PROFILE ===== */
  const [profile, setProfile] = useState<UserProfile | null>(null);

  /* ===== ORDERS ===== */
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState("done");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  /* ===== REVIEW MODAL ===== */
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewPayload, setReviewPayload] = useState<{
    transactionId: string;
    restaurantId: number;
    menuIds: number[];
  } | null>(null);

  /* ================= LOAD PROFILE ================= */

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((json) => setProfile(json.data))
      .catch(() => navigate("/login", { replace: true }));
  }, [token, navigate]);

  /* ================= LOAD ORDERS ================= */

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    fetch(
      `${API_BASE_URL}/api/order/my-order?status=${status}&page=${page}&limit=10`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => res.json())
      .then((json) => {
        setOrders(json?.data?.orders || []);
        setPagination(json?.data?.pagination || null);
      })
      .finally(() => setLoading(false));
  }, [status, page, token]);

  const statusTabs = [
    { key: "preparing", label: "Preparing" },
    { key: "on_the_way", label: "On the Way" },
    { key: "delivered", label: "Delivered" },
    { key: "done", label: "Done" },
    { key: "cancelled", label: "Canceled" },
  ];

  /* ================= RENDER ================= */

  return (
    <>
      <Header />

      <main className="bg-neutral-50 min-h-screen px-4 lg:px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ================= SIDEBAR (SAME AS PROFILE) ================= */}
          <aside className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow p-5">
              {/* PROFILE HEADER */}
              <div className="flex items-center gap-3 mb-4">
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center">
                    👤
                  </div>
                )}
                <p className="font-semibold">{profile?.name || "User"}</p>
              </div>

              <hr className="my-4" />

              {/* MENU */}
              <ul className="space-y-3 text-sm">
                <li
                  onClick={() => navigate("/profile/address")}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 cursor-pointer"
                >
                  📍 Delivery Address
                  
                </li>

                <li className="flex items-center gap-3 px-3 py-2 rounded-lg bg-red-50 text-red-600 font-medium">
                  📄 My Orders
                </li>

                <li
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    navigate("/login", { replace: true });
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  🚪 Logout
                </li>
              </ul>
            </div>
          </aside>

          {/* ================= CONTENT ================= */}
          <section className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            {/* STATUS FILTER */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {statusTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setStatus(tab.key);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm border
                    ${
                      status === tab.key
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ORDER LIST */}
            {loading ? (
              <p className="text-center py-10">Loading...</p>
            ) : orders.length === 0 ? (
              <p className="text-center py-10 text-neutral-400">
                No orders found
              </p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl p-6 shadow"
                  >
                    {order.restaurants.map((r) => (
                      <div key={r.restaurant.id}>
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={r.restaurant.logo}
                            className="w-8 h-8 rounded"
                          />
                          <p className="font-semibold">
                            {r.restaurant.name}
                          </p>
                        </div>

                        {r.items.map((item) => (
                          <div
                            key={item.menuId}
                            className="flex gap-3 mb-4"
                          >
                            <img
                              src={item.image}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium">
                                {item.menuName}
                              </p>
                              <p className="text-sm font-semibold">
                                {item.quantity} x Rp
                                {item.price.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>
                        ))}

                        <div className="border-t pt-4 mt-4 flex justify-between items-center">
                          <div>
                            <p className="text-sm text-neutral-500">
                              Total
                            </p>
                            <p className="font-bold">
                              Rp
                              {order.pricing.totalPrice.toLocaleString(
                                "id-ID"
                              )}
                            </p>
                          </div>

                          {order.status === "done" && (
                            <button
                              disabled={isReviewed(
                                order.transactionId,
                                r.restaurant.id
                              )}
                              onClick={() => {
                                if (
                                  isReviewed(
                                    order.transactionId,
                                    r.restaurant.id
                                  )
                                )
                                  return;

                                setReviewPayload({
                                  transactionId: order.transactionId,
                                  restaurantId: r.restaurant.id,
                                  menuIds: r.items.map((i) => i.menuId),
                                });
                                setReviewOpen(true);
                              }}
                              className={`px-6 py-3 rounded-full font-medium
                                ${
                                  isReviewed(
                                    order.transactionId,
                                    r.restaurant.id
                                  )
                                    ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                                    : "bg-red-600 text-white"
                                }`}
                            >
                              {isReviewed(
                                order.transactionId,
                                r.restaurant.id
                              )
                                ? "Reviewed"
                                : "Give Review"}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-2 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-2 border rounded
                      ${
                        p === page
                          ? "bg-red-600 text-white border-red-600"
                          : ""
                      }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      {reviewPayload && (
        <GiveReviewModal
          open={reviewOpen}
          onClose={() => setReviewOpen(false)}
          transactionId={reviewPayload.transactionId}
          restaurantId={reviewPayload.restaurantId}
          menuIds={reviewPayload.menuIds}
        />
      )}
    </>
  );
}
