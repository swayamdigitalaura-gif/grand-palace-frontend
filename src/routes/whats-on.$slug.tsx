import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { WhatsOnSimpleTemplate } from "@/components/WhatsOnSimpleTemplate";
import { api, type SitePage } from "@/lib/admin-api";

export const Route = createFileRoute("/whats-on/$slug")({
  component: WhatsOnPage,
});

function WhatsOnPage() {
  const { slug } = Route.useParams();
  const { data: page, isLoading, isError } = useQuery({
    queryKey: ["whats-on-page", slug],
    queryFn: () => api.get<SitePage>(`/api/pages/${slug}`),
  });

  if (isLoading) return null;
  if (isError || !page) throw notFound();

  const cta = page.ctaHref.startsWith("/")
    ? { label: page.ctaLabel, to: page.ctaHref }
    : { label: page.ctaLabel, href: page.ctaHref, external: page.ctaHref.startsWith("http") };

  const cta2 = page.cta2Label && page.cta2Href
    ? (page.cta2Href.startsWith("/")
        ? { label: page.cta2Label, to: page.cta2Href }
        : { label: page.cta2Label, href: page.cta2Href, external: page.cta2Href.startsWith("http") })
    : undefined;

  return (
    <WhatsOnSimpleTemplate
      crumbLabel={page.title}
      emoji={page.emoji ?? undefined}
      title={page.title}
      subtitle={page.subtitle}
      heroImage={page.heroImage}
      highlightLine={page.highlightLine ?? undefined}
      intro={page.intro ?? undefined}
      sections={page.sections}
      sidebarImage={page.sidebarImage}
      cta={cta}
      cta2={cta2}
    />
  );
}
