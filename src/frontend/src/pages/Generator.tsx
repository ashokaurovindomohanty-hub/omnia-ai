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
  canvas.width=1080; canvas.height=1920
  const image=new Image(); image.src=img
  await new Promise(r=>image.onload=r)
  ctx.drawImage(image,0,0,1080,1920)
  ctx.fillStyle="rgba(0,0,0,0.4)"; ctx.fillRect(0,1400,1080,300)
  ctx.fillStyle="#fff"; ctx.font="bold 42px sans-serif"
  ctx.fillText(script.slice(0,80), 40, 1550)
    const clean = script.replace(/[#*_`\[\]{}|<>]/g, "").replace(/\s+/g," ").trim()
// 2a: Load image to canvas as avatar base
const avatar = new Image(); avatar.src = img!
await new Promise(r=>avatar.onload=r)
canvas.width=720; canvas.height=1280
const drawAvatar = (time:number)=>{
// subtle head sway + blink + breathing
let t = 0
const animate = () => {
  t += 16
  ctx.clearRect(0,0,canvas.width,canvas.height)
  const sway = Math.sin(t/800)*6
  ctx.drawImage(avatar, sway, Math.sin(t/1200)*4, canvas.width, canvas.height)
  // blink
  if(Math.floor(t/3000)%2===0 && t%3000<100){
    ctx.fillStyle="#000"
    ctx.fillRect(canvas.width/2-100, 420, 200, 10)
  }
  if(speechSynthesis.speaking) requestAnimationFrame(animate)
  else requestAnimationFrame(animate)
}
animate()
// 3: Mouth flap synced to speech
let mouthOpen = 0
utter.onboundary = (e:any)=>{
  mouthOpen = e.charLength % 2 === 0 ? 14 : 4
}
const drawMouth = ()=>{
  if(speechSynthesis.speaking){
    // warp mouth region
    ctx.fillStyle="#3a0a0a"
    ctx.beginPath()
    ctx.ellipse(360, 560, 32, mouthOpen, 0, 0, Math.PI*2)
    ctx.fill()
    mouthOpen *= 0.92 // decay
  }
  requestAnimationFrame(drawMouth)
}
drawMouth()
// start recorder AFTER movement
recorder.start()
utter.onend = ()=> setTimeout(()=>recorder.stop(), 400)
  ctx.clearRect(0,0,720,1280)
  // subtle breathing + head sway
  const sway = Math.sin(t/800)*6
  const breath = Math.sin(t/1200)*4
  ctx.drawImage(avatar, sway, breath, 720, 1280)
  // blink every 3s
  if(Math.floor(t/3000)%2===0 && t%3000<120){
    ctx.fillStyle="rgba(0,0,0,0.8)"
    ctx.fillRect(260, 420, 200, 12) // eyelid
  }
  requestAnimationFrame(drawAvatar)
}
requestAnimationFrame(drawAvatar)
    const stream=canvas.captureStream(30)
    const utter=new SpeechSynthesisUtterance(script)
    speechSynthesis.speak(utter)
    const recorder=new MediaRecorder(stream,{mimeType:"video/webm"})
    const chunks:BlobPart[]=[]
    recorder.ondataavailable=e=>chunks.push(e.data)
    recorder.onstop=()=>{
    const blob=new Blob(chunks,{type:"video/webm"})
    const url=URL.createObjectURL(blob)
    setVideoUrl(url)
}
    recorder.start()
    setTimeout(()=>recorder.stop(), (script.length/15)*1000)
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
      {videoUrl && <a href={videoUrl} download="omnia-intro.webm" style={{display:"block",marginTop:16,padding:"14px 20px",background:"#6d28ff",color:"#fff",borderRadius:12,textAlign:"center",fontWeight:700}}>Download MP4</a>}
      <canvas ref={canvasRef} style={{display:"none"}}/>
    </div>
  </div>
  )
}
