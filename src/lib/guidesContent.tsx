import grandPalaceStorefront from "@/assets/grand-palace-storefront.jpg";

export interface GuideFAQ {
  q: string;
  a: string;
}

export type GuideBlockType = "listing" | "text" | "box" | "row";

export interface GuideSection {
  heading: string;
  body: string[];
  bullets?: string[];
  image?: string;
  imageAlt?: string;
  /** Key into GuideTemplate's BANNER_STYLES — shown as a styled icon banner when there's no photo. */
  bannerIcon?: string;
  /** Explicit render mode. When unset, falls back to the old heuristic (heading starting "1. " etc. = listing, else text). */
  blockType?: GuideBlockType;
  /** Used by the "row" block type — each string renders as one small card in a horizontal row. */
  items?: string[];
  /** Whether to show the auto-generated Area/Dietary/Groups facts table (sourced
   *  from the matching comparisonTable row). Defaults to true; set false when the
   *  card's own bullets already spell out dietary info to avoid repeating it. */
  showFactsTable?: boolean;
}

export interface GuidePricingRow {
  item: string;
  price: string;
  note?: string;
}

export interface GuideQuickFact {
  label: string;
  value: string;
}

export interface GuideExternalLink {
  label: string;
  href: string;
  source: string;
}

export interface GuideComparisonRow {
  name: string;
  area: string;
  style: string;
  dietary: string;
  goodForGroups: boolean;
  highlight?: boolean;
}

export interface GuideComparisonTable {
  title: string;
  note?: string;
  rows: GuideComparisonRow[];
}

export interface GuideContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  tag: "Local" | "Catering" | "Events" | "Dining";
  publishedDate: string;
  publishedDateDisplay: string;
  updatedDate: string;
  updatedDateDisplay: string;
  excerpt: string;
  intro: string;
  /** Short, direct answer to the core search query — surfaced in a callout for AI/answer-engine (AEO/GEO) extraction. */
  quickAnswer?: string;
  quickFacts?: GuideQuickFact[];
  sections: GuideSection[];
  comparisonTable?: GuideComparisonTable;
  pricingTable?: { title: string; note?: string; rows: GuidePricingRow[] };
  /** Authoritative third-party links (transport, tourism, etc.) that back up claims in the guide. */
  externalLinks?: GuideExternalLink[];
  faq: GuideFAQ[];
  relatedSlugs: string[];
  ctaLabel: string;
  ctaHref: string;
  /** "listicle" = ranked-card grid + comparison table (GuideTemplate). "normal" = simple
   *  single-column article layout (NormalGuideTemplate). Undefined only happens for the
   *  bundled static guides below, which are all pre-existing listicle-style content — treat
   *  undefined as "listicle" wherever this field is read, to avoid changing their appearance. */
  guideType?: "normal" | "listicle";
}

const AUTHOR_NAME = "Nirav Shah";
const AUTHOR_BIO =
  "Hospitality professional with 10+ years exploring Sydney's dining scene, focused on lunch and dinner experiences, food culture, and restaurant service quality.";

export const GUIDE_AUTHOR = { name: AUTHOR_NAME, bio: AUTHOR_BIO };

export const REVIEWER = {
  name: "The Grand Palace Management Team",
  note: "Reviewed for factual accuracy — hours, pricing and location details are checked against our current bookings system.",
};

export const RESTAURANT_ADDRESS = "Basement, 261 George Street, Sydney, NSW 2000";
export const RESTAURANT_PHONE_DISPLAY = "(02) 8021 7696";
export const RESTAURANT_PHONE_TEL = "+61280217696";

const HOURS_BLOCK = [
  "Lunch: Monday – Sunday, 12:00pm – 3:00pm",
  "Dinner: Sunday – Thursday, 5:00pm – 10:00pm",
  "Dinner: Friday – Saturday, 5:00pm – 10:30pm",
  "Venue for hire: Saturday – Sunday, 12:00pm – 3:00pm",
];

