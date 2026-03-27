import {
  ArrowRight,
  Eye,
  LineChart,
  MessageSquareText,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface Feature {
  icon: LucideIcon;
  title: string;
  color: string;
  description: string;
  tags: string[];
  index: number;
}

const features: Feature[] = [
  {
    icon: MessageSquareText,
    title: "Natural Language Processing",
    color: "oklch(0.82 0.15 200)",
    description:
      "Understand, interpret, and generate human language with superhuman accuracy. Power chatbots, sentiment analysis, and document intelligence.",
    tags: ["Text Analysis", "Sentiment Detection", "Language Generation"],
    index: 1,
  },
  {
    icon: Eye,
    title: "Computer Vision",
    color: "oklch(0.55 0.20 255)",
    description:
      "Enable machines to see, recognize, and interpret visual data from images and video with state-of-the-art accuracy.",
    tags: ["Object Detection", "Image Recognition", "Video Analysis"],
    index: 2,
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    color: "oklch(0.60 0.22 295)",
    description:
      "Anticipate future trends and behaviors by leveraging historical data and advanced probabilistic modeling.",
    tags: ["Forecasting", "Risk Modeling", "Demand Prediction"],
    index: 3,
  },
  {
    icon: Zap,
    title: "Automation",
    color: "oklch(0.65 0.22 320)",
    description:
      "Streamline complex workflows with intelligent automation that reduces manual effort and eliminates human error at scale.",
    tags: ["Process Automation", "RPA Integration", "Smart Workflows"],
    index: 4,
  },
];

export default function AdvancedFeatures() {
  return (
    <section id="features" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs tracking-[0.4em] uppercase font-bold text-violet mb-4">
            Cutting Edge AI
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">
            ADVANCED <span className="text-gradient-full">FEATURES</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Industry-leading AI capabilities that go beyond the standard —
            purpose-built for scale, speed, and precision.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="features.list"
        >
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative rounded-2xl border-neon card-glow p-6 flex flex-col group cursor-default overflow-hidden"
              style={{ backgroundColor: "oklch(0.15 0.03 240)" }}
              data-ocid={`features.card.${feat.index}`}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, color-mix(in oklch, ${feat.color} 8%, transparent) 0%, transparent 70%)`,
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0 relative"
                style={{
                  background: `color-mix(in oklch, ${feat.color} 12%, transparent)`,
                  border: `1px solid color-mix(in oklch, ${feat.color} 25%, transparent)`,
                }}
              >
                <feat.icon
                  size={24}
                  style={{ color: feat.color }}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-3 tracking-tight relative">
                {feat.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1 relative">
                {feat.description}
              </p>
              <ul className="space-y-2 mb-5 relative">
                {feat.tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: feat.color }}
                    />
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase transition-all duration-200 group-hover:gap-2 relative"
                style={{ color: "oklch(0.82 0.15 200)" }}
                data-ocid="features.link"
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
