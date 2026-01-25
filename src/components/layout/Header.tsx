import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, FileText, LogOut, User } from "lucide-react";

import { useProfileQuery } from "@/services/queries/useProfileQuery";
import api from "@/services/api/axios";

import LogoWhite from "@/assets/Logo-white.png";
import BagWhite from "@/assets/Bag-white.png";

import { useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Header() {
  const navigate = useNavigate();
  const { data: profile } = useProfileQuery();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const avatarRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("access_token");

  /* ================= AVATAR ================= */

  const hasAvatar =
    profile?.avatar && profile.avatar.trim() !== "";

  const avatarUrl =
    hasAvatar && profile!.avatar.startsWith("http")
      ? profile!.avatar
      : hasAvatar
      ? `${api.defaults.baseURL}/${profile!.avatar}`
      : null;

  /* ================= CART COUNT ================= */

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("cart error");
        return res.json();
      })
      .then((json) => {
        setCartCount(json?.data?.summary?.totalItems || 0);
      })
      .catch(() => {
        setCartCount(0);
      });
  }, [token]);

  /* ================= LOGOUT ================= */

  function handleLogout() {
    localStorage.removeItem("access_token");
    queryClient.clear();
    setOpen(false);
    navigate("/login", { replace: true });
  }

  function goTo(path: string) {
    setOpen(false);
    navigate(path);
  }

  /* ================= CLOSE DROPDOWN ================= */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="relative z-[100] w-full h-14 bg-black/80 backdrop-blur-md flex items-center justify-between px-4">
        {/* Logo */}
        <img
          src={LogoWhite}
          alt="Foody"
          className="h-7 w-auto cursor-pointer"
          onClick={() => navigate("/home")}
        />

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* CART WITH BADGE */}
          <button
            onClick={() => navigate("/cart")}
            className="relative h-8 w-8 flex items-center justify-center"
          >
            <img
              src={BagWhite}
              alt="Cart"
              className="h-6 w-6"
            />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[11px] rounded-full flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* AVATAR */}
          <div ref={avatarRef} className="relative">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="focus:outline-none"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={profile?.name || "User Avatar"}
                  className="h-8 w-8 rounded-full object-cover border border-neutral-700"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
                  <User size={16} className="text-white" />
                </div>
              )}
            </button>

            {/* DROPDOWN (WEB + MOBILE) */}
            {open && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl z-[999] overflow-hidden">
                {/* Profile */}
                <div className="flex items-center gap-3 px-4 py-4 border-b">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                      <User size={20} className="text-neutral-600" />
                    </div>
                  )}

                  <div className="font-semibold text-sm text-black">
                    {profile?.name || "User"}
                  </div>
                </div>

                {/* Menu */}
                <div className="py-2">
                  <button
                    onClick={() => goTo("/profile")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-100"
                  >
                    <User size={18} />
                    Profile
                  </button>

                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-100"
                  >
                    <MapPin size={18} />
                    Delivery Address
                  </button>

                  <button
                    onClick={() => goTo("/my-orders")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-100"
                  >
                    <FileText size={18} />
                    My Orders
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
