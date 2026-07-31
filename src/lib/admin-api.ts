// "" (empty string, set in .env.production) means same-origin/relative —
// requests go through this site's own /api/** proxy (see vite.config.ts
// routeRules) rather than directly cross-domain to the backend, so `||`
// must NOT treat that empty string as "unset".
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  // FormData (file uploads) must NOT get an explicit Content-Type — the browser
  // sets multipart/form-data with the correct boundary itself. Setting it manually
  // (as "application/json") corrupts the upload and the server can't parse it.
  const isFormData = options.body instanceof FormData;
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = body.error || message;
    } catch {
      // ignore
    }
    throw new ApiError(res.status, message);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: "POST", body: data !== undefined ? JSON.stringify(data) : undefined }),
  patch: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: "PATCH", body: data !== undefined ? JSON.stringify(data) : undefined }),
  put: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: "PUT", body: data !== undefined ? JSON.stringify(data) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  upload: <T>(path: string, file: File, fieldName = "photo") => {
    const form = new FormData();
    form.append(fieldName, file);
    return request<T>(path, { method: "POST", body: form });
  },
  // Vercel serverless functions cap request bodies at ~4.5MB, so anything
  // routed through our own endpoint (the `upload` helper above) fails for
  // typical phone-camera photos. This instead fetches a short-lived token
  // from our backend (via the normal cookie-authenticated `request()` path,
  // since the Blob SDK's own `upload()` helper doesn't support sending
  // credentials cross-origin), then uploads the file bytes straight to Blob
  // storage from the browser using that token, bypassing our function
  // entirely for the actual file bytes.
  async uploadDirect(file: File): Promise<{ url: string }> {
    const { put } = await import("@vercel/blob/client");
    const { clientToken } = await request<{ clientToken: string }>("/api/uploads/client-token", {
      method: "POST",
      body: JSON.stringify({
        type: "blob.generate-client-token",
        payload: { pathname: file.name, clientPayload: null, multipart: false },
      }),
    });
    const blob = await put(file.name, file, { access: "public", token: clientToken });
    return { url: blob.url };
  },
};

export { ApiError, API_URL };

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  price: string | null;
  badge: string | null;
  imageUrl: string | null;
  active: boolean;
  sortOrder: number;
  extra: Record<string, unknown> | null;
};

export type MenuCategory = {
  id: string;
  menuType: string;
  menuLabel: string | null;
  slug: string;
  label: string;
  tag: string | null;
  imageUrl: string | null;
  active: boolean;
  sortOrder: number;
  items: MenuItem[];
};

export type MenuTypeInfo = { menuType: string; label: string };

export type Enquiry = {
  id: string;
  type: string;
  status: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  step: string | null;
  sessionId: string | null;
  data: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
};

export type PageContent = {
  id: string;
  path: string;
  heroKicker: string | null;
  heroHeadlineTop: string | null;
  heroHeadlineBottom: string | null;
  heroSubtext: string | null;
  aboutHeading: string | null;
  aboutBody: string | null;
  menuSectionHeading: string | null;
  menuSectionBody: string | null;
  menuSectionImage: string | null;
  updatedAt: string;
};

export type SeoSetting = {
  id: string;
  path: string;
  metaTitle: string | null;
  metaDescription: string | null;
  focusKeywords: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
  schema: Record<string, unknown> | null;
  headTags: string | null;
  updatedAt: string;
};

export type Redirect = {
  id: string;
  fromPath: string;
  toPath: string;
  statusCode: number;
  active: boolean;
  createdAt: string;
};

export type SiteSeoConfig = {
  id: string;
  robotsTxt: string | null;
  headerCode: string | null;
  footerCode: string | null;
};

export type Review = {
  id: string;
  name: string;
  quote: string;
  stars: number;
  source: string | null;
  reviewerMeta: string | null;
  active: boolean;
  sortOrder: number;
};

export type GalleryImage = {
  id: string;
  collection: string;
  category: string;
  url: string;
  alt: string | null;
  sortOrder: number;
};

export type SitePage = {
  id: string;
  slug: string;
  emoji: string | null;
  badge: string | null;
  badgeColor: string | null;
  title: string;
  subtitle: string;
  heroImage: string;
  cardImageHeight: number | null;
  sidebarImage: string;
  highlightLine: string | null;
  intro: string | null;
  sections: Array<{ heading: string; priceTag?: string; intro?: string; items: string[] }>;
  ctaLabel: string;
  ctaHref: string;
  cta2Label: string | null;
  cta2Href: string | null;
  published: boolean;
};

export type GuideQuickFact = { label: string; value: string };
export type GuideComparisonRow = { name: string; area: string; style: string; dietary: string; goodForGroups: boolean; highlight?: boolean };
export type GuideComparisonTable = { title: string; note?: string; rows: GuideComparisonRow[] };
export type GuideBlockType = "listing" | "text" | "box" | "row";
export type GuideSection = { heading: string; body: string[]; bullets?: string[]; image?: string; imageAlt?: string; bannerIcon?: string; blockType?: GuideBlockType; items?: string[]; showFactsTable?: boolean };
export type GuideFAQ = { q: string; a: string };
export type GuideExternalLink = { label: string; href: string; source: string };
export type GuidePricingRow = { item: string; price: string; note?: string };

export type Guide = {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  tag: string;
  publishedDate: string;
  publishedDateDisplay: string;
  updatedDate: string;
  updatedDateDisplay: string;
  excerpt: string;
  intro: string;
  quickAnswer: string | null;
  quickFacts: GuideQuickFact[] | null;
  comparisonTable: GuideComparisonTable | null;
  sections: GuideSection[];
  pricingTable: { title: string; note?: string; rows: GuidePricingRow[] } | null;
  externalLinks: GuideExternalLink[] | null;
  faq: GuideFAQ[];
  relatedSlugs: string[];
  ctaLabel: string;
  ctaHref: string;
  published: boolean;
  sortOrder: number;
  guideType: "normal" | "listicle";
};
