import HomeClient from "../components/HomeClient";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import { buildMetadata, homeJsonLd, homeSeo } from "../lib/seo";
import { hasPosts } from "../lib/blog";

export const metadata = buildMetadata({
  title: homeSeo.title,
  description: homeSeo.description,
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HomeClient showBlog={hasPosts()} footer={<SiteFooter />} />
    </>
  );
}
