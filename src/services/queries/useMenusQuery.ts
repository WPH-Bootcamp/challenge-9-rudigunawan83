import { useQuery } from "@tanstack/react-query"
import { getMenus } from "../menu/menu.api"

export const useMenusQuery = () =>
  useQuery({
    queryKey: ["menus"],
    queryFn: getMenus,
  })
