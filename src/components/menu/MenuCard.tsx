import { MenuItem } from "@/types/menu"

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {item.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-red-600">
            Rp {item.price.toLocaleString("id-ID")}
          </span>
          <span className="text-sm">⭐ {item.rating}</span>
        </div>
      </div>
    </div>
  )
}
