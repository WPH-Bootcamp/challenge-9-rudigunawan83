import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRegisterMutation } from "@/services/queries/useAuthMutation";
import AuthTabs from "./AuthTabs";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegisterMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });

    // clear error per field saat user mengetik
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  }

  function validate() {
    const newErrors: typeof errors = {};

    if (!form.name) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Password does not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    mutate(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      },
      {
        onSuccess: () => {
          toast({
            title: "Register success",
            description: "Please login with your account",
          });

          navigate("/login");
        },

        onError: (err: any) => {
          const message =
            err?.response?.data?.message || "Register failed";

          /**
           * 🔥 Error API ditampilkan sebagai helper
           * Default kita taruh di EMAIL (paling sering conflict)
           */
          setErrors({
            email: message,
          });
        },
      }
    );
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
        Create your account to start ordering
      </p>

      <AuthTabs />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* NAME */}
        <div className="flex flex-col gap-1">
          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={
              errors.name
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
          />
          {errors.name && (
            <span className="text-xs text-red-500">
              {errors.name}
            </span>
          )}
        </div>

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

        {/* PHONE */}
        <div className="flex flex-col gap-1">
          <Input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className={
              errors.phone
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
          />
          {errors.phone && (
            <span className="text-xs text-red-500">
              {errors.phone}
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

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col gap-1">
          <div className="relative">
            <Input
              name="confirmPassword"
              type={showConfirmPwd ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`pr-12 ${
                errors.confirmPassword
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPwd(!showConfirmPwd)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
            >
              {showConfirmPwd ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 rounded-xl bg-red-700 text-white hover:bg-red-800"
        >
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </section>
  );
}
