import { useMenusQuery } from "@/services/queries/useMenusQuery"

export default function HomePage() {
  const { data, isLoading, error } = useMenusQuery()

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error load menu
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Menu</h1>

      {isLoading && <p>Loading...</p>}

      {data?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
