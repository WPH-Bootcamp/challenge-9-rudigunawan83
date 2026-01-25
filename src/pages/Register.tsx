import RegisterForm from "@/components/auth/RegisterForm";
import HomeImage from "@/assets/Home.png";

export default function Register() {
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
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
