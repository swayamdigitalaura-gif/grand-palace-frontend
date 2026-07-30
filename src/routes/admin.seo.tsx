import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api, type SeoSetting, type Redirect, type SiteSeoConfig } from "@/lib/admin-api";
import { SITE_PAGES } from "@/lib/sitePages";

export const Route = createFileRoute("/admin/seo")({
  component: AdminSeo,
});

const TABS = [
  { id: "pages", label: "Pages" },
  { id: "redirects", label: "Redirects" },
  { id: "robots", label: "Robots.txt" },
  { id: "sitemap", label: "Sitemap" },
  { id: "code", label: "Header & Footer Code" },
] as const;

const inputCls = "w-full rounded-lg px-3 py-2 text-sm bg-white outline-none border";
const inputStyle = { borderColor: "rgba(200,140,30,0.25)", color: "#1a0e00" };
const labelCls = "text-[11px] uppercase tracking-wider font-semibold block mb-1.5";
const labelStyle = { color: "#7a5020" };

function AdminSeo() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("pages");

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="font-display text-3xl mb-1" style={{ color: "#1a0e00" }}>SEO</h1>
      <p className="text-sm text-stone-500 mb-6">
        Manage robots.txt, redirects, site-wide header/footer code, and per-page meta &amp; schema.
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wide transition"
            style={
              tab === t.id
                ? { background: "linear-gradient(90deg,#c8860a,#e6a020)", color: "#fff" }
                : { background: "#fff", color: "#7a5020", border: "1px solid rgba(200,140,30,0.25)" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "pages" && <PagesTab />}
      {tab === "redirects" && <RedirectsTab />}
      {tab === "robots" && <RobotsTab />}
      {tab === "sitemap" && <SitemapTab />}
      {tab === "code" && <CodeTab />}
    </div>
  );
}

/* ───────────────────── Pages tab ───────────────────── */

