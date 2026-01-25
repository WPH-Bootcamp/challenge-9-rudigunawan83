import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getBestSeller } from "@/services/queries/restoQueries";

export default function BestSellerRestaurants() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token")!;
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useQuery({
    queryKey: ["best-seller", page],
    queryFn: () => getBestSeller(token, page, limit),
    keepPreviousData: true, // 🔥 smooth pagination
  });

  return (
    <>
      <Header />

      <main className="bg-neutral-50 min-h-screen px-4 lg:px-20 py-10">
        <h1 className="text-2xl font-bold mb-6">
          🏆 Best Seller Restaurants
        </h1>

        {isLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.restaurants.map((r) => (
              <div
                key={r.id}
                onClick={() =>
                  navigate(`/restaurant/${r.id}`)
                }
                className="bg-white rounded-2xl shadow hover:shadow-md transition cursor-pointer overflow-hidden"
              >
                <img
                  src={r.images?.[0] || r.logo}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-semibold">{r.name}</h3>
                    <span className="text-sm">⭐ {r.star}</span>
                  </div>

                  <p className="text-sm text-neutral-500">
                    {r.place}
                  </p>

                  <div className="flex justify-between mt-3 text-sm">
                    <span>{r.category}</span>
                    <span className="font-medium">
                      Rp
                      {r.priceRange?.min.toLocaleString(
                        "id-ID"
                      )}{" "}
                      - Rp
                      {r.priceRange?.max.toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded"
            >
              Prev
            </button>

            <button
              disabled={page === data.pagination.totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
