import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let _t = 0;
    const CONNECTION_DIST = 140;
    const PARTICLE_COUNT = 75;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.45 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.015,
      }),
    );

    const draw = () => {
      _t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.pulse += p.pulseSpeed;
        const liveOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        const r = p.radius * (0.85 + 0.15 * Math.sin(p.pulse));

        // Glow halo
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grd.addColorStop(0, `rgba(23,212,255,${liveOpacity * 0.5})`);
        grd.addColorStop(1, "rgba(23,212,255,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(23,212,255,${liveOpacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
            const lineGrd = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y,
            );
            lineGrd.addColorStop(0, `rgba(23,212,255,${alpha})`);
            lineGrd.addColorStop(0.5, `rgba(43,124,255,${alpha * 1.4})`);
            lineGrd.addColorStop(1, `rgba(168,85,247,${alpha * 0.6})`);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineGrd;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
}

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "10M+", label: "Predictions/day" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "<50ms", label: "Avg. Latency" },
];

export default function HeroSection() {
  return (
    <section
      id="platform"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          opacity: 0.28,
        }}
      />

      {/* Grid overlay for depth — FIX 3 */}
      <div className="absolute inset-0 hero-grid" />

      {/* Directional gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.02_240/0.9)] via-[oklch(0.10_0.02_240/0.2)] to-[oklch(0.10_0.02_240/0.98)]" />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* FIX 3: Dual-color volumetric orbs — cyan center + violet offset */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary cyan orb, center */}
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -55%)",
            width: "700px",
            height: "550px",
            borderRadius: "50%",
            background: "oklch(0.82 0.15 200 / 0.10)",
            filter: "blur(100px)",
          }}
        />
        {/* Violet accent orb, bottom-left */}
        <div
          className="absolute"
          style={{
            top: "60%",
            left: "15%",
            width: "480px",
            height: "380px",
            borderRadius: "50%",
            background: "oklch(0.60 0.22 295 / 0.08)",
            filter: "blur(90px)",
          }}
        />
        {/* Magenta flicker, top-right */}
        <div
          className="absolute"
          style={{
            top: "5%",
            right: "10%",
            width: "320px",
            height: "260px",
            borderRadius: "50%",
            background: "oklch(0.65 0.22 320 / 0.05)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-28 pb-36">
        {/* FIX 1: Eyebrow — pill badge with live dot */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="eyebrow-badge">
            <span className="eyebrow-badge-dot" />
            <span className="text-xs font-bold tracking-[0.35em] uppercase text-gradient-cyan">
              All-Knowing AI Platform
            </span>
          </div>
        </motion.div>

        {/* FIX 1: Headline — two-line typographic drama */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold leading-[1.04] tracking-tight mb-6"
        >
          <span className="block text-4xl md:text-5xl lg:text-6xl text-foreground/80 mb-1">
            The Intelligent
          </span>
          <span className="block text-6xl md:text-7xl lg:text-[88px] text-gradient-full">
            Future.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Omnia harnesses the full spectrum of AI — machine learning, computer
          vision, predictive analytics and automation — to transform how
          enterprises operate and compete.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() =>
              document
                .getElementById("capabilities")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-cyan-glow font-semibold px-9 py-3.5 rounded-full text-sm tracking-wide border-0 h-auto"
            data-ocid="hero.primary_button"
          >
            Explore Platform
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="btn-outline-cyan font-semibold px-9 py-3.5 rounded-full text-sm tracking-wide h-auto"
            data-ocid="hero.secondary_button"
          >
            <Play className="mr-2 w-4 h-4 fill-current" />
            Watch Intro
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-14"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.08 }}
              className="text-center"
            >
              <div className="font-display font-bold text-2xl text-gradient-cyan mb-0.5">
                {stat.value}
              </div>
              <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wireframe globe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 right-0 w-64 md:w-80 lg:w-[440px] pointer-events-none select-none translate-x-1/4 translate-y-1/4"
      >
        <img
          src="/assets/generated/wireframe-globe-transparent.dim_600x600.png"
          alt=""
          className="w-full h-full object-contain animate-float"
          style={{
            filter:
              "drop-shadow(0 0 60px oklch(0.82 0.15 200 / 0.55)) drop-shadow(0 0 120px oklch(0.60 0.22 295 / 0.25))",
          }}
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
