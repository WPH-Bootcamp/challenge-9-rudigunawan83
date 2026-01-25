import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= TYPES ================= */

type NearbyRestaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  menuCount: number;
  distance: number;
};

/* ================= PAGE ================= */

export default function NearbyRestaurants() {
  const token = localStorage.getItem("access_token");

  const [restaurants, setRestaurants] = useState<NearbyRestaurant[]>([]);
  const [loading, setLoading] = useState(false);

  // default param
  const range = 10;
  const limit = 20;

  /* ================= FETCH NEARBY ================= */

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    fetch(
      `${API_BASE_URL}/api/resto/nearby?range=${range}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setRestaurants(json?.data?.restaurants || []);
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <>
      <Header />

      <main className="bg-neutral-50 min-h-screen px-4 lg:px-20 py-10">
        <h1 className="text-2xl font-bold mb-6">Nearby Restaurants</h1>

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : restaurants.length === 0 ? (
          <p className="text-center py-10 text-neutral-400">
            No nearby restaurants found
          </p>
        ) : (
          <div
            className="
              grid grid-cols-1 gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {restaurants.map((resto) => (
              <div
                key={resto.id}
                className="bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden"
              >
                {/* IMAGE */}
                <img
                  src={resto.images?.[0] || resto.logo}
                  alt={resto.name}
                  className="w-full h-40 object-cover"
                />

                {/* CONTENT */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">
                      {resto.name}
                    </h3>
                    <span className="text-sm text-neutral-500">
                      ⭐ {resto.star.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-500 mb-2">
                    {resto.place}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs text-neutral-600 mb-3">
                    <span>🍽 {resto.menuCount} Menu</span>
                    <span>💬 {resto.reviewCount} Reviews</span>
                    <span>📍 {resto.distance.toFixed(1)} km</span>
                  </div>

                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-neutral-100">
                    {resto.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
