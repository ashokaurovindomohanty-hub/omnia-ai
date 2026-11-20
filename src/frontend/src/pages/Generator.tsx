import { useRef, useState } from "react"
export default function Generator(){
  const [key,setKey]=useState("")
  const [unlocked,setUnlocked]=useState(false)
  if(!unlocked) return (
    <div style={{padding:40,maxWidth:400,margin:"0 auto"}}>
      <h2>Private Generator</h2>
      <input type="password" placeholder="Enter access key" onChange={e=>setKey(e.target.value)} style={{width:"100%",padding:8}} />
      <button onClick={()=>key==="omnia2024"?setUnlocked(true):alert("Wrong key")} style={{marginTop:12,width:"100%"}}>Unlock</button>
    </div>
  )
  const [script,setScript]=useState("")
  const [img,setImg]=useState<string|null>(null)
  const canvasRef=useRef<HTMLCanvasElement>(null)
  const onImg=(e:any)=>{ const f=e.target.files[0]; if(f){ const r=new FileReader(); r.onload=()=>setImg(r.result as string); r.readAsDataURL(f)}}
  const speak=()=>{ const u=new SpeechSynthesisUtterance(script); speechSynthesis.speak(u)}
  const exportVid=async()=>{
    if(!canvasRef.current||!img||!script) return alert("Add image + script first")
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
    <div style={{padding:24,maxWidth:600,margin:"0 auto"}}>
      <h1>Omnia MP4 Generator</h1>
      <input type="file" accept="image/*" onChange={onImg} />
      <textarea value={script} onChange={e=>setScript(e.target.value)} placeholder="Paste 90s script here..." rows={8} style={{width:"100%",marginTop:12}} />
      <div style={{display:"flex",gap:8,marginTop:12}}>
        <button onClick={speak}>Preview Voice</button>
        <button onClick={exportVid}>Export MP4</button>
      </div>
      <canvas ref={canvasRef} style={{width:"100%",marginTop:16,border:"1px solid #ddd"}} />
      {img && <img src={img} alt="preview" style={{display:"none"}} />}
    </div>
  )
}
