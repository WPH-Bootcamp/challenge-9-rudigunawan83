import AuthTabs from "@/components/auth/AuthTabs"

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-neutral-700 flex justify-center items-center">
      <div className="w-full max-w-[390px] bg-white rounded-lg px-6 py-10">
        <AuthTabs />
      </div>
    </main>
  )
}
