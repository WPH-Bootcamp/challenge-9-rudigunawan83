import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, FileText, LogOut, User } from "lucide-react";

import { useProfileQuery } from "@/services/queries/useProfileQuery";
import api from "@/services/api/axios";

import LogoWhite from "@/assets/Logo-white.png";
import BagWhite from "@/assets/Bag-white.png";

import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const navigate = useNavigate();
  const { data: profile } = useProfileQuery();

  const [open, setOpen] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);

  const hasAvatar =
    profile?.avatar && profile.avatar.trim() !== "";

  const queryClient = useQueryClient();

  const avatarUrl =
    hasAvatar && profile!.avatar.startsWith("http")
      ? profile!.avatar
      : hasAvatar
      ? `${api.defaults.baseURL}/${profile!.avatar}`
      : null;

  function handleLogout() {
    // 1. Hapus token
  localStorage.removeItem("access_token");

  // 2. Clear user-related cache
  queryClient.clear();

  // 3. Tutup dropdown
  setOpen(false);

  // 4. Redirect ke login (web & mobile)
  navigate("/login", { replace: true });
  }

  // Close dropdown when click outside
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
      <header className="relative z-[100] w-full h-14 bg-black/90 backdrop-blur-md flex items-center justify-between px-4">
        {/* Logo */}
        <img
          src={LogoWhite}
          alt="Foody"
          className="h-7 w-auto"
        />

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button className="h-8 w-8 flex items-center justify-center">
            <img
              src={BagWhite}
              alt="Cart"
              className="h-6 w-6"
            />
          </button>

          {/* Avatar / User Icon */}
          <button
            ref={avatarRef}
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
        </div>
      </header>

      {/* DROPDOWN PROFILE */}
      {open && (
        <div className="fixed top-16 right-4 w-56 bg-white rounded-2xl shadow-2xl z-[999] overflow-hidden">
          {/* Profile */}
          <div className="flex items-center gap-3 px-4 py-4 border-b">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
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
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-100">
              <MapPin size={18} />
              Delivery Address
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-100">
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
    </>
  );
}
