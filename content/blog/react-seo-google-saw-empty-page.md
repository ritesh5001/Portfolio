---
title: "React SEO: Why Google Saw an Empty Page on My Site"
description: "My React site served crawlers 0 words and 13 broken sitemap URLs. Why a meta-tag component didn't help, and the Next.js fix."
date: 2026-09-30
keyword: "react seo"
tags: ["React", "Next.js", "SEO"]
service: "mern-nextjs-development"
draft: true
---

My portfolio looked finished. It had a title tag, a meta description, Open Graph tags, a JSON-LD graph, a sitemap and a `robots.txt`. It still didn't show up for my own name.

When I actually looked at what the server sent to a crawler, the reason was obvious: **the page had no content in it.** Here's what was wrong, why the usual React SEO fixes don't address it, and what I changed.

## What a crawler actually received

The site was a Vite + React single-page app. The HTML the server returned was about 6 KB, and its entire body was this:

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

Every heading, every paragraph and every project description was painted into that `div` by JavaScript *after* the page loaded. To anything reading the raw HTML, the page had **zero words of body text.**

Google can run JavaScript, but rendering is a separate step that happens after the initial crawl, and it's the part of the pipeline you have the least control over. A lot of other things that read your pages don't run JavaScript at all: link previews, several AI crawlers, many SEO tools. For them the site was a blank page with good meta tags.

You can check your own site in one command:

```bash
curl -s https://your-site.com | grep -o "<body.*" | head -c 500
```

If what comes back is an empty root `div` and a script tag, you have the same problem.

## Why the React "SEO component" didn't help

I had a `<SEO>` component that set the title, description and canonical tag. It looked like this:

```jsx
useEffect(() => {
  document.title = title;
  setMeta("name", "description", description);
  setCanonical(canonical);
  setStructuredData(jsonLd);
}, [title, description, canonical, jsonLd]);
```

The catch is in the first word: `useEffect` runs **in the browser, after render.** So those tags only exist once JavaScript has run, which is exactly the step that was unreliable. `react-helmet` and similar libraries have the same limit unless you pair them with server rendering.

## Why 13 of my 14 sitemap URLs returned 404

The sitemap listed `/projects/maribiz`, `/projects/tatvivahtrends` and eleven more. Visiting any of them directly returned Vercel's `404: NOT_FOUND`.

The pages *did* exist, but only inside React Router. There was no HTML file at `/projects/maribiz`, and no rewrite telling Vercel to serve `index.html` for unknown paths. Clicking a link inside the app worked. Loading the URL cold, which is how a crawler arrives, did not.

A catch-all rewrite would have turned those 404s into 200s, but every one of them would then serve the same empty `index.html`. That fixes the status code and leaves the content problem untouched.

## The fix: render the HTML at build time

I moved the site to **Next.js with static generation.** Every route is rendered to a real HTML file at build time, so the content is in the response before any JavaScript runs.

The project pages come from the same data the old React Router pages used. `generateStaticParams` tells Next.js which pages to build:

```js
export function generateStaticParams() {
  return clientProjects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false; // unknown slugs get a real 404
```

Metadata moved from `useEffect` to the Metadata API, which writes the tags into the HTML on the server:

```js
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = clientProjects.find((p) => p.slug === slug);
  return buildProjectSeo(project).metadata;
}
```

Structured data is rendered by a server component, so it's in the initial response too:

```jsx
const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
```

And the sitemap is generated from **the same arrays that generate the routes**, so it can't list a page that doesn't exist:

```js
export default function sitemap() {
  return clientProjects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
  }));
}
```

## The results, measured

| | Before | After |
|---|---|---|
| Words of body text in served HTML | 0 | 1,196 |
| Sitemap URLs returning 200 | 1 of 14 | 21 of 21 |
| Indexable pages | 1 | 21 |
| Font files, all 10 faces | 474 KB (OTF) | 363 KB (WOFF2) |

Two performance fixes came along with it. The old build hid the whole page behind a loading screen until a 1.5 MB 3D model finished downloading, which meant the largest element on the page couldn't paint until then. That overlay is gone, and the 3D scene is now code-split and only mounted once it scrolls into view.

What this doesn't tell you yet is how rankings respond. That takes weeks to show up in Search Console, and I'll update this post with the numbers when they do.

## If your React site has the same problem

- **Check what the server sends**, not what the browser shows. `curl` the page, or use "View Page Source" (not DevTools, which shows the rendered DOM).
- **Meta tags set in `useEffect` don't count** for anything that doesn't run JavaScript.
- **Check every sitemap URL for a real 200**, loaded cold, not by clicking through the app.
- **Fix rendering first.** Rewrites, meta components and more keywords can't help a page whose HTML is empty. Next.js static generation, or a prerendering step if you want to stay on Vite, is the fix that actually changes what crawlers receive.

If you have a React app that isn't getting found and want it moved to server-rendered HTML, [I do exactly this kind of migration](/services/mern-nextjs-development).
