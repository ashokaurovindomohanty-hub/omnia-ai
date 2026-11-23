import { useRef, useState } from "react"
export default function Generator(){
  const [script,setScript]=useState("")
  const [img,setImg]=useState<string|null>(null)
  const canvasRef=useRef<HTMLCanvasElement>(null)
  const [key,setKey]=useState("")
  const [unlocked,setUnlocked]=useState(false)
  const [videoUrl,setVideoUrl]=useState<string|null>(null)
  if(!unlocked) return (
    <div style={{padding:40,maxWidth:400,margin:"0 auto"}}>
      <h2>Private Generator</h2>
      <input type="password" placeholder="Enter access key" onChange={e=>setKey(e.target.value)} style={{width:"100%",padding:8}} />
      <button onClick={()=>key==="omnia2024"?setUnlocked(true):alert("Wrong key")} style={{marginTop:12,width:"100%"}}>Unlock</button>
    </div>
  )
  const onImg=(e:any)=>{ const f=e.target.files[0]; if(f){ const r=new FileReader(); r.onload=()=>setImg(r.result as string); r.readAsDataURL(f)}}
  const previewAndMake=async()=>{
  if(!img||!script) return alert("Add image + script")
  await exportVid() 
}
const exportVid=async()=>{
  if(!canvasRef.current||!img||!script) return alert("Add image + script")
  const canvas=canvasRef.current; const ctx=canvas.getContext("2d")!
const res = await fetch("https://AshokAMohanty-omnia-wav2lip.hf.space/generate",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body: JSON.stringify({
    img_b64: canvas.toDataURL("image/jpeg"),
    audio_b64: await fetch(URL.createObjectURL(audioBlob)).then(r=>r.arrayBuffer()).then(b=>btoa(String.fromCharCode(...new Uint8Array(b))))
  })
})
if(!res.ok){ alert("Space sleeping, wait 30s and tap again"); return }
const blob = await res.blob()
const url = URL.createObjectURL(blob)
video.src = url
setVideoUrl(url)
}
  return (
  <div style={{minHeight:"100vh", background:"radial-gradient(1200px 600px at 50% -10%, #6d28ff33, transparent), #07070a", color:"#fff", padding:32}}>
    <div style={{maxWidth:640, margin:"0 auto", background:"rgba(255,255,255,0.06)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:20, padding:24, boxShadow:"0 20px 60px rgba(109,40,255,0.35)"}}>
      <h1 style={{fontSize:28, fontWeight:800, letterSpacing:0.5, textShadow:"0 0 20px rgba(109,40,255,0.8)"}}>Omnia MP4 Generator</h1>
      <p style={{opacity:0.7, marginTop:6}}>Cinematic 9:16 • Glow Forge</p>
      <input type="file" accept="image/*" onChange={onImg} style={{marginTop:16, width:"100%", padding:12, background:"#111", border:"1px solid #333", borderRadius:12, color:"#fff"}}/>
      <textarea value={script} onChange={e=>setScript(e.target.value)} placeholder="Paste 90s script here..." rows={8} style={{width:"100%",marginTop:12, padding:14, borderRadius:12, background:"#0f0f12", color:"#fff", border:"1px solid #2a2a30", outline:"none"}}/>
      <div onClick={previewAndMake} style={{width:"100%",aspectRatio:"9/16",background:"#000",borderRadius:16,overflow:"hidden",cursor:"pointer"}}>
       {videoUrl ? <video src={videoUrl} autoPlay controls style={{width:"100%",height:"100%"}}/> : img ? <img src={img} alt="preview" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{opacity:0.5,display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}>Tap to preview</span>}
      </div>
      <p className="text-xs text-slate-500">Add 3-5 photos - tap ✕ to remove, Clear all to cancel</p>
      <button onClick={generate} className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50">
       Generate Mp4 🎬
      </button>
      {videoUrl && <><video src={videoUrl} controls autoPlay /><a href={videoUrl} download>Download MP4</a></>}
      <canvas ref={canvasRef} style={{display:"none"}}/>
    </div>
  </div>
  )
}
