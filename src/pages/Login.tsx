import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import HomeImage from "@/assets/Home.png";

export default function Login() {
  const navigate = useNavigate();

  // 🔥 terima token dari LoginForm
  const handleLoginSuccess = (token: string) => {
    if (!token) {
      alert("Login berhasil tapi token kosong");
      return;
    }

    // ✅ SIMPAN TOKEN
    localStorage.setItem("access_token", token);

    // ✅ redirect
    navigate("/home");
  };

  return (
    <main className="min-h-screen bg-white flex">
      {/* LEFT IMAGE (DESKTOP ONLY) */}
      <div className="hidden lg:flex lg:w-1/2 h-screen">
        <img
          src={HomeImage}
          alt="Home Banner"
          className="w-full h-full object-cover"
        />
      </div>

        {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="w-full max-w-[420px]">
          {/* ✅ TIDAK ADA PROP */}
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
