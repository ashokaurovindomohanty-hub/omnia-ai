import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#capabilities" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleDemoClick = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.10_0.02_240/0.95)] backdrop-blur-xl border-b border-[oklch(0.82_0.15_200/0.12)]"
          : "bg-[oklch(0.10_0.02_240/0.55)] backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#platform"
          className="flex items-center gap-3 group"
          data-ocid="nav.link"
        >
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.82_0.15_200)] to-[oklch(0.55_0.20_255)] opacity-90" />
            <div className="absolute inset-[2px] rounded-full bg-[oklch(0.10_0.02_240)] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[oklch(0.82_0.15_200)] to-[oklch(0.60_0.22_295)] animate-pulse-slow" />
            </div>
          </div>
          <span className="font-display font-extrabold text-lg tracking-[0.25em] text-foreground uppercase">
            Omnia
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            onClick={handleDemoClick}
            className="btn-cyan-glow font-semibold px-6 py-2 rounded-full text-sm tracking-wide border-0"
            data-ocid="nav.primary_button"
          >
            Request Demo
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground p-1"
          onClick={() => setMobileOpen((v) => !v)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="md:hidden overflow-hidden bg-[oklch(0.10_0.02_240/0.98)] border-b border-[oklch(0.82_0.15_200/0.12)]"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={handleDemoClick}
                className="btn-cyan-glow font-semibold rounded-full text-sm w-full border-0"
                data-ocid="nav.primary_button"
              >
                Request Demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
