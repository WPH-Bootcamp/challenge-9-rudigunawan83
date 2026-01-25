import { MenuItem } from "@/types/menu";
import { Plus } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  onAdd?: (item: MenuItem) => void;
}

export default function MenuCard({
  item,
  onAdd,
}: MenuCardProps) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      {/* IMAGE */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-28 w-full object-cover"
      />

      {/* CONTENT */}
      <div className="p-3">
        <p className="text-sm font-medium line-clamp-1">
          {item.name}
        </p>

        <p className="text-xs text-neutral-500 mt-0.5">
          Rp {item.price.toLocaleString("id-ID")}
        </p>

        {/* ACTION */}
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => onAdd?.(item)}
            className="
              flex-1 h-8
              rounded-lg
              bg-red-700
              text-white
              text-xs font-medium
              hover:bg-red-800
              transition
            "
          >
            Add
          </button>

          <button
            onClick={() => onAdd?.(item)}
            className="
              h-8 w-8
              rounded-full
              bg-red-700
              flex items-center justify-center
              hover:bg-red-800
              transition
            "
          >
            <Plus size={14} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
