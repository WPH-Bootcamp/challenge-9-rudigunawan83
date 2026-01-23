import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function AuthTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <div
      className="
        w-full h-12 flex p-1 rounded-2xl
        !bg-neutral-100
      "
    >
      {/* SIGN IN */}
      <button
        type="button"
        onClick={() => navigate("/login")}
        className={cn(
          "flex-1 rounded-xl text-sm font-semibold transition-all",
          isLogin
            ? "!bg-white !text-neutral-900 shadow-sm"
            : "!bg-transparent !text-neutral-500"
        )}
      >
        Sign in
      </button>

      {/* SIGN UP */}
      <button
        type="button"
        onClick={() => navigate("/register")}
        className={cn(
          "flex-1 rounded-xl text-sm font-semibold transition-all",
          isRegister
            ? "!bg-white !text-neutral-900 shadow-sm"
            : "!bg-transparent !text-neutral-500"
        )}
      >
        Sign up
      </button>
    </div>
  );
}
