import { useState } from "react"

export default function Generator() {
  const [prompt, setPrompt] = useState("")
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [script, setScript] = useState("")
  const [img, setImg] = useState<string | null>(null)
  const [key, setKey] = useState("")
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) {
    return (
      <div style={{ padding: 40, maxWidth: 400, margin: "0 auto" }}>
        <h2>Private Generator</h2>
        <input
          type="password"
          placeholder="Enter access key"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
        <button
          onClick={() => key === "omnia2024" ? setUnlocked(true) : alert("Wrong key")}
          style={{ marginTop: 12, width: "100%" }}
        >
          Unlock
        </button>
      </div>
    )
  }

  const onImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImg(reader.result as string)
    reader.readAsDataURL(file)
  }

const previewAndMake = async () => {
  if (!img || !script) return alert("Add image + script")
  setLoading(true)
  setVideoUrl(null)
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/generate?prompt=${encodeURIComponent(script)}`, {
      method: "POST",
      headers: { "x-api-key": import.meta.env.VITE_API_KEY }
    })

      if (!res.ok) {
        throw new Error(`Video generation failed (${res.status})`)
      }

      const data = await res.json()
      if (!data.videoUrl) throw new Error("Backend did not return videoUrl")
      setVideoUrl(data.videoUrl)
    } catch (error) {
      alert(`Failed: ${error instanceof Error ? error.message : error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", color: "#fff", padding: 32 }}>
      <div style={{
        maxWidth: 640,
        margin: "0 auto",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 20,
        padding: 24,
        boxShadow: "0 0 40px rgba(109,40,255,0.25)"
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: 0.5 }}>Omnia MP4 Generator</h1>
        <p style={{ opacity: 0.7, marginTop: 6 }}>Cinematic 9:16 • Glow Forge</p>

        <input
          type="file"
          accept="image/*"
          onChange={onImg}
          style={{ marginTop: 16, width: "100%", padding: 12, background: "#111", border: "1px solid #333", borderRadius: 12, color: "#fff" }}
        />

        <input
          placeholder="Prompt: 90s office zoom"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          style={{ width: "100%", marginTop: 12, padding: 14, borderRadius: 12, background: "#0f0f0f", border: "1px solid #333", color: "#fff" }}
        />

        <textarea
          value={script}
          onChange={(event) => setScript(event.target.value)}
          placeholder="Paste script here..."
          rows={8}
          style={{ width: "100%", marginTop: 12, padding: 14, borderRadius: 12, background: "#0f0f0f", border: "1px solid #333", color: "#fff" }}
        />

        <div style={{ width: "100%", aspectRatio: "9/16", background: "#111", borderRadius: 16, overflow: "hidden", marginTop: 12 }}>
          {videoUrl ? (
            <video src={videoUrl} controls autoPlay style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : img ? (
            <img src={img} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ display: "grid", height: "100%", placeItems: "center", opacity: 0.5 }}>Add an image</div>
          )}
        </div>

        <button
          onClick={previewAndMake}
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate MP4 🎬"}
        </button>

        {videoUrl && (
          <a href={videoUrl} download style={{ display: "block", marginTop: 12, textAlign: "center", color: "#fff" }}>
            Download MP4
          </a>
        )}
      </div>
    </div>
  )
}
