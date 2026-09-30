import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "../../../lib/blog";

// One 1200x630 card per post, generated at build time from the post title.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post by Ritesh Kumar Giri";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Subset copies of Amiamie with the GSUB/GPOS layout tables stripped: the
// renderer behind ImageResponse (Satori) cannot parse the full font's
// contextual-substitution table. Latin-only is enough for a title card.
const font = (file) =>
  fs.readFile(path.join(process.cwd(), "src", "app", "blog", "_og-fonts", file));

export default async function OpengraphImage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Blog";
  const tags = (post?.tags ?? []).slice(0, 3);

  const [regular, black] = await Promise.all([
    font("Amiamie-Regular-og.ttf"),
    font("Amiamie-Black-og.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          background:
            "radial-gradient(circle at 88% 8%, rgba(207,163,85,0.28), rgba(10,10,10,0) 45%), #0a0a0a",
          color: "#e5e5e0",
          fontFamily: "Amiamie",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 20,
            letterSpacing: 7,
            textTransform: "uppercase",
            color: "#cfa355",
          }}
        >
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#cfa355" }} />
          Blog · riteshgiri.dev
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 58 : 68,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: -1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 28 }}>Ritesh Kumar Giri</div>
            <div style={{ fontSize: 20, color: "rgba(229,229,224,0.55)" }}>
              Full-stack developer · Lucknow, India
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  border: "1.5px solid rgba(229,229,224,0.28)",
                  borderRadius: 999,
                  padding: "9px 20px",
                  fontSize: 18,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "rgba(229,229,224,0.8)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Amiamie", data: regular, weight: 400, style: "normal" },
        { name: "Amiamie", data: black, weight: 900, style: "normal" },
      ],
    }
  );
}
