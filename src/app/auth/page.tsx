import AuthTabs from "@/components/auth/AuthTabs"

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[390px] px-6 pt-12">
        <AuthTabs />
      </div>
    </main>
  )
}
