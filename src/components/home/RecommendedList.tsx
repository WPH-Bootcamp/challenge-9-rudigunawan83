import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type RecommendedResto = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  distance?: number;
};

const PAGE_SIZE = 5;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RecommendedList() {
  const navigate = useNavigate();

  const [data, setData] = useState<RecommendedResto[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Token tidak ditemukan, silakan login ulang");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/resto/recommended`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((json) => {
        setData(json.data.recommendations);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mendapatkan data rekomendasi");
        setLoading(false);
      });
  }, []);

  function handleLoadMore() {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }

  function handleSeeAll() {
    setVisibleCount(data.length);
  }

  if (loading) {
    return <p className="text-sm text-neutral-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <section className="mt-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Recommended</h2>

        {/* SEE ALL */}
        {visibleCount < data.length && (
          <button
            onClick={handleSeeAll}
            className="text-sm text-red-600 font-medium"
          >
            See All
          </button>
        )}
      </div>

      {/* LIST (MOBILE) / GRID (WEB) */}
      <div
        className="
          space-y-3
          md:space-y-0
          md:grid md:grid-cols-2 lg:grid-cols-3
          md:gap-4
        "
      >
        {data.slice(0, visibleCount).map((resto) => (
          <div
            key={resto.id}
            onClick={() => navigate(`/restaurant/${resto.id}`)}
            className="
              flex items-center gap-3
              bg-white rounded-xl p-3 shadow-sm cursor-pointer
              md:p-4
            "
          >
            {/* LOGO */}
            <div className="w-14 h-14 rounded-xl bg-neutral-100 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={resto.logo}
                alt={resto.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h3 className="font-semibold text-sm">
                {resto.name}
              </h3>

              <div className="flex items-center gap-1 text-sm">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{resto.star}</span>
              </div>

              <p className="text-xs text-neutral-500">
                {resto.place}
                {resto.distance && ` · ${resto.distance} km`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {visibleCount < data.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="
              px-6 py-2 text-sm rounded-full
              border border-neutral-300
              text-neutral-700 hover:bg-neutral-100
            "
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
