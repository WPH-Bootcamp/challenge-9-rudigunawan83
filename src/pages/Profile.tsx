import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= TYPES ================= */

type ProfileData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
};

/* ================= API ================= */

async function fetchProfile(token: string): Promise<ProfileData> {
  const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Unauthorized");
  const json = await res.json();
  return json.data;
}

async function updateProfile(
  token: string,
  payload: FormData
): Promise<ProfileData> {
  const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: payload,
  });

  if (!res.ok) throw new Error("Update failed");
  const json = await res.json();
  return json.data;
}

/* ================= PAGE ================= */

export default function Profile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("access_token");

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, [token, navigate]);

  /* ================= LOAD PROFILE ================= */
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(token!),
    enabled: !!token,
  });

  /* ================= EDIT MODE ================= */
  const [isEditing, setIsEditing] = useState(false);

  /* ================= FORM STATE ================= */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setPhone(profile.phone);
    }
  }, [profile]);

  /* ================= AVATAR PREVIEW ================= */
  const avatarPreview = useMemo(() => {
    if (avatarFile) return URL.createObjectURL(avatarFile);
    return profile?.avatar || null;
  }, [avatarFile, profile]);

  useEffect(() => {
    return () => {
      if (avatarFile && avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarFile, avatarPreview]);

  /* ================= UPDATE MUTATION ================= */
  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      updateProfile(token!, formData),
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      setAvatarFile(null);
      setIsEditing(false);
      alert("Profile berhasil diperbarui");
    },
    onError: () => alert("Gagal update profile"),
  });

  const handleSave = () => {
    if (!token) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (avatarFile) formData.append("avatar", avatarFile);

    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          Loading...
        </main>
        <Footer />
      </>
    );
  }

  if (!profile) return null;

  return (
    <>
      <Header />

      <main className="bg-neutral-50 min-h-screen px-4 lg:px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ================= SIDEBAR ================= */}
          <aside className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow p-5">
              <div className="flex items-center gap-3 mb-4">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center">
                    👤
                  </div>
                )}
                <p className="font-semibold">{profile.name}</p>
              </div>

              <hr className="my-4" />

              <ul className="space-y-3 text-sm">
                <li className="px-3 py-2 rounded-lg bg-red-50 text-red-600 font-medium">
                  👤 Profile
                </li>

                <li
                  onClick={() => navigate("/profile/address")}
                  className="px-3 py-2 rounded-lg hover:bg-neutral-100 cursor-pointer"
                >
                  📍 Delivery Address
                </li>

                <li
                  onClick={() => navigate("/my-orders")}
                  className="px-3 py-2 rounded-lg hover:bg-neutral-100 cursor-pointer"
                >
                  📦 My Orders
                </li>

                <li
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    navigate("/login");
                  }}
                  className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  🚪 Logout
                </li>
              </ul>
            </div>
          </aside>

          {/* ================= CONTENT ================= */}
          <section className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>

            <div className="bg-white rounded-2xl p-6 shadow max-w-xl">
              {/* AVATAR */}
              <div className="flex items-center gap-4 mb-6">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center">
                    👤
                  </div>
                )}

                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setAvatarFile(
                        e.target.files?.[0] || null
                      )
                    }
                  />
                )}
              </div>

              {/* VIEW MODE */}
              {!isEditing && (
                <div className="space-y-4 mb-6">
                  <Row label="Name" value={profile.name} />
                  <Row label="Email" value={profile.email} />
                  <Row
                    label="Nomor Handphone"
                    value={profile.phone}
                  />
                </div>
              )}

              {/* EDIT MODE */}
              {isEditing && (
                <div className="space-y-4 mb-6">
                  <Input
                    label="Name"
                    value={name}
                    onChange={setName}
                  />
                  <Input
                    label="Email"
                    value={email}
                    onChange={setEmail}
                  />
                  <Input
                    label="Nomor Handphone"
                    value={phone}
                    onChange={setPhone}
                  />
                </div>
              )}

              {/* ACTION BUTTON */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-red-600 text-white py-3 rounded-full"
                >
                  Update Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={mutation.isPending}
                    className="flex-1 bg-red-600 text-white py-3 rounded-full disabled:opacity-50"
                  >
                    {mutation.isPending
                      ? "Saving..."
                      : "Save"}
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 border py-3 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ================= UI HELPERS ================= */

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm text-neutral-500 block mb-1">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      />
    </div>
  );
}
