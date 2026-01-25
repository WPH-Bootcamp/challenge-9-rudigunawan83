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
import MyOrders from "@/pages/MyOrders";
import Profile from "@/pages/Profile";
import NearbyRestaurants from "@/pages/NearbyRestaurants";
import BestSellerRestaurants from "@/pages/BestSellerRestaurants";
export default function App() {
  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= PROFILE ================= */}
      <Route path="/profile" element={<Profile />} />

      {/* ================= MAIN ================= */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchRestaurant />} />

      {/* Restaurant */}
      <Route path="/restaurants" element={<AllRestaurant />} />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      <Route path="/restaurants/nearby" element={<NearbyRestaurants />} />
      <Route path="/restaurants/best-seller" element={<BestSellerRestaurants />} />

      {/* Cart / Checkout Flow */}
      <Route path="/cart" element={<Cart />} /> 
      <Route path="/checkout" element={<Checkout />} />

      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/my-orders" element={<MyOrders />} />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
