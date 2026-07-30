import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";

/* ── data shape — designed so a backend/CMS can populate this 1:1 later ── */
export type WhatsOnCta = { label: string; to?: string; href?: string; external?: boolean };

export type WhatsOnSection = {
  heading: string;
  priceTag?: string;
  intro?: string;
  items: string[];
};

export type WhatsOnSimplePageData = {
  crumbLabel: string;
  emoji?: string;
  title: string;
  subtitle: string;
  heroImage: string;
  highlightLine?: ReactNode;
  intro?: string;
  sections: WhatsOnSection[];
  sidebarImage: string;
  cta: WhatsOnCta;
  cta2?: WhatsOnCta;
};

function CtaButton({ cta, solid }: { cta: WhatsOnCta; solid: boolean }) {
  const className = `flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-[13px] font-bold uppercase tracking-wider px-3 sm:px-7 py-2.5 sm:py-3 rounded-lg transition whitespace-nowrap ${
    solid ? "text-white hover:brightness-110" : "border-2 border-amber-600 text-amber-700 hover:bg-amber-50"
  }`;
  const style = solid ? { background: "linear-gradient(90deg,#c8860a,#e6a020)" } : undefined;

  if (cta.to) {
    return <Link to={cta.to} className={className} style={style}>{cta.label}</Link>;
  }
  return (
    <a href={cta.href} target={cta.external ? "_blank" : undefined} rel={cta.external ? "noreferrer" : undefined}
       className={className} style={style}>
      {cta.label} {cta.external && <ExternalLink className="h-3.5 w-3.5" />}
    </a>
  );
}

export function WhatsOnSimpleTemplate({ title, subtitle, heroImage, emoji, highlightLine, intro, sections, sidebarImage, cta, cta2, crumbLabel }: WhatsOnSimplePageData) {
  return (
    <PageShell crumbs={[{ label: "What's On", to: "/whats-on" }, { label: crumbLabel }]}>

      {/* ══ HERO — same height/style as the menu pages ══ */}
      <div className="relative flex items-center justify-center text-center overflow-hidden" style={{ minHeight: "46vh" }}>
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover"
             fetchPriority="high" decoding="async" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,2,0,0.82) 0%, rgba(8,3,0,0.78) 50%, rgba(10,4,0,0.85) 100%)" }} />
        <div className="relative flex flex-col items-center gap-4 px-6 py-10">
          <p className="text-[9px] tracking-[0.7em] uppercase font-bold" style={{ color: "#f5c14a", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
            The Grand Palace · Sydney CBD
          </p>
          <h1 className="font-display leading-none" style={{ fontSize: "clamp(38px,7vw,80px)", color: "#fdf6e8", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            {title} {emoji}
          </h1>
          <div className="flex items-center gap-4" style={{ width: "10rem" }}>
            <span className="h-px flex-1" style={{ background: "rgba(210,165,65,0.65)" }} />
            <span style={{ color: "rgba(210,165,65,0.8)", fontSize: "9px" }}>◆</span>
            <span className="h-px flex-1" style={{ background: "rgba(210,165,65,0.65)" }} />
          </div>
          <p className="text-[13px] md:text-[15px] max-w-xl" style={{ color: "rgba(255,235,190,0.9)" }}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* ══ CONTENT ══ */}
      <section className="section-cream py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_360px] gap-12 items-start">

          {/* mobile-only highlight — shown above the image; hidden on desktop where it lives in the content column below */}
          {highlightLine && (
            <div className="order-1 lg:hidden inline-block rounded-lg px-4 py-2.5 border" style={{ background: "rgba(200,134,10,0.08)", borderColor: "rgba(200,134,10,0.25)" }}>
              <p className="text-amber-800 font-semibold text-[14px]">{highlightLine}</p>
            </div>
          )}

          <div className="order-3 lg:order-1">
            {highlightLine && (
              <div className="hidden lg:inline-block rounded-lg px-4 py-2.5 mb-6 border" style={{ background: "rgba(200,134,10,0.08)", borderColor: "rgba(200,134,10,0.25)" }}>
                <p className="text-amber-800 font-semibold text-[14px] md:text-[15px]">{highlightLine}</p>
              </div>
            )}
            {intro && (
              <p className="text-stone-800 leading-relaxed mb-8 max-w-2xl text-[15px]">{intro}</p>
            )}

            {sections.map((sec, i) => (
              <div key={i} className="rounded-2xl bg-white border border-stone-200 shadow-sm p-6 md:p-7 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                  <h3 className="font-display text-xl md:text-2xl text-stone-900">{sec.heading}</h3>
                  {sec.priceTag && (
                    <span className="font-display text-lg px-3 py-1 rounded-full text-white flex-shrink-0"
                          style={{ background: "linear-gradient(90deg,#c8860a,#e6a020)" }}>
                      {sec.priceTag}
                    </span>
                  )}
                </div>
                {sec.intro && <p className="text-stone-500 text-[14px] mb-4">{sec.intro}</p>}
                <ul className="grid sm:grid-cols-2 gap-2.5 mt-4">
                  {sec.items.map((item, j) => (
                    <li key={j}
                        className="flex items-start gap-2.5 text-stone-700 text-[14px] leading-relaxed rounded-lg px-3.5 py-2.5"
                        style={{ background: j % 2 === 0 ? "rgba(200,140,30,0.06)" : "transparent" }}>
                      <span className="text-amber-600 mt-0.5 flex-shrink-0">●</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-nowrap gap-2 sm:gap-3 mt-8">
              <CtaButton cta={cta} solid />
              {cta2 && <CtaButton cta={cta2} solid={false} />}
            </div>
          </div>

          {/* ── sidebar image (static, not sticky — avoids detaching from short content columns) ── */}
          <div className="order-2 lg:order-2 mt-4 lg:mt-14 rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] border border-stone-200">
            <img src={sidebarImage} alt={title} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
          </div>

        </div>
      </section>
    </PageShell>
  );
}
