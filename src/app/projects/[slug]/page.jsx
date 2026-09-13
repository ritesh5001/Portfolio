import { notFound } from "next/navigation";
import { clientProjects } from "../../../constants";
import { buildProjectSeo } from "../../../lib/seo";
import JsonLd from "../../../components/JsonLd";
import ProjectDetail from "../../../components/ProjectDetail";
import SiteFooter from "../../../components/SiteFooter";

// Pre-renders a real HTML file for every case study at build time. This is what
// turns the previously 404-ing /projects/* URLs into indexable pages.
export function generateStaticParams() {
  return clientProjects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = clientProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return buildProjectSeo(project).metadata;
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const project = clientProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = clientProjects.findIndex((p) => p.slug === project.slug);
  const previous = clientProjects[index - 1] ?? null;
  const next = clientProjects[index + 1] ?? null;
  const { jsonLd } = buildProjectSeo(project);

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectDetail project={project} previous={previous} next={next} />
      <SiteFooter />
    </>
  );
}
