import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const footerLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#capabilities" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Demo", href: "#demo" },
];

const socials = [
  { icon: SiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: SiX, href: "https://x.com", label: "X" },
  { icon: SiGithub, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      style={{
        backgroundColor: "oklch(0.09 0.018 240)",
        borderTop: "1px solid oklch(0.22 0.04 240)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.82_0.15_200)] to-[oklch(0.55_0.20_255)]" />
              <div
                className="absolute inset-[2px] rounded-full flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.09 0.018 240)" }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[oklch(0.82_0.15_200)] to-[oklch(0.60_0.22_295)]" />
              </div>
            </div>
            <span className="font-display font-bold text-base tracking-[0.3em] text-foreground uppercase">
              OMNIA
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                data-ocid="footer.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-cyan transition-all duration-200"
                style={{ border: "1px solid oklch(0.22 0.04 240)" }}
                data-ocid="footer.link"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-8 pt-6 text-center"
          style={{ borderTop: "1px solid oklch(0.22 0.04 240)" }}
        >
          <p className="text-xs text-muted-foreground">
            © {year}. Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
