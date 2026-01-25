import { createContext, useContext, useReducer } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "INCREASE"; id: number }
  | { type: "DECREASE"; id: number }
  | { type: "CLEAR" };

const CartContext = createContext<any>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const exist = state.items.find(i => i.id === action.payload.id);
      if (exist) {
        return {
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, qty: 1 }] };
    }

    case "INCREASE":
      return {
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: i.qty + 1 } : i
        ),
      };

    case "DECREASE":
      return {
        items: state.items
          .map(i =>
            i.id === action.id ? { ...i, qty: i.qty - 1 } : i
          )
          .filter(i => i.qty > 0),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