export const guidesContent: Record<string, GuideContent> = {
  "indian-restaurant-near-wynyard-station-sydney": {
    slug: "indian-restaurant-near-wynyard-station-sydney",
    title: "Indian Restaurant Near Wynyard Station Sydney — 1-Minute Walk to The Grand Palace",
    metaTitle: "Indian Restaurant Near Wynyard Station Sydney | The Grand Palace",
    metaDescription:
      "The Grand Palace is a 1-minute walk from Wynyard Station via the MetCentre — halal-certified fine-dining Indian food in Sydney CBD, open for lunch and dinner daily.",
    tag: "Local",
    publishedDate: "2026-06-26",
    publishedDateDisplay: "Jun 26, 2026",
    updatedDate: "2026-07-27",
    updatedDateDisplay: "Jul 27, 2026",
    excerpt:
      "If you work near Wynyard Station in Sydney CBD, you're just one minute from the finest Indian dining experience in the city.",
    intro:
      "Wynyard Station sits in the middle of Sydney's financial district, which makes it one of the easiest places in the CBD to fit in a proper sit-down Indian meal without eating into your lunch hour or your evening plans. The Grand Palace is in the basement at 261 George Street — about a 1-minute walk from the Wynyard Station George Street exits via the MetCentre, and just as close to the Bridge Street Light Rail stop. If you'd rather see the exact route before you head out, our [contact and location page](/contact) has a live map and directions.",
    quickAnswer:
      "The Grand Palace is a 1-minute walk from Wynyard Station: exit toward George Street, walk through the MetCentre, and take the stairs down to our basement dining room at 261 George Street. It's open for lunch 12–3pm and dinner from 5pm, seven days a week.",
    quickFacts: [
      { label: "Distance from Wynyard Station", value: "1-minute walk via the MetCentre" },
      { label: "Lunch hours", value: "12:00pm – 3:00pm, daily" },
      { label: "Dinner hours", value: "5:00pm – 10:00pm (Sun–Thu), 5:00pm – 10:30pm (Fri–Sat)" },
    ],
    sections: [
      {
        heading: "Getting here from Wynyard Station",
        body: [
          "Exit Wynyard Station toward George Street and walk through the MetCentre shopping concourse — The Grand Palace's basement entrance at 261 George Street is roughly a minute's walk from the station concourse, with lift access available. If you're coming off the Bridge Street Light Rail instead, it's the same short walk in the other direction.",
          "Driving in or arriving by taxi/rideshare? Wilson Parking on York Street and the Secure Parking station at Wynyard are both within a few minutes' walk — see our [full location and parking details](/contact) for the closest options.",
        ],
      },
      {
        heading: "What to expect once you're seated",
        body: [
          "The dining room is set up for both a fast weekday lunch and a slower, more indulgent dinner, with décor inspired by India's royal palaces rather than a standard CBD casual eatery. Signature dishes include Butter Chicken, Lamb Rogan Josh, Shahi Paneer, Saffron Chicken Tikka and Daal Makhani — every non-vegetarian dish is prepared with [halal-certified meat](/guides/best-halal-indian-restaurant-sydney), and vegetarian, vegan and gluten-friendly options are clearly marked on the [full menu](/menu).",
          "For groups walking over from a nearby office, [set menu banquets](/set-menu) start from $65 per person and take the guesswork out of ordering for the whole table.",
        ],
      },
      {
        heading: "Good to know before you book",
        body: [
          "The venue seats up to 125 guests across five private dining spaces, so it comfortably handles everything from a two-person lunch to a larger after-work group heading over from Wynyard offices. For bigger bookings, it's worth reading through our [venue and catering options](/venue-catering) first.",
        ],
        bullets: [
          "Minimum charge: $35 per person (children aged 5–10: $25)",
          "No BYO — fully licensed",
          "Card surcharge applies; 10% surcharge on public holidays and special events",
          "Wheelchair-accessible lift access to the basement dining room",
        ],
      },
    ],
    faq: [
      {
        q: "How far is The Grand Palace from Wynyard Station?",
        a: "About a 1-minute walk via the MetCentre exit onto George Street — it's one of the closest sit-down Indian restaurants to the station.",
      },
      {
        q: "Is The Grand Palace open for a quick weekday lunch near Wynyard?",
        a: "Yes. Lunch runs seven days a week from 12:00pm to 3:00pm, and the à la carte menu is built to move quickly for a one-hour lunch break.",
      },
      {
        q: "Can I book a table for a large group near Wynyard Station?",
        a: "Yes — the venue holds up to 125 guests across five private dining rooms, and set menu banquets from $65 per person are available for groups of two or more. See our set menu page for the full banquet tiers.",
      },
      {
        q: "Is there parking near The Grand Palace at Wynyard?",
        a: "Wilson Parking on York Street and Secure Parking near Wynyard Station are both a short walk away. Street parking in the CBD is limited, so a nearby car park is the more reliable option.",
      },
    ],
    externalLinks: [
      { label: "Wynyard Station transport info", href: "https://transportnsw.info/", source: "Transport for NSW" },
    ],
    relatedSlugs: [
      "indian-restaurant-near-martin-place",
      "indian-restaurant-near-town-hall-station",
      "corporate-catering-sydney-cbd",
    ],
    ctaLabel: "Book a Table",
    ctaHref: "/book-a-table",
  },

  "indian-restaurant-near-martin-place": {
    slug: "indian-restaurant-near-martin-place",
    title: "Indian Restaurant Near Martin Place Sydney — 5 Minutes from The Grand Palace",
    metaTitle: "Indian Restaurant Near Martin Place Sydney | The Grand Palace",
    metaDescription:
      "Working near Martin Place? The Grand Palace is about a 5-minute walk away — halal-certified fine-dining Indian food in Sydney CBD for lunch, dinner and group bookings.",
    tag: "Local",
    publishedDate: "2026-07-22",
    publishedDateDisplay: "Jul 22, 2026",
    updatedDate: "2026-07-27",
    updatedDateDisplay: "Jul 27, 2026",
    excerpt:
      "Based near Martin Place? The Grand Palace is a short walk away in Sydney CBD's George Street dining strip — ideal for client lunches and after-work dinners.",
    intro:
      "Martin Place is the heart of Sydney's banking and legal district, and it's easy to fall back on the same handful of cafes and food courts nearby out of convenience. The Grand Palace, in the basement at 261 George Street, is about a 5-minute walk from Martin Place — close enough for a proper sit-down lunch without losing your whole break, and an easy after-work dinner spot for teams finishing near the Place. You can check the exact route on our [contact and location page](/contact).",
    quickAnswer:
      "The Grand Palace is about a 5-minute walk from Martin Place: head north on George Street toward Wynyard, and our basement dining room at 261 George Street is on your right. Lunch runs 12–3pm daily and dinner from 5pm, with private dining rooms available for client and team bookings.",
    quickFacts: [
      { label: "Distance from Martin Place", value: "5-minute walk north on George Street" },
      { label: "Lunch hours", value: "12:00pm – 3:00pm, daily" },
      { label: "Dinner hours", value: "5:00pm – 10:00pm (Sun–Thu), 5:00pm – 10:30pm (Fri–Sat)" },
    ],
    sections: [
      {
        heading: "Getting here from Martin Place",
        body: [
          "From Martin Place, head north on George Street toward Wynyard — The Grand Palace's basement entrance at 261 George Street is around a 5-minute walk, in the same stretch of the CBD as Wynyard Station and the Bridge Street Light Rail stop.",
          "Coming from a Martin Place office block, it's an easy walk with no need to cross to the other side of the CBD — useful if you're working around a short lunch window.",
        ],
      },
      {
        heading: "A step up from a desk lunch",
        body: [
          "For teams and clients based around Martin Place, The Grand Palace offers a proper sit-down alternative to sandwich platters or food-court Indian — think Butter Chicken, Lamb Rogan Josh, Shahi Paneer and Saffron Chicken Tikka from the [full menu](/menu), [halal-certified](/guides/best-halal-indian-restaurant-sydney) across the non-vegetarian range, with vegetarian, vegan and gluten-friendly options available.",
          "If you're organising for a group, [set menu banquets](/set-menu) from $65 per person keep ordering simple, and the venue can also handle [corporate catering](/guides/corporate-catering-sydney-cbd) — either individually packed catering boxes for meetings, or full on-site service for larger functions.",
        ],
      },
      {
        heading: "Good to know before you book",
        body: [
          "The venue seats up to 125 guests across five private dining rooms, and lunch runs seven days a week — useful if your team's schedule doesn't line up with a standard Monday–Friday booking pattern. For larger client functions, see our [private venue and catering](/venue-catering) options.",
        ],
        bullets: [
          "Minimum charge: $35 per person (children aged 5–10: $25)",
          "No BYO — fully licensed",
          "Card surcharge applies; 10% surcharge on public holidays and special events",
          "Private dining rooms available for a more discreet client meeting",
        ],
      },
    ],
    faq: [
      {
        q: "How far is The Grand Palace from Martin Place?",
        a: "About a 5-minute walk north on George Street, in the same CBD stretch as Wynyard Station.",
      },
      {
        q: "Is it suitable for a client lunch near Martin Place?",
        a: "Yes — the dining room is set up for a proper sit-down lunch service, with private dining spaces available if you need a more discreet setting for a client or team lunch.",
      },
      {
        q: "Does The Grand Palace do corporate catering for offices near Martin Place?",
        a: "Yes — both individually packed catering boxes for meetings and full on-site catering for larger events. See our corporate catering guide for pricing and details.",
      },
      {
        q: "Can I book a private dining room for a business meeting near Martin Place?",
        a: "Yes — the venue has five private dining spaces suited to client meetings, team lunches and after-work functions, in addition to the main dining room.",
      },
    ],
    externalLinks: [
      { label: "Martin Place precinct information", href: "https://transportnsw.info/", source: "Transport for NSW" },
    ],
    relatedSlugs: [
      "indian-restaurant-near-wynyard-station-sydney",
      "corporate-catering-sydney-cbd",
      "how-to-plan-office-lunch-catering-sydney",
    ],
    ctaLabel: "Book a Table",
    ctaHref: "/book-a-table",
  },

  "indian-restaurant-near-town-hall-station": {
    slug: "indian-restaurant-near-town-hall-station",
    title: "Indian Restaurant Near Town Hall Station Sydney — One Stop from The Grand Palace",
    metaTitle: "Indian Restaurant Near Town Hall Station Sydney | The Grand Palace",
    metaDescription:
      "Near Town Hall Station? The Grand Palace is one train stop away at Wynyard, or about a 15-minute walk — fine-dining Indian food in Sydney CBD.",
    tag: "Local",
    publishedDate: "2026-07-22",
    publishedDateDisplay: "Jul 22, 2026",
    updatedDate: "2026-07-22",
    updatedDateDisplay: "Jul 22, 2026",
    excerpt:
      "Based near Town Hall? The Grand Palace is one train stop up the line at Wynyard, or a straightforward walk up George Street.",
    intro:
      "Town Hall is one of the busiest interchanges in the city, and it's genuinely worth the short trip up George Street or one stop on the train to reach The Grand Palace, in the basement at 261 George Street. It's about a 15-minute walk directly up George Street, or a 2–3 minute train ride to Wynyard Station, from which the restaurant is a further 1-minute walk.",
    sections: [
      {
        heading: "Getting here from Town Hall Station",
        body: [
          "The simplest route is the train: from Town Hall, it's one stop to Wynyard on the T1/T7/T8/T9 lines, then about a minute's walk through the MetCentre to 261 George Street. If you'd rather walk the whole way, head north on George Street — it's a straightforward, mostly flat 15-minute walk through the CBD.",
        ],
      },
      {
        heading: "Worth the trip up George Street",
        body: [
          "The Grand Palace is a fine-dining Indian restaurant rather than a quick-service option — palace-inspired décor, halal-certified meat across the menu, and dishes like Butter Chicken, Lamb Rogan Josh, Shahi Paneer and Saffron Chicken Tikka. Vegetarian, vegan and gluten-friendly options are available throughout.",
          "For groups coming from the Town Hall / QVB end of the CBD, set menu banquets from $65 per person make ordering for a table straightforward, and the venue can seat up to 125 guests across five private dining rooms for larger bookings.",
        ],
      },
      {
        heading: "Good to know before you book",
        body: [],
        bullets: [
          "Minimum charge: $35 per person (children aged 5–10: $25)",
          "No BYO — fully licensed",
          "Card surcharge applies; 10% surcharge on public holidays and special events",
        ],
      },
    ],
    faq: [
      {
        q: "How do I get to The Grand Palace from Town Hall Station?",
        a: "The fastest way is one train stop to Wynyard, then a 1-minute walk. Walking the whole way up George Street takes about 15 minutes.",
      },
      {
        q: "Is it worth the trip from Town Hall for lunch?",
        a: "Yes — The Grand Palace is a sit-down fine-dining experience rather than a food-court option, and lunch runs from 12:00pm to 3:00pm daily.",
      },
    ],
    relatedSlugs: [
      "indian-restaurant-near-wynyard-station-sydney",
      "indian-restaurant-near-martin-place",
      "best-indian-restaurant-near-me-sydney-cbd",
    ],
    ctaLabel: "Book a Table",
    ctaHref: "/book-a-table",
  },

  "best-halal-indian-restaurant-sydney": {
    slug: "best-halal-indian-restaurant-sydney",
    title: "Best Halal Indian Restaurant Sydney 2026 — Complete Guide",
    metaTitle: "Best Halal Indian Restaurant Sydney 2026 | The Grand Palace",
    metaDescription:
      "The Grand Palace is a fine-dining Indian restaurant in Sydney CBD using halal-certified meat across the entire menu. See our halal dishes, hours and location.",
    tag: "Dining",
    publishedDate: "2026-04-23",
    publishedDateDisplay: "Apr 23, 2026",
    updatedDate: "2026-05-26",
    updatedDateDisplay: "May 26, 2026",
    excerpt:
      "Searching for a halal Indian restaurant in Sydney? The Grand Palace on George Street, Sydney CBD, is your answer.",
    intro:
      "The Grand Palace is one of the very few fine-dining Indian restaurants in Sydney CBD that uses halal-certified meat across its entire non-vegetarian menu — not just a handful of dishes. Combined with a palace-inspired dining room rather than a casual takeaway setting, it's built for guests who want a proper halal dining experience, not a compromise.",
    sections: [
      {
        heading: "Our halal certification, in plain terms",
        body: [
          "All chicken, lamb and beef dishes on our menu are prepared with halal-certified meat sourced from certified suppliers. There is no pork or pork-derived ingredient anywhere on the menu, and no alcohol is used in food preparation.",
        ],
      },
      {
        heading: "Halal dishes to try",
        body: [],
        bullets: [
          "Entrées: Murgh Afghani Tikka, Saffron Chicken Tikka, Kakori Kebab",
          "Curries: Butter Chicken, Chicken Tikka Masala, Kashmiri Rogan Josh, Masala Fish Curry",
        ],
      },
      {
        heading: "Beyond halal — other dietary needs",
        body: [
          "The kitchen also accommodates vegetarian, vegan and gluten-friendly requirements, and can prepare dishes to a no-onion/no-garlic (Jain) standard with advance notice — ask your server or mention it when booking.",
        ],
      },
      {
        heading: "Visit us",
        body: [
          "The Grand Palace is in the basement at 261 George Street, Sydney CBD — about a 1-minute walk from Wynyard Station.",
        ],
        bullets: HOURS_BLOCK,
      },
    ],
    faq: [
      {
        q: "Is The Grand Palace halal certified?",
        a: "Yes. The Grand Palace uses halal-certified meat across all non-vegetarian dishes on the menu, sourced from certified suppliers, with no pork or alcohol used in food preparation.",
      },
      {
        q: "Are there vegetarian and vegan options as well as halal?",
        a: "Yes — the menu includes dedicated vegetarian and vegan dishes alongside the halal non-vegetarian range, and gluten-friendly options are available.",
      },
      {
        q: "Can you prepare no-onion, no-garlic (Jain) dishes?",
        a: "Yes, with advance notice. Let us know when booking or ordering and the kitchen will prepare your dishes to a no-onion/no-garlic standard.",
      },
    ],
    relatedSlugs: ["jain-restaurants-sydney", "indian-restaurant-near-wynyard-station-sydney", "best-indian-restaurant-sydney"],
    ctaLabel: "Book a Table",
    ctaHref: "/book-a-table",
  },

  "corporate-catering-sydney-cbd": {
    slug: "corporate-catering-sydney-cbd",
    title: "Corporate Catering Sydney CBD — Indian Food for Office Lunches & Dinners",
    metaTitle: "Corporate Catering Sydney CBD | The Grand Palace",
    metaDescription:
      "The Grand Palace offers Indian corporate catering across Sydney CBD — individually packed catering boxes from $75, or full on-site catering for larger events.",
    tag: "Catering",
    publishedDate: "2026-06-26",
    publishedDateDisplay: "Jun 26, 2026",
    updatedDate: "2026-07-22",
    updatedDateDisplay: "Jul 22, 2026",
    excerpt:
      "Organising catering for a meeting, training session, office lunch, or corporate event? Discover how The Grand Palace delivers premium Indian catering.",
    intro:
      "The Grand Palace provides corporate catering across Sydney's CBD as an alternative to standard sandwich platters — proper Indian food for office lunches, training sessions, board meetings and client functions, available for both lunch and dinner.",
    sections: [
      {
        heading: "Two ways to order corporate catering",
        body: [
          "Catering boxes — individually packaged vegetarian or non-vegetarian meals, built for meetings and training sessions where guests eat at their desks or in a boardroom rather than sitting down to a full meal.",
          "On-site catering — buffet setups, food stations or plated meals delivered and arranged at your venue, suited to larger gatherings and evening functions.",
        ],
      },
      {
        heading: "Custom menus built around your event",
        body: [
          "Every order is built around guest numbers, meal timing and dietary requirements. Menu selections span starters, mains, sides, desserts and beverages, with vegetarian, vegan, gluten-free and halal options throughout — the kitchen is halal-certified and HACCP approved.",
        ],
      },
      {
        heading: "How to book corporate catering",
        body: [],
        bullets: [
          "Select your catering style — individually packed boxes or full on-site service",
          "Customise the menu — vegetarian, non-vegetarian or mixed selections",
          "Confirm guest count, date and delivery/setup requirements",
          "Our team manages preparation through to service",
        ],
      },
      {
        heading: "Who we cater for",
        body: [],
        bullets: [
          "Office lunches and weekday team catering",
          "Board meetings and executive lunches",
          "Training sessions and conferences",
          "Client meetings and networking events",
          "Staff appreciation lunches and end-of-year functions",
        ],
      },
    ],
    pricingTable: {
      title: "Corporate catering pricing",
      note: "On-site event packages are quoted per person based on menu and guest count; contact us for a tailored quote.",
      rows: [
        { item: "Vegetarian Platter Box", price: "$75 / box", note: "Pickup or CBD delivery" },
        { item: "Non-Vegetarian Platter Box", price: "$85 / box", note: "Pickup or CBD delivery" },
        { item: "On-site catering packages", price: "From $45 / person", note: "Buffet, food stations or plated service" },
        { item: "Set menu banquets", price: "From $65 / person", note: "Minimum 2 guests, dine-in" },
        { item: "Minimum charge (dine-in)", price: "$35 / person", note: "Children aged 5–10: $25" },
      ],
    },
    faq: [
      {
        q: "Does The Grand Palace do corporate catering in Sydney CBD?",
        a: "Yes — two formats are available: individually packed catering boxes for meetings and training sessions, and full on-site catering (buffet, food stations or plated service) for larger events, for both lunch and dinner.",
      },
      {
        q: "What are catering boxes and when should I use them?",
        a: "Catering boxes are individually packed vegetarian ($75) or non-vegetarian ($85) meals, designed for meetings and training sessions where guests eat at their desks or in a boardroom rather than sitting down to a full meal.",
      },
      {
        q: "How many people can The Grand Palace cater for?",
        a: "The dining room accommodates up to 125 guests for on-site dine-in events across five private dining rooms. External delivery/catering guest numbers are confirmed at booking.",
      },
      {
        q: "Is the corporate catering from The Grand Palace halal?",
        a: "Yes — the kitchen is halal-certified and HACCP approved, and vegetarian, vegan and gluten-free options are available on request.",
      },
    ],
    relatedSlugs: ["how-to-plan-office-lunch-catering-sydney", "indian-catering-box-sydney", "indian-restaurant-near-martin-place"],
    ctaLabel: "Enquire About Catering",
    ctaHref: "/office-catering",
  },

  "indian-wedding-catering-sydney": {
    slug: "indian-wedding-catering-sydney",
    title: "Indian Wedding Catering Sydney — Your Complete Planning Guide",
    metaTitle: "Indian Wedding Catering Sydney | The Grand Palace",
    metaDescription:
      "Planning Indian wedding catering in Sydney? A complete guide to menu planning, budgeting, timelines and choosing a HACCP-certified caterer — from The Grand Palace.",
    tag: "Events",
    publishedDate: "2026-05-13",
    publishedDateDisplay: "May 13, 2026",
    updatedDate: "2026-07-22",
    updatedDateDisplay: "Jul 22, 2026",
    excerpt:
      "Planning the perfect Indian wedding catering in Sydney is one of the most important decisions you'll make. Here's your complete guide.",
    intro:
      "A traditional Indian wedding feast — a dawat — is a carefully curated spread of dishes that spans multiple courses, accommodates diverse guests, and honours the traditions and tastes of both families. In Australia, Indian wedding receptions typically blend traditional North Indian wedding dishes with modern event requirements: clear dietary labelling, hygienic service standards, and formal presentation.",
    sections: [
      {
        heading: "Traditional dishes for an Indian wedding menu in Sydney",
        body: [],
        bullets: [
          "Starters: Chicken Tikka, Samosa, Seekh Kebab, Paneer Tikka, Prawn Masala, Onion Bhaji",
          "Main course: Butter Chicken, Paneer Butter Masala, Lamb Rogan Josh, Dal Makhani, Chicken Biryani, Vegetable Biryani, Chicken Tikka Masala, Chana Masala",
          "Breads & accompaniments: Garlic Naan, Plain Naan, Roti (Chapati), Basmati Rice",
        ],
      },
      {
        heading: "How to choose an Indian wedding caterer in Sydney",
        body: [],
        bullets: [
          "HACCP certification for food safety",
          "Experience catering for large groups (50+ guests)",
          "Menu customisation flexibility",
          "Dietary accommodation — vegetarian, vegan, halal, gluten-free",
          "Tasting session availability",
          "References and reviews",
          "Clear, itemised pricing and a written contract",
        ],
      },
      {
        heading: "A six-month planning timeline",
        body: [],
        bullets: [
          "6 months before: initial enquiry and date confirmation",
          "4 months before: menu planning and tasting session",
          "3 months before: menu finalisation and contract signing",
          "1 month before: final guest count and dietary confirmation",
          "1 week before: final logistics confirmation",
        ],
      },
      {
        heading: "Budgeting for Indian wedding catering",
        body: [
          "Indian wedding catering in Sydney is typically priced per head, and every wedding is different — guest count, menu tiers and service style all move the final number. As a starting reference, our standard set menu banquets range from $65 to $95 per person (see the pricing table below); a wedding-specific quote will build on this depending on your course count, service style and guest numbers.",
        ],
        bullets: [
          "Get written quotes, not verbal ones",
          "Confirm exactly what's included in the price",
          "Add a 10% buffer for guest-count increases",
          "Ask about surcharges for extra dietary requirements",
          "Pay a deposit to secure your date",
        ],
      },
      {
        heading: "Why choose The Grand Palace",
        body: [],
        bullets: [
          "HACCP-certified, halal-certified kitchen",
          "Authentic North Indian cuisine",
          "Palace-inspired dining room for a formal setting",
          "Full dietary flexibility — vegetarian, vegan, halal, gluten-free, Jain",
          "Sydney CBD location, easy for interstate and local guests",
          "Experience catering events up to 125 guests across five private dining rooms",
        ],
      },
    ],
    pricingTable: {
      title: "Indicative per-person pricing (starting point)",
      note: "A full wedding quote depends on course count, guest numbers and service style — this reflects our standard banquet tiers as a starting reference, confirmed at consultation.",
      rows: [
        { item: "Vegetarian Banquet", price: "From $65 / person", note: "Minimum 2 guests" },
        { item: "Non-Vegetarian Banquet", price: "From $70 / person", note: "Minimum 2 guests" },
        { item: "TGP Special Banquet", price: "From $95 / person", note: "Minimum 2 guests" },
      ],
    },
    faq: [
      {
        q: "How much does Indian wedding catering cost in Sydney?",
        a: "Pricing is per head and depends on menu tier, course count and guest numbers. Our standard banquets start from $65 per person as a reference point — request a written, itemised quote for your exact guest count and menu.",
      },
      {
        q: "Is The Grand Palace HACCP certified?",
        a: "Yes, the kitchen is HACCP certified, which is worth confirming with any caterer handling a large wedding guest list.",
      },
      {
        q: "Can you cater for mixed dietary requirements at a wedding?",
        a: "Yes — vegetarian, vegan, halal, gluten-free and Jain (no onion/no garlic) requirements can all be accommodated with advance notice.",
      },
    ],
    relatedSlugs: ["corporate-catering-sydney-cbd", "private-event-venue-hire-sydney-cbd", "jain-restaurants-sydney"],
    ctaLabel: "Enquire About Wedding Catering",
    ctaHref: "/venue-catering",
  },

  "best-vegan-restaurant-sydney": {
    slug: "best-vegan-restaurant-sydney",
    title: "Best 15 Vegan Restaurant in Sydney",
    metaTitle: "Best Vegan Restaurant in Sydney | The Grand Palace",
    metaDescription:
      "Looking for vegan-friendly Indian food in Sydney CBD? The Grand Palace serves dedicated vegan dishes across starters, curries and biryanis — here's what to order and what to check before you book.",
    tag: "Dining",
    publishedDate: "2025-12-31",
    publishedDateDisplay: "Dec 31, 2025",
    updatedDate: "2026-07-27",
    updatedDateDisplay: "Jul 27, 2026",
    excerpt:
      "Sydney has become a thriving destination for vegan food lovers, offering everything from plant-based fine dining to casual vegan cafes.",
    intro:
      "Vegan dining in Sydney has moved well beyond salads and smoothie bowls — plant-based eaters now expect the same depth of flavour, feature-for-feature, as everyone else at the table. Below is a genuine cross-section of the city's standout vegan and vegan-friendly kitchens: fully plant-based fine diners, neighbourhood cafés, a vegan pub, and a proper Indian menu with vegan dishes built in from the start. Each listing covers what it's best for, its stand-out features, and its dietary flexibility — including where we, [The Grand Palace](/menu), fit into that picture, and what to actually check before you book anywhere.",
    quickAnswer:
      "For a full sit-down vegan Indian meal in Sydney CBD, The Grand Palace serves a dedicated line of vegan dishes across starters, curries, rice and biryani, available lunch and dinner, daily. For fully plant-based fine dining, Yellow in Potts Point is Sydney's best-known option; for casual and inner-west dining, Yulli's, Gigi Pizzeria, Miss Sina and Mama B's at the Chippo Hotel are well-regarded choices.",
    quickFacts: [
      { label: "Vegan dishes at The Grand Palace", value: "Lunch and dinner, every day" },
      { label: "Dietary flexibility", value: "Vegan, vegetarian, gluten-friendly, halal — all on one menu" },
    ],
    comparisonTable: {
      title: "Compare at a Glance",
      note: "The Grand Palace runs a mixed halal Indian menu with a dedicated vegan selection; the rest of the list is fully vegan kitchens.",
      rows: [
        { name: "The Grand Palace", area: "Sydney CBD", style: "Indian fine dining", dietary: "Vegan dishes + halal, vegetarian menu", goodForGroups: true, highlight: true },
        { name: "Yellow", area: "Potts Point", style: "Vegan fine dining", dietary: "Fully vegan, GF options", goodForGroups: false },
        { name: "Towzen", area: "Sydney CBD", style: "Japanese-inspired", dietary: "Fully vegan", goodForGroups: false },
        { name: "Gigi Pizzeria", area: "Newtown", style: "Vegan pizzeria", dietary: "Fully vegan, GF bases", goodForGroups: false },
        { name: "Yulli's", area: "Surry Hills", style: "Small plates / bar", dietary: "Plant-based menu, GF options", goodForGroups: true },
        { name: "Miss Sina", area: "Marrickville", style: "Vegan bakery & café", dietary: "Fully vegan", goodForGroups: false },
        { name: "Mama B's (Chippo Hotel)", area: "Chippendale", style: "Vegan pub food", dietary: "Fully vegan", goodForGroups: true },
        { name: "Little Turtle", area: "Enmore", style: "Vegan Thai", dietary: "Fully vegan", goodForGroups: false },
        { name: "Golden Lotus", area: "Newtown", style: "Vegan Vietnamese, BYO", dietary: "Fully vegan", goodForGroups: false },
      ],
    },
    sections: [
      {
        heading: "What actually makes a restaurant vegan-friendly",
        body: [
          "A single 'vegan option' bolted onto an otherwise meat-and-dairy-heavy menu isn't the same as a kitchen that treats plant-based dining as standard. The difference worth checking for: dishes clearly labelled vegan across every course (not just entrées), a kitchen willing to adjust standard dishes on request, and enough range that a group with mixed dietary needs can still share plates comfortably. The list below includes both fully vegan venues and mixed-menu restaurants — like ours — that take vegan dining seriously rather than treating it as an afterthought.",
        ],
      },
      {
        heading: "1. The Grand Palace — Sydney CBD",
        image: grandPalaceStorefront,
        imageAlt: "The Grand Palace Indian Restaurant storefront on George Street, Sydney CBD",
        body: [
          "Our own kitchen, in the basement at 261 George Street, keeps a proper spread of vegan dishes across starters, lentil and vegetable curries, rice and biryani, drawing on North Indian vegetarian cooking that's naturally plant-based once dairy and ghee are removed. It's best suited to a group booking or a proper sit-down meal rather than a quick solo lunch.",
        ],
        bullets: [
          "Best for: a full multi-course vegan Indian meal, including group set menu banquets",
          "Try: Chana Masala, Dal Tadka (vegan preparation), Baingan Bharta, Vegetable Biryani",
          "Features: palace-inspired dining room, five private dining spaces, seats up to 125",
          "Dietary options: vegan, vegetarian, halal, gluten-friendly and Jain (no onion/no garlic) on request",
          "[Book a table](/book-a-table) or [view the full menu](/menu)",
        ],
      },
      {
        heading: "2. Yellow — Potts Point",
        bannerIcon: "fine-dining",
        body: [
          "An award-winning, fully vegan fine diner known for its seasonal, produce-driven multi-course tasting menu — a genuine plant-based degustation rather than a vegetable side-dish approach.",
        ],
        bullets: [
          "Best for: a special-occasion vegan fine dining experience",
          "Features: seasonal tasting menu, wine and non-alcoholic pairing options, nature-inspired dining room",
          "Dietary options: fully vegan menu, with gluten-free adaptations available — worth confirming any allergies when booking",
        ],
      },
      {
        heading: "3. Towzen — Sydney CBD",
        bannerIcon: "ramen",
        body: [
          "A fully vegan restaurant with roots in Kyoto-style cooking, known for dishes like its Truffle Ramen made with a walnut-mylk broth — a good option if you want vegan food that doesn't taste like a substitution.",
        ],
        bullets: [
          "Best for: modern, Japanese-influenced vegan cooking",
          "Features: Kyoto-inspired small plates and ramen, central CBD location",
          "Dietary options: fully vegan menu",
        ],
      },
      {
        heading: "4. Gigi Pizzeria — Newtown",
        bannerIcon: "pizza",
        body: [
          "A vegan pizzeria that's also a certified member of the Associazione Verace Pizza Napoletana, meaning the wood-fired, Napoletana-style bases are held to the same standard as traditional Italian pizzerias — just entirely plant-based. It's popular enough that they don't take bookings, so an early arrival helps on weekends.",
        ],
        bullets: [
          "Best for: casual vegan pizza night",
          "Features: wood-fired Napoletana-style pizza, no reservations (walk-in only)",
          "Dietary options: fully vegan menu, with gluten-free bases available",
        ],
      },
      {
        heading: "5. Yulli's — Surry Hills",
        bannerIcon: "smallplates",
        body: [
          "One of Sydney's longer-running vegetarian and vegan-friendly restaurants, with a globally-inspired small-plates menu that's popular for relaxed group dinners.",
        ],
        bullets: [
          "Best for: a casual vegan-friendly group dinner in Surry Hills",
          "Features: eclectic small-plates sharing menu, relaxed bar-restaurant atmosphere",
          "Dietary options: fully plant-based dishes throughout, with a separate gluten-free menu",
        ],
      },
      {
        heading: "6. Miss Sina — Marrickville",
        bannerIcon: "bakery",
        body: [
          "A fully vegan bakery and café known for brunch dishes and baked goods, including German-inspired pastries and its well-known cinnamon scrolls.",
        ],
        bullets: [
          "Best for: vegan brunch and bakery treats",
          "Features: fresh-baked pastries daily, casual café setting",
          "Dietary options: fully vegan menu throughout",
        ],
      },
      {
        heading: "7. Mama B's at the Chippo Hotel — Chippendale",
        bannerIcon: "pub",
        body: [
          "Sydney's first fully vegan pub bistro, serving plant-based takes on classic pub food inside the Chippo Hotel — itself Australia's first all-vegan pub, including the bar.",
        ],
        bullets: [
          "Best for: vegan pub food with a proper pub atmosphere",
          "Features: classic pub-food menu (burgers, bangers and mash, loaded fries) made fully plant-based, full bar",
          "Dietary options: fully vegan kitchen and bar",
        ],
      },
      {
        heading: "8. Little Turtle — Enmore",
        bannerIcon: "thai",
        body: [
          "A popular, fully vegan Thai kitchen known for reworking classic Thai dishes into plant-based versions without losing the flavour balance the cuisine is known for.",
        ],
        bullets: [
          "Best for: vegan Thai food",
          "Features: cosy, stylish dining room; classic Thai dishes reworked plant-based",
          "Dietary options: fully vegan menu",
        ],
      },
      {
        heading: "9. Golden Lotus — Newtown",
        bannerIcon: "vietnamese",
        body: [
          "A budget-friendly, BYO Vietnamese restaurant directly across from Newtown Station, easily spotted by its pink 'Veganism Is Magic' neon sign. A solid pick if you want a quick, inexpensive vegan meal rather than a sit-down occasion.",
        ],
        bullets: [
          "Best for: a quick, inexpensive vegan Vietnamese meal",
          "Features: BYO, casual walk-in dining, right next to Newtown Station",
          "Dietary options: fully vegan menu",
        ],
      },
      {
        heading: "Wrapping up",
        body: [
          "Sydney's vegan scene spans a genuinely wide range — from a five-course tasting menu at Yellow to a quick pub feed at Mama B's, with a lot of ground in between. For a full sit-down Indian meal with proper depth across starters, curries and biryani — and the option to bring a group with mixed dietary needs to the same table — [The Grand Palace](/menu) remains our recommendation, with [set menu banquets](/set-menu) making group ordering simple.",
        ],
      },
    ],
    faq: [
      {
        q: "Does The Grand Palace have a dedicated vegan menu?",
        a: "Yes — vegan dishes are clearly marked across starters, curries, rice and biryani, and the kitchen can adjust select standard dishes to remove dairy and ghee on request.",
      },
      {
        q: "What's the best vegan restaurant in Sydney for a group booking?",
        a: "It depends on the group — for a full sit-down Indian meal with a shared vegan set menu, The Grand Palace's group banquets work well; for a fully plant-based menu across the whole table, Yulli's or Mama B's at the Chippo Hotel are solid casual options.",
      },
      {
        q: "Is Indian food naturally vegan-friendly?",
        a: "A lot of it is — dishes built around lentils, chickpeas and vegetables are traditionally plant-based. The main things to check are ghee (clarified butter) and cream, which most Indian kitchens, including ours, can substitute out on request.",
      },
      {
        q: "Which of these restaurants are fully vegan, versus vegan-friendly?",
        a: "Yellow, Towzen, Gigi Pizzeria, Miss Sina, Mama B's, Little Turtle and Golden Lotus are fully vegan kitchens. Yulli's is vegetarian-based with extensive vegan options. The Grand Palace is a mixed halal Indian menu with a dedicated vegan selection rather than an all-vegan kitchen.",
      },
    ],
    externalLinks: [
      { label: "More vegan dining recommendations across Sydney", href: "https://www.sydney.com/articles/the-best-vegan-restaurants-in-sydney", source: "Sydney.com — official Destination NSW tourism guide" },
    ],
    relatedSlugs: ["best-halal-restaurant-sydney", "vegetarian-restaurants-chippendale", "jain-restaurants-sydney"],
    ctaLabel: "View the Menu",
    ctaHref: "/menu",
  },

  "best-halal-restaurant-sydney": {
    slug: "best-halal-restaurant-sydney",
    title: "20 Best Halal Restaurant in Sydney",
    metaTitle: "Best Halal Restaurant in Sydney | The Grand Palace",
    metaDescription:
      "Searching for a genuinely halal-certified restaurant in Sydney CBD? The Grand Palace uses halal-certified meat across its entire non-vegetarian menu — here's what to check and what to order.",
    tag: "Dining",
    publishedDate: "2025-05-02",
    publishedDateDisplay: "May 2, 2025",
    updatedDate: "2026-07-27",
    updatedDateDisplay: "Jul 27, 2026",
    excerpt:
      "Sydney is a vibrant melting pot of cultures, and its food scene reflects this beautifully — especially for halal dining.",
    intro:
      "\"Halal-friendly\" and \"halal-certified\" get used interchangeably online, but they're not the same thing — one means some menu items happen to avoid pork, the other means a verified supply chain and kitchen process. Below is a genuine cross-section of Sydney CBD's halal dining scene — from certified Indian and Malaysian kitchens to Turkish and Lebanese options — including where [The Grand Palace](/menu) fits in, and what to actually check before you book anywhere.",
    quickAnswer:
      "The Grand Palace is a fully halal-certified Indian restaurant in Sydney CBD, with certified meat across the entire non-vegetarian menu. For other cuisines, Ipoh on York (Malaysian hawker-style) and Neptune Palace (Malaysian/Cantonese) are well-known halal-certified options in the CBD, alongside Mecca Bah (Middle Eastern, Darling Harbour) and Jounieh (Lebanese, Walsh Bay).",
    quickFacts: [
      { label: "Certification", value: "Halal-certified across our full non-vegetarian menu" },
      { label: "Also accommodates", value: "Vegetarian, vegan, gluten-friendly and Jain requests" },
    ],
    comparisonTable: {
      title: "Compare at a Glance",
      note: "All restaurants below use halal-certified meat. The Grand Palace's certification covers our entire non-vegetarian menu.",
      rows: [
        { name: "The Grand Palace", area: "Sydney CBD", style: "Indian fine dining", dietary: "Halal-certified + vegetarian, vegan", goodForGroups: true, highlight: true },
        { name: "Ipoh on York", area: "Sydney CBD", style: "Malaysian hawker-style", dietary: "Halal-certified", goodForGroups: false },
        { name: "Neptune Palace", area: "Circular Quay", style: "Malaysian & Cantonese", dietary: "Halal-certified", goodForGroups: true },
        { name: "Mecca Bah", area: "Darling Harbour", style: "Middle Eastern", dietary: "Halal-certified", goodForGroups: true },
        { name: "Jounieh", area: "Walsh Bay", style: "Lebanese", dietary: "Halal-certified", goodForGroups: true },
      ],
    },
    sections: [
      {
        heading: "What to actually check when a menu says 'halal'",
        body: [
          "Ask three things: is the meat sourced from a certified halal supplier, is it prepared separately from non-halal ingredients, and does the certification cover the whole menu or just some dishes? A restaurant can be broadly Muslim-friendly without every dish being certified — worth clarifying if it matters to your group. The list below mixes certified kitchens across several cuisines so you can compare.",
        ],
      },
      {
        heading: "1. The Grand Palace — Sydney CBD",
        image: grandPalaceStorefront,
        imageAlt: "The Grand Palace Indian Restaurant storefront on George Street, Sydney CBD",
        body: [
          "In the basement at 261 George Street, our entire non-vegetarian menu uses halal-certified meat from certified suppliers, with no pork or alcohol used in food preparation — not a handful of halal-labelled dishes on an otherwise mixed menu.",
        ],
        bullets: [
          "Try: Murgh Afghani Tikka, Butter Chicken, Kashmiri Rogan Josh, Chicken Tikka Masala",
          "For groups: [set menu banquets](/set-menu) from $65 per person, built around halal mains with vegetarian sides",
          "Also accommodates: vegetarian, vegan, gluten-friendly and Jain (no onion/no garlic) requests — see our [Jain dining guide](/guides/jain-restaurants-sydney)",
          "[Book a table](/book-a-table) or [view the full menu](/menu)",
        ],
      },
      {
        heading: "2. Ipoh on York — Sydney CBD",
        bannerIcon: "malaysian",
        body: [
          "A halal-certified Malaysian food hall in the heart of the CBD, popular with office workers at lunchtime for laksa, char kway teow and chicken rice.",
        ],
        bullets: ["Best for: a quick halal Malaysian lunch in the CBD"],
      },
      {
        heading: "3. Neptune Palace — Sydney CBD",
        bannerIcon: "fine-dining",
        body: [
          "A long-running halal-certified Malaysian and Cantonese restaurant with an extensive menu, known for its murtabak — spiced beef mince wrapped in roti canai.",
        ],
        bullets: ["Best for: a bigger group Malaysian/Cantonese menu"],
      },
      {
        heading: "4. Mecca Bah — Darling Harbour",
        bannerIcon: "middleeastern",
        body: [
          "A halal-certified Middle Eastern and Mediterranean restaurant at King Street Wharf, Darling Harbour, known for mezze platters and tagines with waterfront views.",
        ],
        bullets: ["Best for: halal Middle Eastern dining with a harbour view"],
      },
      {
        heading: "5. Jounieh — Walsh Bay",
        bannerIcon: "lebanese",
        body: [
          "A Lebanese restaurant in Walsh Bay with waterfront views, offering a more refined take on Lebanese dining than the typical casual grill house.",
        ],
        bullets: ["Best for: a sit-down Lebanese dinner with a view"],
      },
    ],
    faq: [
      {
        q: "Is The Grand Palace fully halal certified, or just some dishes?",
        a: "The entire non-vegetarian menu uses halal-certified meat from certified suppliers — it's not limited to a handful of dishes. No pork or alcohol is used in food preparation.",
      },
      {
        q: "What halal options are there in Sydney CBD besides Indian food?",
        a: "Malaysian (Ipoh on York, Neptune Palace), Middle Eastern (Mecca Bah) and Lebanese (Jounieh) are all well-regarded halal-certified options within or near the CBD.",
      },
      {
        q: "Do I need to request halal specifically when booking at The Grand Palace?",
        a: "No — the entire non-vegetarian menu is halal-certified by default. You only need to flag additional dietary needs, like Jain or gluten-free preparation.",
      },
    ],
    externalLinks: [
      { label: "Sydney dining and food precincts", href: "https://www.sydney.com/", source: "Destination NSW — official Sydney tourism site" },
    ],
    relatedSlugs: ["best-halal-indian-restaurant-sydney", "best-vegan-restaurant-sydney", "jain-restaurants-sydney"],
    ctaLabel: "Book a Table",
    ctaHref: "/book-a-table",
  },

  "vegetarian-restaurants-chippendale": {
    slug: "vegetarian-restaurants-chippendale",
    title: "Top Vegetarian-Friendly Restaurants near Chippendale",
    metaTitle: "Vegetarian-Friendly Indian Restaurant near Chippendale | The Grand Palace",
    metaDescription:
      "Based near Chippendale and after proper sit-down vegetarian Indian food? The Grand Palace in Sydney CBD is a short trip away, with a full vegetarian and vegan menu.",
    tag: "Dining",
    publishedDate: "2025-06-26",
    publishedDateDisplay: "Jun 26, 2025",
    updatedDate: "2026-07-27",
    updatedDateDisplay: "Jul 27, 2026",
    excerpt:
      "Chippendale and its surrounding areas have become a popular hub for diverse and inclusive dining options in Sydney.",
    intro:
      "Chippendale has built a strong reputation for its own café, small-bar and hawker-alley dining scene, with a genuinely good spread of vegetarian options within walking distance. Below is an honest look at the standout vegetarian-friendly spots in and around Chippendale — including [The Grand Palace](/menu), a short trip north in Sydney CBD, for when you want a full multi-course vegetarian Indian menu rather than a single plant-based special.",
    quickAnswer:
      "For casual vegetarian dining right in Chippendale, Spice Alley and Andiamo Trattoria are both local options within walking distance. For a full sit-down vegetarian Indian meal, The Grand Palace in Sydney CBD is roughly a 20-minute walk or a short trip via Central Station, with vegetarian dishes served across the whole menu, lunch and dinner, daily.",
    quickFacts: [
      { label: "Distance from Chippendale to The Grand Palace", value: "~2.5km — short train, taxi or rideshare trip via Central" },
      { label: "Vegetarian & vegan dishes", value: "Available across the full menu, lunch and dinner" },
    ],
    comparisonTable: {
      title: "Compare at a Glance",
      note: "Mina Maria's main restaurant is in Newtown, with a smaller counter in Chippendale itself — everything else listed is directly in or immediately around Chippendale.",
      rows: [
        { name: "The Grand Palace", area: "Sydney CBD", style: "Indian fine dining", dietary: "Vegetarian, vegan, halal, GF", goodForGroups: true, highlight: true },
        { name: "Spice Alley", area: "Chippendale", style: "Asian hawker laneway", dietary: "Vegetarian-friendly stalls", goodForGroups: true },
        { name: "Mina Maria", area: "Newtown (Chippendale counter)", style: "Vegan café", dietary: "Fully vegan", goodForGroups: false },
        { name: "Andiamo Trattoria", area: "Chippendale", style: "Vegetarian Italian", dietary: "Vegetarian + vegan menu", goodForGroups: true },
        { name: "Hari's Vegetarian", area: "Haymarket", style: "Vegetarian Indian-style", dietary: "Fully vegetarian/vegan", goodForGroups: false },
      ],
    },
    sections: [
      {
        heading: "1. The Grand Palace — Sydney CBD",
        image: grandPalaceStorefront,
        imageAlt: "The Grand Palace Indian Restaurant storefront on George Street, Sydney CBD",
        body: [
          "The most direct route from Chippendale is via Central Station, followed by a walk north up George Street toward Wynyard — our basement entrance at 261 George Street is on the way. By car or rideshare it's usually well under 10 minutes outside peak traffic. It's a different kind of meal to a quick vegetarian bite: a full multi-course Indian menu, better suited to a group dinner or a slower weekend lunch.",
        ],
        bullets: [
          "Try: Shahi Paneer, Paneer Butter Masala, Dal Makhani, Vegetable Biryani",
          "For groups: [set menu banquets](/set-menu) from $65 per person include a dedicated vegetarian tier",
          "Also accommodates: vegan, gluten-friendly and halal requests on the same menu",
          "[Book a table](/book-a-table), [view the menu](/menu) or see our [location and directions](/contact)",
        ],
      },
      {
        heading: "2. Spice Alley — Chippendale",
        bannerIcon: "ramen",
        body: [
          "An open-air hawker-style laneway right in Chippendale, with a rotating line-up of Asian food stalls — a good option if you want to graze across a few different vegetarian dishes casually rather than sit down to a set menu.",
        ],
        bullets: ["Best for: casual, walk-up vegetarian street food in Chippendale itself"],
      },
      {
        heading: "3. Mina Maria — Newtown, with a Chippendale counter",
        bannerIcon: "bakery",
        body: [
          "Mina Maria's main plant-based restaurant is on King Street in Newtown; it also runs a smaller retail counter in Chippendale, inside The Old Rum Store on Kensington Street. Worth knowing which location you're heading to before you go.",
        ],
        bullets: ["Best for: vegan café food, if you don't mind the short trip to the Newtown restaurant"],
      },
      {
        heading: "4. Andiamo Trattoria — Chippendale",
        bannerIcon: "pizza",
        body: [
          "A vegetarian and vegan-friendly Italian spot in the heart of Chippendale, popular for its relaxed atmosphere and service.",
        ],
        bullets: ["Best for: vegetarian Italian in Chippendale"],
      },
      {
        heading: "5. Hari's Vegetarian — Haymarket",
        bannerIcon: "smallplates",
        body: [
          "A relaxed vegan and vegetarian restaurant with a strong Indian-leaning menu — curries, dal, salads and quick bites — in Haymarket, a short trip from Chippendale.",
        ],
        bullets: ["Best for: casual vegan/vegetarian Indian-style food"],
      },
    ],
    faq: [
      {
        q: "How far is The Grand Palace from Chippendale?",
        a: "About 2.5km — roughly a 20-minute walk, a short trip via Central Station, or under 10 minutes by car or rideshare outside peak traffic.",
      },
      {
        q: "Is there vegetarian food within walking distance of Chippendale itself?",
        a: "Yes — Spice Alley and Andiamo Trattoria are both vegetarian-friendly options right in Chippendale. Mina Maria's main restaurant is a short trip away in Newtown, though it has a small retail counter in Chippendale too.",
      },
      {
        q: "Where should I go from Chippendale for a full vegetarian Indian menu, not just a couple of dishes?",
        a: "The Grand Palace in Sydney CBD — vegetarian dishes span starters, paneer and lentil curries, biryani and breads, with vegan and gluten-friendly options clearly marked throughout, plus set menu banquets for groups.",
      },
    ],
    externalLinks: [
      { label: "Getting around Sydney CBD and Central", href: "https://transportnsw.info/", source: "Transport for NSW" },
    ],
    relatedSlugs: ["best-vegan-restaurant-sydney", "best-halal-restaurant-sydney", "indian-restaurant-near-town-hall-station"],
    ctaLabel: "Book a Table",
    ctaHref: "/book-a-table",
  },
};

export function getGuide(slug: string): GuideContent | undefined {
  return guidesContent[slug];
}
