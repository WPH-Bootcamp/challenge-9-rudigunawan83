import api from "@/services/api/axios"
import { MenuItem } from "@/types/menu"

export const getMenus = async (): Promise<MenuItem[]> => {
  const { data } = await api.get("/menus")
  return data.data ?? data
}
