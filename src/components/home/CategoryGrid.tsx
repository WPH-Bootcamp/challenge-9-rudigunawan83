import { useNavigate } from "react-router-dom";

import AllIcon from "@/assets/categories/all.png";
import NearbyIcon from "@/assets/categories/nearby.png";
import DiscountIcon from "@/assets/categories/discount.png";
import BestSellerIcon from "@/assets/categories/best-seller.png";
import DeliveryIcon from "@/assets/categories/delivery.png";
import LunchIcon from "@/assets/categories/lunch.png";

const categories = [
  { id: "all", label: "All Restaurant", icon: AllIcon },
  { id: "nearby", label: "Nearby", icon: NearbyIcon },
  { id: "discount", label: "Discount", icon: DiscountIcon },
  { id: "best-seller", label: "Best Seller", icon: BestSellerIcon },
  { id: "delivery", label: "Delivery", icon: DeliveryIcon },
  { id: "lunch", label: "Lunch", icon: LunchIcon },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    if (id === "all") {
      navigate("/restaurants"); // ✅ INI YANG MEMANGGIL AllRestaurant.tsx
    }
  };

  return (
    <div
      className="
        mt-6
        grid grid-cols-3 gap-4
        sm:grid-cols-3
        md:grid-cols-6
        lg:flex lg:gap-6 lg:justify-between
      "
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.id)}
          className="
            flex flex-col items-center justify-center
            bg-white
            rounded-2xl
            px-4 py-5
            shadow-sm
            hover:shadow-md
            transition
            lg:flex-1
          "
        >
          <img
            src={cat.icon}
            alt={cat.label}
            className="h-8 w-8 mb-2 object-contain"
          />

          <span className="text-xs font-medium text-neutral-800 text-center">
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );
}
