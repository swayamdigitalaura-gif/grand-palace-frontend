import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone, Clock, ExternalLink as ExternalLinkIcon, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import mandala from "@/assets/mandala.png";
import type { GuideContent } from "@/lib/guidesContent";
import { REVIEWER, RESTAURANT_ADDRESS, RESTAURANT_PHONE_DISPLAY, RESTAURANT_PHONE_TEL, guidesContent } from "@/lib/guidesContent";
import {
  buildSchema, renderRich, renderBody, slugify, MobileCTABar, EXPLORE_LINKS, MAPS_URL,
} from "@/components/GuideTemplate";

/** Simple single-column article layout for standalone guide content that
 *  isn't a ranked list of restaurants — no comparison table, no numbered
 *  ranked-card grid. Sections still support the same text/box/row block
 *  types as the listicle template, they just always render inline in the
 *  order given instead of being grouped into a grid. Shares its hero,
 *  schema, rich-text rendering, and closing sections (FAQ/CTA/related) with
 *  GuideTemplate via re-exported helpers, so both templates stay visually
 *  and structurally consistent without duplicating that logic. */
export function NormalGuideTemplate({ guide }: { guide: GuideContent }) {
  const schemas = buildSchema(guide);
  const related = guide.relatedSlugs
    .map((slug) => guidesContent[slug])
    .filter((g): g is GuideContent => Boolean(g));

  return (
    <PageShell crumbs={[{ label: "Guides", to: "/guides" }, { label: guide.title }]}>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero — no photo; typographic + "at a glance" panel */}
      <div className="relative bg-palace overflow-hidden pt-24 pb-10 md:pt-28 md:pb-14 px-6">
        <img src={mandala} alt="" aria-hidden className="pointer-events-none absolute -right-40 -top-32 w-[520px] opacity-[0.07] animate-spin-slow" />
        <img src={mandala} alt="" aria-hidden className="pointer-events-none absolute -left-44 -bottom-40 w-[480px] opacity-[0.05] animate-spin-slow" style={{ animationDirection: "reverse" }} />
        <div className="relative z-10 max-w-5xl mx-auto grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          <div>
            <p className="text-[11px] tracking-[0.45em] uppercase font-bold mb-4" style={{ color: "#f5c14a" }}>
              {guide.tag} Guide · The Grand Palace, Sydney CBD
            </p>
            <h1 className="font-display text-3xl md:text-[2.7rem] leading-[1.15] text-gold-gradient mb-5">{renderRich(guide.title)}</h1>
            <p className="text-cream/60 text-[14.5px] leading-relaxed max-w-xl mb-5">{guide.excerpt}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-cream/50">
              <span>Published {guide.publishedDateDisplay}</span>
              {guide.updatedDate !== guide.publishedDate && (
                <>
                  <span aria-hidden>·</span>
                  <span className="text-emerald-400 font-medium">Updated {guide.updatedDateDisplay}</span>
                </>
              )}
            </div>
          </div>

          {/* At-a-glance panel — local SEO + CRO, no image needed */}
          <div className="rounded-2xl bg-cream/[0.06] border border-cream/15 backdrop-blur-sm p-5 flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-saffron mb-1">At a Glance</p>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 text-[13px] text-cream/80 hover:text-gold transition">
              <MapPin className="h-4 w-4 text-saffron mt-0.5 shrink-0" /> {RESTAURANT_ADDRESS}
            </a>
            <a href={`tel:${RESTAURANT_PHONE_TEL}`} className="flex items-start gap-2.5 text-[13px] text-cream/80 hover:text-gold transition">
              <Phone className="h-4 w-4 text-saffron mt-0.5 shrink-0" /> {RESTAURANT_PHONE_DISPLAY}
            </a>
            <div className="flex items-start gap-2.5 text-[13px] text-cream/80">
              <Clock className="h-4 w-4 text-saffron mt-0.5 shrink-0" /> Lunch 12–3pm · Dinner from 5pm, daily
            </div>
            <div className="h-px bg-cream/10 my-1" />
            <Link to={guide.ctaHref} className="btn-gold text-center text-[13px] py-2.5 inline-flex items-center justify-center gap-1.5">
              {guide.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Reviewer strip — EEAT */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-2.5 flex items-center gap-2 text-[12px] text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> {REVIEWER.note}
        </div>
      </div>

      {/* Body — single column, no comparison table or ranked-card grid */}
      <section className="relative section-cream py-12 px-6 overflow-hidden">
        <img src={mandala} alt="" aria-hidden className="pointer-events-none absolute -left-36 -top-28 w-[460px] opacity-[0.06] animate-spin-slow" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-palace/75 text-[15px] leading-relaxed mb-6">{renderRich(guide.intro)}</p>

          {/* Quick Answer — AEO/GEO answer-engine callout */}
          {guide.quickAnswer && (
            <div id="quick-answer" className="mb-8 rounded-2xl border-l-4 border-saffron bg-white/90 p-5 shadow-sm scroll-mt-24">
              <p className="text-[10px] font-bold uppercase tracking-widest text-saffron mb-1.5">Quick Answer</p>
              <p className="text-palace/85 text-[14.5px] leading-relaxed font-medium">{renderRich(guide.quickAnswer)}</p>
            </div>
          )}

          {guide.sections.map((section, i) => {
            const key = `s${i}`;

            if (section.blockType === "box") {
              return (
                <div key={key} id={slugify(section.heading)} className="mb-8 scroll-mt-24 rounded-2xl border-l-4 border-saffron bg-white/90 p-5 md:p-6 shadow-sm">
                  {section.heading && <h2 className="font-display text-lg md:text-xl text-palace mb-2">{renderRich(section.heading)}</h2>}
                  {renderBody(section.body, "text-palace/75 text-[14px] leading-relaxed mb-2.5")}
                  {section.bullets && (
                    <ul className="space-y-1.5 mt-1">
                      {section.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-palace/70 text-[14px] leading-relaxed">
                          <span className="text-saffron mt-1.5">•</span>{renderRich(b)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }

            if (section.blockType === "row") {
              const rowItems = section.items && section.items.length ? section.items : (section.bullets ?? []);
              return (
                <div key={key} id={slugify(section.heading)} className="mb-8 scroll-mt-24">
                  {section.heading && <h2 className="font-display text-xl md:text-2xl text-palace mb-4">{renderRich(section.heading)}</h2>}
                  <div className="grid sm:grid-cols-3 gap-3">
                    {rowItems.map((it, j) => (
                      <div key={j} className="rounded-xl border border-saffron/20 bg-white/80 p-4 text-center">
                        <p className="text-palace/80 text-[13px] leading-relaxed">{renderRich(it)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={key} id={slugify(section.heading)} className="mb-8 scroll-mt-24">
                <h2 className="font-display text-xl md:text-2xl text-palace mb-3">{renderRich(section.heading)}</h2>
                {renderBody(section.body, "text-palace/70 text-[14px] leading-relaxed mb-3")}
                {section.bullets && (
                  <ul className="space-y-1.5 mt-2">
                    {section.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-palace/70 text-[14px] leading-relaxed">
                        <span className="text-saffron mt-1.5">•</span>{renderRich(b)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {guide.pricingTable && (
            <div className="mb-8 rounded-2xl border border-saffron/20 bg-white/80 overflow-hidden">
              <div className="px-5 py-3 border-b border-saffron/15">
                <h3 className="font-display text-lg text-palace">{guide.pricingTable.title}</h3>
              </div>
              <table className="w-full text-[13px]">
                <tbody>
                  {guide.pricingTable.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-cream/40" : ""}>
                      <td className="px-5 py-3 text-palace/85 font-medium">{row.item}</td>
                      <td className="px-5 py-3 text-saffron font-bold whitespace-nowrap">{row.price}</td>
                      <td className="px-5 py-3 text-palace/50 hidden sm:table-cell">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {guide.pricingTable.note && (
                <p className="px-5 py-3 text-[12px] text-palace/45 italic border-t border-saffron/10">{guide.pricingTable.note}</p>
              )}
            </div>
          )}

          {/* Mid-content CTA — CRO */}
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-palace to-[#2a0f05] p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-cream/90 text-[14px] text-center sm:text-left">Ready to experience it yourself? Tables fill fast on weeknights.</p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto sm:shrink-0">
              <a href={`tel:${RESTAURANT_PHONE_TEL}`} className="btn-outline-gold whitespace-nowrap inline-flex items-center justify-center text-[13px]">Call Now</a>
              <Link to={guide.ctaHref} className="btn-gold whitespace-nowrap inline-flex items-center justify-center gap-2 text-[13px]">
                {guide.ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* FAQ */}
          {guide.faq.length > 0 && (
            <div id="faq" className="mb-10 scroll-mt-24">
              <h2 className="font-display text-xl md:text-2xl text-palace mb-4">Frequently Asked Questions</h2>
              <div className="grid sm:grid-cols-2 gap-3 [&>*:last-child:nth-child(odd)]:sm:col-span-2">
                {guide.faq.map((f, i) => (
                  <div key={i} className="rounded-xl border border-saffron/20 bg-white/70 p-5">
                    <p className="font-semibold text-palace mb-1.5 text-[14px]">{f.q}</p>
                    <p className="text-palace/65 text-[13.5px] leading-relaxed">{renderRich(f.a)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Resources — authoritative outbound links */}
          {guide.externalLinks && guide.externalLinks.length > 0 && (
            <div className="mb-10">
              <h3 className="font-display text-lg text-palace mb-3">Helpful External Resources</h3>
              <ul className="space-y-2">
                {guide.externalLinks.map((l, i) => (
                  <li key={i}>
                    <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13.5px] text-saffron hover:text-gold transition font-medium">
                      <ExternalLinkIcon className="h-3.5 w-3.5" /> {l.label}
                    </a>
                    <span className="text-palace/40 text-[12px]"> — {l.source}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Explore More — internal linking */}
          <div className="mb-10">
            <h3 className="font-display text-lg text-palace mb-3">Explore More at The Grand Palace</h3>
            <div className="flex flex-wrap gap-2">
              {EXPLORE_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="text-[12.5px] font-medium px-3.5 py-2 rounded-full border border-saffron/25 text-palace/75 hover:border-saffron/50 hover:text-saffron transition bg-white/60">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="rounded-2xl bg-palace p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <p className="text-cream/85 font-display text-lg text-center sm:text-left">Ready to book The Grand Palace?</p>
            <Link to={guide.ctaHref} className="btn-gold whitespace-nowrap inline-flex items-center justify-center gap-2 w-full sm:w-auto">
              {guide.ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Related guides */}
          {related.length > 0 && (
            <div>
              <h3 className="font-display text-lg text-palace mb-4">Related Guides</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((g) => (
                  <Link key={g.slug} to="/guides/$slug" params={{ slug: g.slug }}
                        className="group rounded-xl border border-stone-200 bg-white p-4 hover:border-saffron/40 hover:-translate-y-0.5 transition-all">
                    <p className="text-[13px] font-semibold text-stone-800 leading-snug group-hover:text-amber-800 transition">{g.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <MobileCTABar ctaHref={guide.ctaHref} ctaLabel={guide.ctaLabel} />
    </PageShell>
  );
}