function PagesTab() {
  const [editingPath, setEditingPath] = useState<string | null>(null);
  const { data: settings } = useQuery({
    queryKey: ["admin-seo-pages"],
    queryFn: () => api.get<SeoSetting[]>("/api/seo/pages"),
  });
  const byPath = new Map((settings ?? []).map((s) => [s.path, s]));

  return (
    <>
      <p className="text-[12px] text-stone-500 mb-4">
        Only <strong>Home</strong> currently applies these overrides live on the site — the rest save here as groundwork for a fast follow-up.
      </p>
      <div className="space-y-2">
        {SITE_PAGES.map((p) => {
          const setting = byPath.get(p.path);
          const isLive = p.path === "/";
          return (
            <div key={p.path} className="bg-white rounded-xl border border-stone-200 p-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: "#1a0e00" }}>{p.label}</span>
                  {isLive && (
                    <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full" style={{ background: "rgba(74,140,58,0.12)", color: "#4a8c3a" }}>
                      Live
                    </span>
                  )}
                  {setting && (
                    <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full" style={{ background: "rgba(200,140,10,0.12)", color: "#a05a0a" }}>
                      Customised
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-400 truncate">{p.path}</p>
              </div>
              <button onClick={() => setEditingPath(p.path)} className="btn-gold !text-[11px] !px-3 !py-1.5 shrink-0">
                SEO Settings
              </button>
            </div>
          );
        })}
      </div>
      {editingPath && (
        <SeoSettingsModal
          path={editingPath}
          pageLabel={SITE_PAGES.find((p) => p.path === editingPath)?.label ?? editingPath}
          existing={byPath.get(editingPath)}
          onClose={() => setEditingPath(null)}
        />
      )}
    </>
  );
}

function SeoSettingsModal({
  path, pageLabel, existing, onClose,
}: {
  path: string;
  pageLabel: string;
  existing?: SeoSetting;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [subTab, setSubTab] = useState<"meta" | "schema" | "head">("meta");
  const [form, setForm] = useState({
    metaTitle: existing?.metaTitle ?? "",
    metaDescription: existing?.metaDescription ?? "",
    focusKeywords: existing?.focusKeywords ?? "",
    ogImage: existing?.ogImage ?? "",
    canonicalUrl: existing?.canonicalUrl ?? "",
    schema: existing?.schema ? JSON.stringify(existing.schema, null, 2) : "",
    headTags: existing?.headTags ?? "",
  });
  const [schemaError, setSchemaError] = useState("");

  const save = useMutation({
    mutationFn: () => {
      let schemaJson: unknown = undefined;
      if (form.schema.trim()) {
        schemaJson = JSON.parse(form.schema);
      }
      return api.put("/api/seo/pages", {
        path,
        metaTitle: form.metaTitle || null,
        metaDescription: form.metaDescription || null,
        focusKeywords: form.focusKeywords || null,
        ogImage: form.ogImage || null,
        canonicalUrl: form.canonicalUrl || null,
        schema: schemaJson ?? null,
        headTags: form.headTags || null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-seo-pages"] });
      onClose();
    },
  });

  function handleSave() {
    setSchemaError("");
    if (form.schema.trim()) {
      try {
        JSON.parse(form.schema);
      } catch {
        setSchemaError("This isn't valid JSON — check for a missing comma or bracket.");
        setSubTab("schema");
        return;
      }
    }
    save.mutate();
  }

  const reset = useMutation({
    mutationFn: () => api.delete(`/api/seo/pages?path=${encodeURIComponent(path)}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-seo-pages"] });
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(20,12,0,0.5)" }} onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-stone-100 sticky top-0 bg-white z-10">
          <h2 className="font-display text-xl" style={{ color: "#1a0e00" }}>SEO Settings — {pageLabel}</h2>
          <p className="text-[11px] text-stone-400 mt-0.5">{path}</p>
          <div className="flex gap-1 mt-3">
            {(["meta", "schema", "head"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSubTab(t)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wide"
                style={subTab === t ? { background: "rgba(200,140,10,0.12)", color: "#a05a0a" } : { color: "#a8a29e" }}
              >
                {t === "meta" ? "SEO & Meta" : t === "schema" ? "Schema" : "Head Tags"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 space-y-4">
          {subTab === "meta" && (
            <>
              <div>
                <label className={labelCls} style={labelStyle}>
                  Meta Title <span className="float-right normal-case font-normal text-stone-400">{form.metaTitle.length}/60</span>
                </label>
                <input className={inputCls} style={inputStyle} value={form.metaTitle} maxLength={70}
                  onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))} placeholder="SEO title (50-60 chars)" />
              </div>
              <div>
                <label className={labelCls} style={labelStyle}>
                  Meta Description <span className="float-right normal-case font-normal text-stone-400">{form.metaDescription.length}/160</span>
                </label>
                <textarea className={`${inputCls} resize-none`} style={inputStyle} rows={3} value={form.metaDescription} maxLength={180}
                  onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))} placeholder="SEO description (150-160 chars)" />
              </div>
              <div>
                <label className={labelCls} style={labelStyle}>Focus Keywords</label>
                <input className={inputCls} style={inputStyle} value={form.focusKeywords}
                  onChange={(e) => setForm((f) => ({ ...f, focusKeywords: e.target.value }))} placeholder="keyword1, keyword2, keyword3" />
              </div>
              <div>
                <label className={labelCls} style={labelStyle}>OG Image URL</label>
                <input className={inputCls} style={inputStyle} value={form.ogImage}
                  onChange={(e) => setForm((f) => ({ ...f, ogImage: e.target.value }))} placeholder="https://... (1200x630px for social sharing)" />
              </div>
              <div>
                <label className={labelCls} style={labelStyle}>Canonical URL</label>
                <input className={inputCls} style={inputStyle} value={form.canonicalUrl}
                  onChange={(e) => setForm((f) => ({ ...f, canonicalUrl: e.target.value }))} placeholder="Leave blank to use default." />
                <p className="text-[11px] text-stone-400 mt-1">Set only if duplicate content exists elsewhere.</p>
              </div>
            </>
          )}

          {subTab === "schema" && (
            <div>
              <label className={labelCls} style={labelStyle}>Custom JSON-LD Schema</label>
              <textarea className={`${inputCls} resize-none font-mono text-[12px]`} style={inputStyle} rows={12} value={form.schema}
                onChange={(e) => { setForm((f) => ({ ...f, schema: e.target.value })); setSchemaError(""); }}
                placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "Restaurant",\n  ...\n}'} />
              {schemaError && <p className="text-[11px] text-red-500 mt-1">{schemaError}</p>}
              <p className="text-[11px] text-stone-400 mt-1">Paste raw JSON-LD. Leave blank to use the page's built-in schema.</p>
            </div>
          )}

          {subTab === "head" && (
            <div>
              <label className={labelCls} style={labelStyle}>Extra Head Tags</label>
              <textarea className={`${inputCls} resize-none font-mono text-[12px]`} style={inputStyle} rows={10} value={form.headTags}
                onChange={(e) => setForm((f) => ({ ...f, headTags: e.target.value }))}
                placeholder={'<meta name="robots" content="noindex" />'} />
              <p className="text-[11px] text-amber-600 mt-1">
                ⚠ Saved here, but not yet applied to the live page — this is groundwork for a follow-up build.
              </p>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-stone-100 flex items-center gap-3 sticky bottom-0 bg-white">
          <button onClick={handleSave} disabled={save.isPending} className="btn-gold !text-[12px] !px-4 !py-2">
            {save.isPending ? "Saving…" : "Save"}
          </button>
          <button onClick={onClose} className="text-[12px] text-stone-500 font-semibold">Cancel</button>
          {existing && (
            <button onClick={() => reset.mutate()} disabled={reset.isPending} className="text-[12px] text-red-500 font-semibold ml-auto">
              Reset to default
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── Redirects tab ───────────────────── */

function RedirectsTab() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ fromPath: "", toPath: "", statusCode: "301" });
  const [error, setError] = useState("");

  const { data: redirects } = useQuery({
    queryKey: ["admin-redirects"],
    queryFn: () => api.get<Redirect[]>("/api/seo/redirects"),
  });

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["admin-redirects"] });
  }

  const create = useMutation({
    mutationFn: () => api.post("/api/seo/redirects", { ...form, statusCode: Number(form.statusCode) }),
    onSuccess: () => { setForm({ fromPath: "", toPath: "", statusCode: "301" }); setError(""); invalidate(); },
    onError: (err) => setError(err instanceof Error ? err.message : "Something went wrong"),
  });

  const toggle = useMutation({
    mutationFn: (r: Redirect) => api.patch(`/api/seo/redirects/${r.id}`, { active: !r.active }),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/api/seo/redirects/${id}`),
    onSuccess: invalidate,
  });

  function normalizePath(v: string) {
    const trimmed = v.trim();
    if (!trimmed) return trimmed;
    return trimmed.startsWith("/") || trimmed.startsWith("http") ? trimmed : `/${trimmed}`;
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const fromPath = normalizePath(form.fromPath);
    const toPath = normalizePath(form.toPath);
    if (!fromPath || !toPath) { setError("Both fields are required."); return; }
    if (fromPath === toPath) { setError("From and To can't be the same path."); return; }
    setForm((f) => ({ ...f, fromPath, toPath }));
    create.mutate();
  }

  return (
    <div>
      <form onSubmit={handleCreate} className="bg-white rounded-xl border border-stone-200 p-4 mb-6">
        <p className="text-sm font-semibold mb-3" style={{ color: "#1a0e00" }}>Add a redirect</p>
        <div className="grid sm:grid-cols-[1fr_1fr_100px_auto] gap-3 items-end">
          <div>
            <label className={labelCls} style={labelStyle}>From path</label>
            <input className={inputCls} style={inputStyle} value={form.fromPath}
              onChange={(e) => setForm((f) => ({ ...f, fromPath: e.target.value }))} placeholder="/old-guide-url" />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>To path</label>
            <input className={inputCls} style={inputStyle} value={form.toPath}
              onChange={(e) => setForm((f) => ({ ...f, toPath: e.target.value }))} placeholder="/guides/new-guide-url" />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Type</label>
            <select className={inputCls} style={inputStyle} value={form.statusCode}
              onChange={(e) => setForm((f) => ({ ...f, statusCode: e.target.value }))}>
              <option value="301">301</option>
              <option value="302">302</option>
            </select>
          </div>
          <button type="submit" disabled={create.isPending} className="btn-gold !text-[12px] !px-4 !py-2">
            {create.isPending ? "Adding…" : "Add"}
          </button>
        </div>
        {error && <p className="text-[12px] text-red-500 mt-2">{error}</p>}
      </form>

      <div className="space-y-2">
        {redirects?.length === 0 && <p className="text-sm text-stone-400 italic">No redirects yet.</p>}
        {redirects?.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border border-stone-200 p-3.5 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[13px] flex-wrap">
                <span className="font-mono text-stone-700">{r.fromPath}</span>
                <span className="text-stone-400">→</span>
                <span className="font-mono text-stone-700">{r.toPath}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(200,140,10,0.12)", color: "#a05a0a" }}>
                  {r.statusCode}
                </span>
              </div>
            </div>
            <button
              onClick={() => toggle.mutate(r)}
              disabled={toggle.isPending}
              className="text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full shrink-0"
              style={r.active ? { background: "rgba(74,140,58,0.12)", color: "#4a8c3a" } : { background: "rgba(120,120,120,0.1)", color: "#707070" }}
            >
              {r.active ? "Active" : "Inactive"}
            </button>
            <button
              onClick={() => { if (confirm("Delete this redirect?")) remove.mutate(r.id); }}
              disabled={remove.isPending}
              className="text-[11px] text-red-500 font-semibold shrink-0"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── Robots.txt tab ───────────────────── */

function RobotsTab() {
  const queryClient = useQueryClient();
  const { data: config, isLoading } = useQuery({
    queryKey: ["admin-seo-config"],
    queryFn: () => api.get<SiteSeoConfig>("/api/seo/config"),
  });
  const [value, setValue] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (config && !loaded) {
      setValue(config.robotsTxt ?? "");
      setLoaded(true);
    }
  }, [config, loaded]);

  const save = useMutation({
    mutationFn: () => api.put("/api/seo/config", { robotsTxt: value, headerCode: config?.headerCode, footerCode: config?.footerCode }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-seo-config"] }),
  });

  if (isLoading) return <p className="text-sm text-stone-500">Loading…</p>;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <p className="text-sm font-semibold mb-1" style={{ color: "#1a0e00" }}>robots.txt content</p>
      <p className="text-[12px] text-stone-500 mb-3">Live at <a href="/robots.txt" target="_blank" rel="noreferrer" className="underline text-amber-700">/robots.txt</a></p>
      <textarea
        className="w-full rounded-lg px-3 py-2 text-sm bg-white outline-none border font-mono resize-y"
        style={{ ...inputStyle, minHeight: 220 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => save.mutate()} disabled={save.isPending} className="btn-gold !text-[12px] !px-4 !py-2 mt-3">
        {save.isPending ? "Saving…" : "Save"}
      </button>
    </div>
  );
}

/* ───────────────────── Sitemap tab ───────────────────── */

function SitemapTab() {
  const { data: urls, isLoading, isError, dataUpdatedAt, refetch, isFetching } = useQuery({
    queryKey: ["admin-sitemap"],
    queryFn: async () => {
      const res = await fetch("/sitemap.xml");
      const xml = await res.text();
      const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
      return matches;
    },
  });

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-semibold" style={{ color: "#1a0e00" }}>Sitemap.xml</p>
        <button onClick={() => refetch()} disabled={isFetching} className="text-[11px] font-semibold text-amber-700">
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      <p className="text-[12px] text-stone-500 mb-3">
        Auto-generated — live at <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="underline text-amber-700">/sitemap.xml</a>.
        Every static page, guide, and What's On offer is included automatically; pages with an active redirect are excluded.
      </p>

      {isLoading && <p className="text-sm text-stone-500">Loading…</p>}
      {isError && <p className="text-sm text-red-500">Couldn't load the sitemap.</p>}

      {urls && (
        <>
          <p className="text-[12px] text-stone-400 mb-3">
            {urls.length} URLs · last checked {new Date(dataUpdatedAt).toLocaleTimeString("en-AU")}
          </p>
          <div className="max-h-[420px] overflow-y-auto rounded-lg border border-stone-100">
            {urls.map((url, i) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                className={`block px-3 py-2 text-[13px] text-stone-700 hover:text-amber-700 hover:bg-amber-50 transition truncate ${i % 2 === 0 ? "bg-stone-50/60" : ""}`}
              >
                {url.replace(/^https?:\/\/[^/]+/, "")}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ───────────────────── Header/Footer Code tab ───────────────────── */

function CodeTab() {
  const queryClient = useQueryClient();
  const { data: config, isLoading } = useQuery({
    queryKey: ["admin-seo-config"],
    queryFn: () => api.get<SiteSeoConfig>("/api/seo/config"),
  });
  const [header, setHeader] = useState("");
  const [footer, setFooter] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (config && !loaded) {
      setHeader(config.headerCode ?? "");
      setFooter(config.footerCode ?? "");
      setLoaded(true);
    }
  }, [config, loaded]);

  const save = useMutation({
    mutationFn: () => api.put("/api/seo/config", { robotsTxt: config?.robotsTxt, headerCode: header, footerCode: footer }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-seo-config"] }),
  });

  if (isLoading) return <p className="text-sm text-stone-500">Loading…</p>;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-stone-200 p-5">
        <p className="text-sm font-semibold mb-1" style={{ color: "#1a0e00" }}>Header Code</p>
        <p className="text-[12px] text-stone-500 mb-3">Injected into every page's <code>&lt;head&gt;</code> — e.g. Google Tag Manager, verification tags.</p>
        <textarea
          className="w-full rounded-lg px-3 py-2 text-sm bg-white outline-none border font-mono resize-y"
          style={{ ...inputStyle, minHeight: 140 }}
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          placeholder="<!-- Google Tag Manager -->"
        />
      </div>
      <div className="bg-white rounded-xl border border-stone-200 p-5">
        <p className="text-sm font-semibold mb-1" style={{ color: "#1a0e00" }}>Footer Code</p>
        <p className="text-[12px] text-stone-500 mb-3">Injected right before <code>&lt;/body&gt;</code> on every page.</p>
        <textarea
          className="w-full rounded-lg px-3 py-2 text-sm bg-white outline-none border font-mono resize-y"
          style={{ ...inputStyle, minHeight: 140 }}
          value={footer}
          onChange={(e) => setFooter(e.target.value)}
          placeholder="<!-- GTM (noscript) -->"
        />
      </div>
      <button onClick={() => save.mutate()} disabled={save.isPending} className="btn-gold !text-[12px] !px-4 !py-2">
        {save.isPending ? "Saving…" : "Save"}
      </button>
    </div>
  );
}
