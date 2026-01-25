import { useNavigate } from "react-router-dom";

type Restaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  distance: number;
};

export default function SearchRestaurant() {
  const navigate = useNavigate();

  // contoh data dari API search
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Richeese Factory",
      star: 4.7,
      place: "Jakarta Barat",
      logo: "/images/richeese.png",
      distance: 2.1,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow">
      {restaurants.map((r) => (
        <div
          key={r.id}
          onClick={() => navigate(`/restaurant/${r.id}`)} // 🔥 PENTING
          className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-50"
        >
          <img src={r.logo} className="w-10 h-10 rounded-full" />

          <div className="flex-1">
            <h3 className="font-semibold">{r.name}</h3>
            <p className="text-sm text-gray-500">
              ⭐ {r.star} · {r.place}
            </p>
          </div>

          <span className="text-xs text-gray-400">
            {r.distance} km
          </span>
        </div>
      ))}
    </div>
  );
}
