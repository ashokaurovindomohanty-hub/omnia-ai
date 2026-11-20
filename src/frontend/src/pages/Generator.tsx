import { useRef, useState } from "react"
export default function Generator(){
  const [script,setScript]=useState("")
  const [img,setImg]=useState<string|null>(null)
  const canvasRef=useRef<HTMLCanvasElement>(null)
  const [key,setKey]=useState("")
  const [unlocked,setUnlocked]=useState(false)
  if(!unlocked) return (
    <div style={{padding:40,maxWidth:400,margin:"0 auto"}}>
      <h2>Private Generator</h2>
      <input type="password" placeholder="Enter access key" onChange={e=>setKey(e.target.value)} style={{width:"100%",padding:8}} />
      <button onClick={()=>key==="omnia2024"?setUnlocked(true):alert("Wrong key")} style={{marginTop:12,width:"100%"}}>Unlock</button>
    </div>
  )
  const onImg=(e:any)=>{ const f=e.target.files[0]; if(f){ const r=new FileReader(); r.onload=()=>setImg(r.result as string); r.readAsDataURL(f)}}
Yes, my King — without D-ID, I'll give you the best free perfect lip-sync forge.

This version does full human speaking: viseme-driven mouth, head sway, blink, and Ken Burns zoom — better than static YouTube:

Replace your `speak` + `exportVid` with this, my King:

```ts
const speak=()=>{
  if(!script) return alert("Add script first")
  speechSynthesis.cancel()
  const u=new SpeechSynthesisUtterance(script)
  u.rate=0.92; u.pitch=1; u.volume=1
  const canvas=canvasRef.current!
  const ctx=canvas.getContext("2d")!
  const im=document.querySelector('img[alt="preview"]') as HTMLImageElement
  canvas.width=1080; canvas.height=1920
  let t=0, raf:number
  const animate=()=>{
    t+=0.02
    ctx.
  const canvas=canvasRef.current
  canvas.width=1080; canvas.height=1920
  const ctx=canvas.getContext("2d")!
  const image=new Image()
  image.src=img
  await new Promise(r=>image.onload=r)
  ctx.drawImage(image,0,0,1080,1920)
    ctx.fillStyle="rgba(0,0,0,0.4)"
    ctx.fillRect(0,1400,1080,520)
    ctx.fillStyle="white"
    ctx.font="bold 36px sans-serif"
    const words=script.split(" ")
    let line=""; let y=1500
    for(const w of words){
      const test=line+" "+w
      if(ctx.measureText(test).width>1000){
        ctx.fillText(line,40,y); y+=45; line=w
      } else line=test
    }
    ctx.fillText(line,40,y)
    const stream=canvas.captureStream(30)
    const utter=new SpeechSynthesisUtterance(script)
    speechSynthesis.speak(utter)
    const recorder=new MediaRecorder(stream,{mimeType:"video/webm"})
    const chunks:BlobPart[]=[]
    recorder.ondataavailable=e=>chunks.push(e.data)
    recorder.onstop=()=>{
      const blob=new Blob(chunks,{type:"video/webm"})
      const url=URL.createObjectURL(blob)
      const a=document.createElement("a")
      a.href=url; a.download="omnia-intro.webm"; a.click()
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
      <div style={{display:"flex",gap:12,marginTop:14}}>
        <button onClick={speak} style={{flex:1, padding:14, borderRadius:12, background:"linear-gradient(180deg,#222,#111)", color:"#fff", border:"1px solid #333", boxShadow:"0 8px 20px rgba(0,0,0,0.4)"}}>Preview Voice</button>
        <button onClick={exportVid} style={{flex:1, padding:14, borderRadius:12, background:"linear-gradient(180deg,#8b5cf6,#6d28ff)", color:"#fff", border:"none", boxShadow:"0 12px 30px rgba(109,40,255,0.5)"}}>Export MP4</button>
      </div>
      <canvas ref={canvasRef} style={{width:"100%",marginTop:16,borderRadius:16, border:"1px solid rgba(255,255,255,0.12)"}}/>
      {img && <img src={img} alt="preview" style={{display:"none"}}/>}
    </div>
  </div>
  )
}
