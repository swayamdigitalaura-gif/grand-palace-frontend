import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ExternalLink, ArrowRight } from "lucide-react";
import mandala from "@/assets/mandala.png";
import heroImgDefault from "@/assets/hero-guides-spread.jpg";
import { guidesContent } from "@/lib/guidesContent";
import { fetchPageContent, useLiveContent, makeContent } from "@/lib/pageContent";
import { API_URL, type Guide } from "@/lib/admin-api";

async function fetchAdminGuides(): Promise<Guide[]> {
  try {
    const res = await fetch(`${API_URL}/api/guides`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export const Route = createFileRoute("/guides/")({
  loader: async () => {
    const [content, adminGuides] = await Promise.all([fetchPageContent("/guides"), fetchAdminGuides()]);
    return { content, adminGuides };
  },
  head: () => ({
    meta: [
      { title: "Dining Guides — The Grand Palace Indian Restaurant Sydney" },
      { name: "description", content: "Your ultimate guide to The Grand Palace's signature dining experience. Restaurant guides for Sydney CBD Indian dining, events, catering and more." },
    ],
  }),
  component: GuidesPage,
});

type Tag = "All" | "Events" | "Catering" | "Dining" | "Local";

interface GuideItem {
  title: string;
  excerpt: string;
  date: string;
  tag: Tag;
  slug: string;
}

const guides: GuideItem[] = [
  { title: "Indian Restaurant Near Wynyard Station Sydney — 1-Minute Walk to The Grand Palace", excerpt: "If you work near Wynyard Station in Sydney CBD, you're just one minute from the finest Indian dining experience in the city.", date: "Jun 26, 2026", tag: "Local", slug: "indian-restaurant-near-wynyard-station-sydney" },
  { title: "Indian Restaurant Near Martin Place Sydney — 5 Minutes from The Grand Palace", excerpt: "Working near Martin Place? The Grand Palace is about a 5-minute walk away in Sydney CBD's George Street dining strip.", date: "Jul 22, 2026", tag: "Local", slug: "indian-restaurant-near-martin-place" },
  { title: "Indian Restaurant Near Town Hall Station Sydney — One Stop from The Grand Palace", excerpt: "Based near Town Hall? The Grand Palace is one train stop up the line at Wynyard, or a straightforward walk up George Street.", date: "Jul 22, 2026", tag: "Local", slug: "indian-restaurant-near-town-hall-station" },
  { title: "Corporate Catering Sydney CBD — Indian Food for Office Lunches & Dinners", excerpt: "Organising catering for a meeting, training session, office lunch, or corporate event? Discover how The Grand Palace delivers premium Indian catering.", date: "Jun 26, 2026", tag: "Catering", slug: "corporate-catering-sydney-cbd" },
  { title: "Best Birthday Venues in Sydney CBD for Groups — 2026 Guide", excerpt: "Choosing the right birthday venue in Sydney CBD takes more than a quick Google search. Here's everything you need to know.", date: "Jun 25, 2026", tag: "Events", slug: "best-birthday-venues-sydney-cbd" },
  { title: "Jain Restaurants in Sydney: No Onion, No Garlic Indian Food Guide 2026", excerpt: "Finding a Jain-friendly restaurant in Sydney is harder than it seems. Here's how The Grand Palace caters to Jain dietary requirements.", date: "Jun 9, 2026", tag: "Dining", slug: "jain-restaurants-in-sydney-no-onion-no-garlic" },
  { title: "How to Plan Office Lunch Catering in Sydney", excerpt: "Planning office lunch catering in Sydney can feel overwhelming — especially when you are balancing dietary requirements and tight schedules.", date: "May 13, 2026", tag: "Catering", slug: "how-to-plan-office-lunch-catering-in-sydney" },
  { title: "Indian Wedding Catering Sydney — Your Complete Planning Guide", excerpt: "Planning the perfect Indian wedding catering in Sydney is one of the most important decisions you'll make. Here's your complete guide.", date: "May 13, 2026", tag: "Events", slug: "indian-wedding-catering-sydney" },
  { title: "Indian Food Delivery Sydney CBD — What to Order", excerpt: "Looking for the best Indian food delivery in Sydney CBD? Whether you are ordering for one or feeding a crowd, here's what to order.", date: "May 8, 2026", tag: "Dining", slug: "indian-food-delivery-sydney-cbd" },
  { title: "Best Restaurant for Birthday Dinner in Sydney", excerpt: "Searching for the best restaurant for a birthday dinner in Sydney? Whether you are planning a surprise or an intimate celebration.", date: "May 8, 2026", tag: "Events", slug: "restaurant-for-birthday-dinner" },
  { title: "Private Event Venue Hire Sydney CBD", excerpt: "Searching for the perfect private event venue in Sydney CBD for 2026? The Grand Palace offers exclusive hire options for any occasion.", date: "Apr 23, 2026", tag: "Events", slug: "private-event-venue-hire-sydney" },
  { title: "Best Halal Indian Restaurant Sydney 2026", excerpt: "Searching for a halal Indian restaurant in Sydney? The Grand Palace on George Street, Sydney CBD, is your answer.", date: "Apr 23, 2026", tag: "Dining", slug: "best-halal-indian-restaurant-sydney" },
  { title: "Best Indian Birthday Dinner Sydney 2026 — Where to Celebrate in Style", excerpt: "Planning an Indian birthday dinner in Sydney for 2026? The Grand Palace is where milestones become memories.", date: "Apr 23, 2026", tag: "Events", slug: "best-indian-birthday-dinner-sydney-where-to-celebrate-in-style" },
  { title: "Indian Catering Box Sydney — Office Platters, Party Boxes & Corporate Orders", excerpt: "Need an Indian catering box in Sydney for your office lunch, team meeting or party? Discover our popular catering options.", date: "Apr 23, 2026", tag: "Catering", slug: "indian-catering-box-sydney-cbd" },
  { title: "Best Indian Restaurant Near Me in Sydney CBD — The Grand Palace Guide", excerpt: "If you've searched 'Indian restaurant near me' in Sydney CBD, you've likely come across The Grand Palace. Here's everything you need to know.", date: "Apr 22, 2026", tag: "Local", slug: "best-indian-restaurant-near-me-sydney-cbd-the-grand-palace-guide" },
  { title: "Best 15 Vegan Restaurant in Sydney", excerpt: "Sydney has become a thriving destination for vegan food lovers, offering everything from plant-based fine dining to casual vegan cafes.", date: "Dec 31, 2025", tag: "Dining", slug: "best-vegan-restaurant-sydney" },
  { title: "15 Best Christmas Lunch and Dinner Restaurants in Sydney", excerpt: "Christmas in Sydney is one of the most exciting times of the year, and choosing the right restaurant is key to a perfect celebration.", date: "Dec 8, 2025", tag: "Dining", slug: "christmas-lunch-and-dinner-restaurants-in-sydney" },
  { title: "Christmas Corporate Catering Box by The Grand Palace", excerpt: "The festive season is a time of celebration, connection and appreciation — especially in the workplace. Make it memorable.", date: "Nov 5, 2025", tag: "Catering", slug: "christmas-corporate-catering-box-by-tgp" },
  { title: "Make Your Birthday Memorable with Authentic Indian Cuisine and Elegant Ambience", excerpt: "Birthdays are special — they're milestones that deserve celebration, laughter, and an unforgettable setting.", date: "Nov 5, 2025", tag: "Events", slug: "make-birthday-memorable-with-tgp" },
  { title: "Why The Grand Palace is Sydney's Favourite Spot for Christmas Lunch and Dinner", excerpt: "If you're looking to enjoy the most memorable Christmas lunch or dinner, look no further than The Grand Palace.", date: "Oct 31, 2025", tag: "Dining", slug: "why-tgp-best-for-christmas-lunch-and-dinner" },
  { title: "Why The Grand Palace is the Best Spot for a Relaxed Weekend Indian Lunch", excerpt: "After a long week, everyone deserves a little relaxation — and what better way than a leisurely weekend Indian lunch.", date: "Sep 23, 2025", tag: "Dining", slug: "tgp-is-best-for-a-weekend-indian-lunch" },
  { title: "Why Sydney Businesses Trust The Grand Palace for Corporate Catering", excerpt: "When planning a corporate event, the quality of catering can make or break the experience. Here's why Sydney businesses choose us.", date: "Sep 23, 2025", tag: "Catering", slug: "sydney-corporate-catering-at-tgp" },
  { title: "Why Our Catering Boxes Are Perfect for Parties, Office Lunches, and More", excerpt: "Finding the right catering solution for parties, office lunches, or team gatherings has never been easier.", date: "Sep 23, 2025", tag: "Catering", slug: "catering-boxes-in-sydney-for-parties" },
  { title: "Elevate Your Corporate Events with The Grand Palace Catering in Sydney", excerpt: "Corporate Catering in Sydney plays a central role in hosting a successful event. Discover how we elevate every occasion.", date: "Sep 23, 2025", tag: "Catering", slug: "corporate-catering-in-sydney-at-tgp" },
  { title: "Why The Grand Palace is Sydney's Top Choice for Hosting a Memorable Diwali Party", excerpt: "Diwali, the festival of lights, is celebrated with joy and grandeur — and The Grand Palace provides the perfect backdrop.", date: "Sep 22, 2025", tag: "Events", slug: "why-tgp-is-best-for-diwali-party" },
  { title: "The Best Family Restaurants in Sydney", excerpt: "Finding the perfect spot for a family meal in Sydney is now easier than ever. From large groups to intimate family dinners.", date: "Jul 31, 2025", tag: "Dining", slug: "best-family-restaurants-sydney" },
  { title: "Where to Host a Royal Indian Birthday Dinner in Sydney", excerpt: "Planning a birthday dinner that feels truly special? Hosting it at an Indian fine dining restaurant elevates everything.", date: "Jul 31, 2025", tag: "Events", slug: "where-to-host-a-royal-indian-birthday-dinner-in-sydney" },
  { title: "Top 10 Indian Restaurants in Western Sydney You Must Try in 2025", excerpt: "Western Sydney is a vibrant melting pot of cultures, and when it comes to Indian restaurants, there's no shortage of choices.", date: "Jul 30, 2025", tag: "Local", slug: "indian-restaurants-western-sydney" },
  { title: "Best Mocktails & Drinks to Pair with Indian Food", excerpt: "Indian cuisine is known for its layers of flavour. Discover the best mocktails and drinks that complement your meal.", date: "Jul 19, 2025", tag: "Dining", slug: "mocktails-drinks-in-indian-food" },
  { title: "Best Indian Catering Boxes for Office Lunch & Family in Sydney", excerpt: "In Sydney's vibrant multicultural landscape, food plays a pivotal role in bringing people together — especially at work.", date: "Jul 19, 2025", tag: "Catering", slug: "indian-catering-boxes-in-sydney" },
  { title: "Indian Fine Dining near Circular Quay", excerpt: "Circular Quay offers more than scenic views and iconic landmarks — it's also home to some of Sydney's finest dining experiences.", date: "Jun 30, 2025", tag: "Local", slug: "indian-fine-dining-circular-quay" },
  { title: "Top Restaurants for Group Dining in Pyrmont", excerpt: "Pyrmont is one of Sydney's most sought-after dining destinations, especially for group gatherings and corporate events.", date: "Jun 27, 2025", tag: "Dining", slug: "group-dining-restaurants-pyrmont" },
  { title: "Best Indian Food in Surry Hills", excerpt: "Surry Hills is one of Sydney's most dynamic food destinations, and its Indian restaurant scene is particularly impressive.", date: "Jun 26, 2025", tag: "Local", slug: "best-indian-food-surry-hills" },
  { title: "Top Vegetarian-Friendly Restaurants near Chippendale", excerpt: "Chippendale and its surrounding areas have become a popular hub for diverse and inclusive dining options in Sydney.", date: "Jun 26, 2025", tag: "Dining", slug: "vegetarian-restaurants-chippendale" },
  { title: "The 25 Best Vegetarian Restaurants in Sydney", excerpt: "Sydney's vegetarian food scene has truly flourished in recent years, with an incredible range of plant-forward dining options.", date: "May 1, 2025", tag: "Dining", slug: "best-vegetarian-restaurants-in-sydney" },
  { title: "Best Indian Restaurant in Darling Harbour", excerpt: "Darling Harbour is one of Sydney's most iconic spots, and it's also a great place to experience authentic Indian cuisine.", date: "Jun 24, 2025", tag: "Local", slug: "indian-restaurant-darling-harbour" },
  { title: "How to Choose the Right Indian Catering for Your Sydney Event", excerpt: "Planning a successful event in Sydney requires more than a good guest list — the right catering is essential.", date: "Jun 23, 2025", tag: "Catering", slug: "find-right-indian-catering-for-event" },
  { title: "Top 5 Indian Dishes You Must Try in Sydney", excerpt: "Explore Sydney's most beloved Indian dishes, curated by dietary preference and flavour profile.", date: "Jun 23, 2025", tag: "Dining", slug: "top-5-indian-dishes-sydney" },
  { title: "18 Best Restaurants in Sydney for Lunch", excerpt: "We know that picking what to have for lunch can be a difficult choice, with so many incredible options across the city.", date: "May 5, 2025", tag: "Dining", slug: "best-restaurants-sydney-lunch" },
  { title: "20 Best Halal Restaurant in Sydney", excerpt: "Sydney is a vibrant melting pot of cultures, and its food scene reflects this beautifully — especially for halal dining.", date: "May 2, 2025", tag: "Dining", slug: "best-halal-restaurant-sydney" },
  { title: "20 Best Indian Restaurant in Sydney", excerpt: "This article is a must read if you are looking for a mouth-watering Indian dining experience anywhere in Sydney.", date: "May 2, 2025", tag: "Dining", slug: "best-indian-restaurant-sydney" },
  { title: "18 Best Group Restaurant in Sydney", excerpt: "Do you want to find the best group restaurant in Sydney? Whether you're planning a birthday, work dinner, or family gathering.", date: "May 2, 2025", tag: "Dining", slug: "best-group-restaurant-sydney" },
  { title: "17 Best Asian Restaurants in Sydney", excerpt: "All around Sydney, you will find a wealth of tradition consisting of traditional Chinese, the spice routes of India, and much more.", date: "May 1, 2025", tag: "Dining", slug: "best-asian-restaurants-in-sydney" },
  { title: "18 Best Asian Fusion Restaurants In Sydney", excerpt: "Asian fusion dining has taken Sydney by storm — blending bold flavours, inventive techniques, and cultural traditions.", date: "May 1, 2025", tag: "Dining", slug: "asian-fusion-restaurants-in-sydney" },
  { title: "The 25 Best Vegetarian Restaurants in Sydney", excerpt: "Sydney's vegetarian food scene has truly flourished in recent years, with an incredible range of plant-forward dining options.", date: "May 1, 2025", tag: "Dining", slug: "best-vegetarian-restaurants-sydney" },
  { title: "15 Best Corporate Catering Services in Sydney", excerpt: "Planning a corporate event, office lunch, or business meeting in Sydney? The right catering service can elevate everything.", date: "Apr 30, 2025", tag: "Catering", slug: "best-corporate-catering-services-sydney" },
  { title: "25 Best Wedding Caterers in Sydney", excerpt: "Choosing the right caterer is essential to making your wedding day perfect. Sydney offers a diverse range of options.", date: "Apr 30, 2025", tag: "Catering", slug: "best-wedding-caterers-sydney" },
  { title: "15 Best Birthday Party Caterer in Sydney", excerpt: "When it comes to celebrating special moments, choosing the right birthday party caterers in Sydney makes all the difference.", date: "Apr 30, 2025", tag: "Catering", slug: "best-birthday-party-caterer-sydney" },
  { title: "15 Best Mother's Day Restaurant in Sydney", excerpt: "Mother's Day is just around the corner and it's time to start planning how to show your appreciation in the most special way.", date: "Apr 29, 2025", tag: "Events", slug: "best-mothers-day-restaurant-sydney" },
  { title: "20 Best Vivid Restaurant in Sydney", excerpt: "If you're looking for a unique dining experience during Vivid Sydney, then be sure to check out The Grand Palace.", date: "Apr 22, 2025", tag: "Events", slug: "best-vivid-restaurant-sydney" },
];

const TAGS: Tag[] = ["All", "Events", "Catering", "Dining", "Local"];

const tagColors: Record<Tag, string> = {
  All: "#c8860a",
  Events: "#e05454",
  Catering: "#16a085",
  Dining: "#6366f1",
  Local: "#c8860a",
};

function GuidesPage() {
  const loaderData = Route.useLoaderData();
  const content = useLiveContent("/guides", loaderData.content);
  const c = makeContent(content);
  const heroImg = content["hero.image"] || heroImgDefault;
  const [active, setActive] = useState<Tag>("All");

  // Merge admin-created/edited guides into the static list — a DB guide with
  // a slug that already exists here overrides that card's display info, and
  // any new admin-only guide gets appended so it shows up immediately.
  // Display order follows the DB's admin-editable sortOrder when a guide is
  // published there; guides that only exist in the static list keep their
  // original position via that array's index as a fallback order.
  const dbGuideSlugs = new Set(loaderData.adminGuides.map((g) => g.slug));
  const mergedGuides: (GuideItem & { order: number })[] = [
    ...guides.map((g, i) => {
      const db = loaderData.adminGuides.find((d) => d.slug === g.slug);
      return db
        ? { title: db.title, excerpt: db.excerpt, date: db.publishedDateDisplay, tag: db.tag as Tag, slug: db.slug, order: db.sortOrder }
        : { ...g, order: i };
    }),
    ...loaderData.adminGuides
      .filter((g) => !guides.some((s) => s.slug === g.slug))
      .map((g) => ({ title: g.title, excerpt: g.excerpt, date: g.publishedDateDisplay, tag: g.tag as Tag, slug: g.slug, order: g.sortOrder })),
  ].sort((a, b) => a.order - b.order);
  const filtered = active === "All" ? mergedGuides : mergedGuides.filter((g) => g.tag === active);

  return (
    <PageShell crumbs={[{ label: "Guides" }]}>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={heroImg} alt="" data-tgp-key="hero.image" className="w-full h-full object-cover" fetchPriority="high"
             style={{ filter: "brightness(0.55) saturate(1.1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(6,2,0,0.5),rgba(8,3,0,0.88))" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-3">
          <p className="text-[11px] tracking-[0.45em] uppercase font-bold" style={{ color: "#f5c14a", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>The Grand Palace · Sydney CBD</p>
          <h1 data-tgp-key="hero.title" className="font-display text-5xl md:text-6xl text-gold-gradient">{c("hero.title", "Dining Guides")}</h1>
          <p data-tgp-key="hero.subtitle" className="text-cream/60 text-sm max-w-md">{c("hero.subtitle", "Your ultimate guide to Sydney's finest Indian dining experience")}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-2 py-3 overflow-x-auto">
          {TAGS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`flex-shrink-0 text-[11px] font-bold uppercase tracking-widest px-5 py-2 rounded-full transition ${
                active === tab ? "text-white" : "text-stone-500 hover:text-stone-900"
              }`}
              style={active === tab ? { background: "linear-gradient(90deg,#c8860a,#e6a020)" } : {}}
            >
              {tab}
            </button>
          ))}
          <span className="ml-auto text-stone-400 text-[12px] flex-shrink-0">{filtered.length} guides</span>
        </div>
      </div>

      {/* Guide grid */}
      <section className="relative section-cream py-12 px-6 overflow-hidden">
        <img src={mandala} alt="" aria-hidden className="pointer-events-none absolute -left-36 -top-28 w-[460px] opacity-[0.07] animate-spin-slow" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((guide, i) => {
              const isBuilt = Boolean(guidesContent[guide.slug]) || dbGuideSlugs.has(guide.slug);
              const cardClass = "group rounded-2xl border border-stone-200 bg-white hover:border-saffron/40 hover:shadow-[0_8px_28px_-10px_rgba(200,134,10,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden";
              const cardBody = (
                <>
                  {/* Tag bar */}
                  <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full"
                          style={{ background: tagColors[guide.tag] }}>
                      {guide.tag}
                    </span>
                    <span className="text-stone-400 text-[11px]">{guide.date}</span>
                  </div>
                  <div className="px-5 pb-5 flex flex-col flex-1">
                    <h2 className="font-display text-lg text-stone-900 leading-snug mb-2 group-hover:text-amber-800 transition">
                      {guide.title}
                    </h2>
                    <p className="text-stone-500 text-[13px] leading-relaxed flex-1">{guide.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-amber-700 group-hover:text-amber-600 transition">
                      Read Guide {isBuilt ? <ArrowRight className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
                    </div>
                  </div>
                </>
              );
              return isBuilt ? (
                <Link key={i} to="/guides/$slug" params={{ slug: guide.slug }} className={cardClass}>
                  {cardBody}
                </Link>
              ) : (
                <a key={i} href={`https://www.thegrandpalace.com.au/guides/${guide.slug}/`} target="_blank" rel="noreferrer" className={cardClass}>
                  {cardBody}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
