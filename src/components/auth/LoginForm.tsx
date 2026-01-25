import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useLoginMutation } from "@/services/queries/useAuthMutation";
import AuthTabs from "./AuthTabs";

export default function LoginForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useLoginMutation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [showPwd, setShowPwd] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  }

  function validate() {
    const newErrors: typeof errors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    mutate(form, {
      onSuccess: (res: any) => {
        /**
         * 🔥 FIX UTAMA DI SINI
         * Kita ambil token secara aman,
         * apapun bentuk response backend
         */
        const token =
          res?.data?.accessToken ||
          res?.data?.token ||
          res?.accessToken ||
          res?.token;

        if (!token) {
          setErrors({
            password: "Login berhasil tapi token tidak ditemukan",
          });
          return;
        }

        // SIMPAN TOKEN (PASTI STRING VALID)
        localStorage.setItem("access_token", token);

        // toast({
        //   title: "Login success",
        //   description: "Welcome back 👋",
        // });

        navigate("/home");
      },

      onError: (err: any) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Login failed";

        setErrors({
          password: message,
        });
      },
    });
  }

  return (
    <section className="w-[345px] bg-white rounded-3xl px-5 py-6 flex flex-col gap-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img src="/Foody.png" alt="Foody" className="h-8 w-8" />
        <span className="font-semibold">Foody</span>
      </div>

      <h1 className="font-extrabold text-[32px] leading-[40px]">
        Welcome <br /> Back
      </h1>

      <p className="text-sm text-neutral-500">
        Good to see you again! Let’s eat
      </p>

      <AuthTabs />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={
              errors.email
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
          />
          {errors.email && (
            <span className="text-xs text-red-500">
              {errors.email}
            </span>
          )}
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-1">
          <div className="relative">
            <Input
              name="password"
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`pr-12 ${
                errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
            >
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password}
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 rounded-xl bg-red-700 text-white hover:bg-red-800"
        >
          {isPending ? "Signing in..." : "Login"}
        </Button>
      </form>
    </section>
  );
}
