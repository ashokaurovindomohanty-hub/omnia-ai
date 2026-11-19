import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function DemoRequest() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!form.name || !form.email) {
    toast.error("Please fill in your name and email.");
    return;
  }
  setSubmitting(true);
  await new Promise((r) => setTimeout(r, 1200));
  setSubmitting(false);
  toast.success("Demo link sent!");
  window.location.href = `/demo?email=${form.email}`;
};

  return (
    <section
      id="demo"
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.12 0.025 240)" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "oklch(0.82 0.15 200 / 0.04)",
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase font-bold text-cyan mb-4">
            <Sparkles size={12} />
            Get Started
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground mb-4">
            Request a <span className="text-gradient-cyan">Demo</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            See Omnia in action. Schedule a personalized demo with our AI
            experts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="border-neon card-glow rounded-2xl p-8"
          style={{ backgroundColor: "oklch(0.15 0.03 240)" }}
          data-ocid="demo.modal"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
              data-ocid="demo.success_state"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.82 0.15 200 / 0.15)" }}
              >
                <Sparkles size={28} className="text-cyan" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                You're on the list!
              </h3>
              <p className="text-muted-foreground text-sm">
                Our team will reach out within 24 hours.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="ghost"
                className="mt-6 text-cyan hover:text-cyan/80"
                data-ocid="demo.secondary_button"
              >
                Submit another request
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-xs tracking-wider uppercase text-muted-foreground"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="rounded-xl"
                    style={{
                      backgroundColor: "oklch(0.10 0.02 240)",
                      borderColor: "oklch(0.22 0.04 240)",
                    }}
                    data-ocid="demo.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs tracking-wider uppercase text-muted-foreground"
                  >
                    Work Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="rounded-xl"
                    style={{
                      backgroundColor: "oklch(0.10 0.02 240)",
                      borderColor: "oklch(0.22 0.04 240)",
                    }}
                    data-ocid="demo.input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="company"
                  className="text-xs tracking-wider uppercase text-muted-foreground"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className="rounded-xl"
                  style={{
                    backgroundColor: "oklch(0.10 0.02 240)",
                    borderColor: "oklch(0.22 0.04 240)",
                  }}
                  data-ocid="demo.input"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-xs tracking-wider uppercase text-muted-foreground"
                >
                  How can Omnia help you?
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your use case and goals..."
                  rows={4}
                  className="rounded-xl resize-none"
                  style={{
                    backgroundColor: "oklch(0.10 0.02 240)",
                    borderColor: "oklch(0.22 0.04 240)",
                  }}
                  data-ocid="demo.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="btn-cyan-glow w-full font-semibold py-3 rounded-xl text-sm tracking-wide border-0 h-auto"
                data-ocid="demo.submit_button"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending Request...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={15} /> Request Demo
                  </span>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
