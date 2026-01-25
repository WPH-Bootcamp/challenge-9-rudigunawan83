import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= TYPES ================= */

type Restaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  distance: number;
};

type Pagination = {
  page: number;
  totalPages: number;
};

/* ================= PAGE ================= */

export default function AllRestaurant() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  /* FILTER STATE */
  const [range, setRange] = useState<number | null>(null);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  /* MOBILE FILTER */
  const [showFilter, setShowFilter] = useState(false);

  /* PAGINATION */
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, priceMin, priceMax, rating, page]);

  function fetchRestaurants() {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (range !== null) params.append("range", String(range));
    if (priceMin !== null) params.append("priceMin", String(priceMin));
    if (priceMax !== null) params.append("priceMax", String(priceMax));
    if (rating !== null) params.append("rating", String(rating));

    fetch(`${API_BASE_URL}/api/resto?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setRestaurants(json.data.restaurants);
        setPagination(json.data.pagination);
      });
  }

  function clearFilter() {
    setRange(null);
    setPriceMin(null);
    setPriceMax(null);
    setRating(null);
    setPage(1);
  }

  return (
    <>
      <Header />

      <main className="bg-neutral-50 min-h-screen px-4 lg:px-20 py-6">
        {/* ===== TITLE ===== */}
        <h1 className="text-2xl font-bold">All Restaurant</h1>

        {/* ===== FILTER LABEL (WEB + MOBILE) ===== */}
        <p className="mt-2 mb-4 font-semibold text-sm text-neutral-800">
          FILTER
        </p>

        {/* ===== MOBILE FILTER BAR ===== */}
        <div
          className="lg:hidden bg-white rounded-xl p-4 shadow flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => setShowFilter(true)}
        >
          <span className="font-semibold">Filter</span>
          <SlidersHorizontal size={18} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ===== FILTER SIDEBAR (WEB) ===== */}
          <aside className="hidden lg:block bg-white rounded-xl p-4 shadow h-fit">
            <FilterContent
              range={range}
              setRange={setRange}
              priceMin={priceMin}
              priceMax={priceMax}
              rating={rating}
              setPriceMin={setPriceMin}
              setPriceMax={setPriceMax}
              setRating={setRating}
            />

            <button
              onClick={clearFilter}
              className="mt-6 w-full border py-2 rounded-lg text-sm"
            >
              Clear Filter
            </button>
          </aside>

          {/* ===== RESTAURANT LIST ===== */}
          <section
            className="
              lg:col-span-3
              grid grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >
            {restaurants.map((r) => (
              <div
                key={r.id}
                onClick={() => navigate(`/restaurant/${r.id}`)}
                className="
                  bg-white rounded-2xl p-4 shadow
                  flex gap-4 items-center
                  cursor-pointer
                  hover:shadow-md transition
                "
              >
                <img
                  src={r.logo}
                  alt={r.name}
                  className="w-16 h-16 rounded-xl bg-neutral-100 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{r.name}</h3>
                  <p className="text-sm text-neutral-600">
                    ⭐ {r.star}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {r.place} · {r.distance} km
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* ===== PAGINATION ===== */}
        {pagination && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm">
              Page {pagination.page} / {pagination.totalPages}
            </span>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* ===== MOBILE FILTER MODAL ===== */}
      {showFilter && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filter</h2>
              <button onClick={() => setShowFilter(false)}>✕</button>
            </div>

            <FilterContent
              range={range}
              setRange={setRange}
              priceMin={priceMin}
              priceMax={priceMax}
              rating={rating}
              setPriceMin={setPriceMin}
              setPriceMax={setPriceMax}
              setRating={setRating}
            />

            <button
              onClick={() => {
                setPage(1);
                setShowFilter(false);
              }}
              className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl"
            >
              Apply Filter
            </button>

            <button
              onClick={() => {
                clearFilter();
                setShowFilter(false);
              }}
              className="mt-3 w-full border py-3 rounded-xl"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

/* ================= FILTER CONTENT ================= */

function FilterContent({
  range,
  setRange,
  priceMin,
  priceMax,
  rating,
  setPriceMin,
  setPriceMax,
  setRating,
}: {
  range: number | null;
  setRange: (v: number | null) => void;
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
  setPriceMin: (v: number | null) => void;
  setPriceMax: (v: number | null) => void;
  setRating: (v: number | null) => void;
}) {
  return (
    <>
      {/* Distance */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Distance</h3>
        {[1, 3, 5].map((km) => (
          <label key={km} className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={range === km}
              onChange={() => setRange(range === km ? null : km)}
            />
            Within {km} km
          </label>
        ))}
      </div>

      <hr className="my-6" />

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price</h3>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Minimum Price"
            value={priceMin ?? ""}
            onChange={(e) => setPriceMin(Number(e.target.value) || null)}
            className="w-full border rounded-xl px-3 py-2"
          />
          <input
            type="number"
            placeholder="Maximum Price"
            value={priceMax ?? ""}
            onChange={(e) => setPriceMax(Number(e.target.value) || null)}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>
      </div>

      <hr className="my-6" />

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3">Rating</h3>
        {[5, 4, 3, 2, 1].map((r) => (
          <label key={r} className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={rating === r}
              onChange={() => setRating(rating === r ? null : r)}
            />
            ⭐ {r}
          </label>
        ))}
      </div>
    </>
  );
}
