import { ArrowRight, BarChart3, Brain, Cpu, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface Capability {
  icon: LucideIcon;
  title: string;
  color: string;
  glowColor: string;
  description: string;
  features: string[];
  index: number;
}

const capabilities: Capability[] = [
  {
    icon: Brain,
    title: "Data Science",
    color: "oklch(0.82 0.15 200)",
    glowColor: "oklch(0.82 0.15 200 / 0.12)",
    description:
      "Transforming raw data into actionable intelligence through advanced analytics and modeling.",
    features: ["Machine Learning", "Deep Learning", "Data Visualization"],
    index: 1,
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    color: "oklch(0.55 0.20 255)",
    glowColor: "oklch(0.55 0.20 255 / 0.12)",
    description:
      "AI-powered marketing strategies that amplify reach and maximize conversion rates.",
    features: [
      "SEO Optimization",
      "Social Media Management",
      "Content Creation",
    ],
    index: 2,
  },
  {
    icon: Cpu,
    title: "Tech Innovation",
    color: "oklch(0.60 0.22 295)",
    glowColor: "oklch(0.60 0.22 295 / 0.12)",
    description:
      "Cutting-edge technology solutions driving digital transformation at every scale.",
    features: ["IoT Solutions", "Cloud Management", "Cybersecurity"],
    index: 3,
  },
  {
    icon: BarChart3,
    title: "Advanced Analysis",
    color: "oklch(0.65 0.22 320)",
    glowColor: "oklch(0.65 0.22 320 / 0.12)",
    description:
      "Deep analytical capabilities that uncover hidden patterns and business opportunities.",
    features: ["Data Analyst", "Business Intelligence"],
    index: 4,
  },
];

export default function CoreCapabilities() {
  return (
    <section
      id="capabilities"
      className="py-28 px-6"
      style={{ backgroundColor: "oklch(0.12 0.025 240)" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs tracking-[0.4em] uppercase font-bold text-cyan mb-4">
            What We Offer
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">
            CORE <span className="text-gradient-cyan">CAPABILITIES</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Four pillars of intelligence, engineered to solve your most complex
            challenges.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="capabilities.list"
        >
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.11,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl border-neon card-glow card-top-accent p-6 flex flex-col group cursor-default overflow-hidden"
              style={{ backgroundColor: "oklch(0.15 0.03 240)" }}
              data-ocid={`capabilities.card.${cap.index}`}
            >
              {/* FIX 2: Per-card radial glow on hover (matches AdvancedFeatures) */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% -10%, ${cap.glowColor} 0%, transparent 65%)`,
                }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0 relative z-10"
                style={{
                  background: `color-mix(in oklch, ${cap.color} 12%, transparent)`,
                  border: `1px solid color-mix(in oklch, ${cap.color} 28%, transparent)`,
                }}
              >
                <cap.icon
                  size={24}
                  style={{ color: cap.color }}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="font-display font-bold text-lg text-foreground mb-3 tracking-tight relative z-10">
                {cap.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1 relative z-10">
                {cap.description}
              </p>
              <ul className="space-y-2 mb-5 relative z-10">
                {cap.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cap.color }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase transition-all duration-200 group-hover:gap-2 relative z-10"
                style={{ color: "oklch(0.82 0.15 200)" }}
                data-ocid="capabilities.link"
              >
                Learn More <ArrowRight size={12} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
