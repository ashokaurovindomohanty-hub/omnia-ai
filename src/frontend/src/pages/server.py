from flask import Flask, request, send_file
import subprocess, base64
app = Flask(__name__)
@app.post("/generate")
def gen():
  data=request.json
  open("input.wav","wb").write(base64.b64decode(data["audio_b64"]))
  open("input.jpg","wb").write(base64.b64decode(data["img_b64"].split(",")[1]))
  subprocess.run(["python","inference.py","--checkpoint_path","checkpoints/wav2lip_gan.pth","--face","input.jpg","--audio","input.wav","--outfile","result.mp4"])
  return send_file("result.mp4", mimetype="video/mp4")
app.run(port=5000)
