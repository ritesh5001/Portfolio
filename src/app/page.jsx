import HomeClient from "../components/HomeClient";
import JsonLd from "../components/JsonLd";
import { buildMetadata, homeJsonLd, homeSeo } from "../lib/seo";

export const metadata = buildMetadata({
  title: homeSeo.title,
  description: homeSeo.description,
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HomeClient />
    </>
  );
}
