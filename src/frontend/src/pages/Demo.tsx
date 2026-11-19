import { useSearchParams } from "react-router-dom"
export default function Demo(){
  const [params] = useSearchParams()
  const email = params.get("email") || "there"
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mt-12">Welcome {email} to Omnia AI</h1>
      <p className="text-gray-400 mt-4">Your personalized demo by Mikasa</p>
      <div className="w-full max-w-3xl aspect-video bg-zinc-900 rounded-2xl mt-8 flex items-center justify-center border border-white/10">
        <p className="text-zinc-500">[ Avatar Video Placeholder - 90s walkthrough ]</p>
      </div>
      <a href="/#pricing" className="mt-8 px-8 py-4 bg-white text-black rounded-full font-semibold">Request Full Disclosure → Book Call</a>
    </div>
  )
}
