import { useMenusQuery } from "@/services/queries/useMenusQuery"
import MenuCard from "@/components/menu/MenuCard"
import MenuSkeleton from "@/components/menu/MenuSkeleton"

export default function HomePage() {
  const { data, isLoading } = useMenusQuery()

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Menu</h1>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(4)].map((_, i) => (
            <MenuSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && data?.length === 0 && (
        <p className="text-center text-gray-500">
          Menu belum tersedia
        </p>
      )}

      <div className="grid grid-cols-1 gap-4">
        {data?.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  )
}
