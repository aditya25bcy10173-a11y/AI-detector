import { ArrowRight } from "lucide-react";

const HeroSection = () => (
  <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
    {/* Decorative blobs */}
    <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

    <div className="container mx-auto px-6 text-center relative z-10">
      <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-6">
          AI-Powered Health Screening
      </span>
      <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
        AI Early{" "}
        <span className="text-gradient">Detector</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
        Harnessing artificial intelligence for early disease detection — faster, smarter, and more accurate.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#services"
          className="inline-flex items-center gap-2 rounded-lg bg-hero-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          Our Services <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="#about"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Learn More
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
