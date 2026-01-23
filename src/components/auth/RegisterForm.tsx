import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthTabs from "@/components/auth/AuthTabs";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section
      className="
        w-[345px]
        bg-white rounded-3xl
        px-5 py-6
        flex flex-col gap-4
        shadow-sm
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/Foody.png" alt="Foody Logo" className="h-8 w-8" />
        <span className="text-base font-semibold">Foody</span>
      </div>

      {/* Heading */}
      <h1
        className="
          font-display font-extrabold
          text-[32px] leading-[40px]
          tracking-normal text-neutral-900
        "
      >
        Welcome <br /> Back
      </h1>

      <p className="text-sm text-neutral-500">
        Good to see you again! Let’s eat
      </p>

      {/* Tabs (Sign up active visually handled inside AuthTabs later) */}
      <AuthTabs />

      {/* FORM REGISTER */}
      <form className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Name"
          className="h-12 rounded-xl"
        />

        <Input
          type="email"
          placeholder="Email"
          className="h-12 rounded-xl"
        />

        <Input
          type="tel"
          placeholder="Number Phone"
          className="h-12 rounded-xl"
        />

        {/* Password */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-12 rounded-xl pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              !bg-transparent !border-0 !shadow-none
              p-0 m-0 appearance-none
              text-neutral-500 hover:text-neutral-700
            "
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="h-12 rounded-xl pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              !bg-transparent !border-0 !shadow-none
              p-0 m-0 appearance-none
              text-neutral-500 hover:text-neutral-700
            "
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          className="
            h-12 rounded-xl text-base font-semibold
            !bg-red-700 !text-white
            hover:!bg-red-800
          "
        >
          Register
        </Button>
      </form>
    </section>
  );
}
