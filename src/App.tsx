import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import HomePage from "@/pages/HomePage";
import SearchRestaurant from "@/pages/SearchRestaurant";
import RestaurantDetail from "@/pages/RestaurantDetail";
import AllRestaurant from "@/pages/AllRestaurant";
import Cart from "@/pages/Cart"; 
import Checkout from "@/pages/Checkout"; 
import PaymentSuccess from "@/pages/PaymentSuccess";

export default function App() {
  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= MAIN ================= */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchRestaurant />} />

      {/* Restaurant */}
      <Route path="/restaurants" element={<AllRestaurant />} />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />

      {/* Cart / Checkout Flow */}
      <Route path="/cart" element={<Cart />} /> 
      <Route path="/checkout" element={<Checkout />} />

      <Route path="/payment-success" element={<PaymentSuccess />} />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
