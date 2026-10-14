---
title: "React Server Components in Practice: The Next.js Way"
description: "React Server Components render on the server and send less JavaScript. How they work in Next.js, common mistakes, and when to use client components."
date: 2026-11-10T11:34:00+05:30
keyword: "react server components"
tags: ["React", "Next.js", "Web Development"]
service: "mern-nextjs-development"
image: "/blog-images/react-server-components-nextjs.jpg"
imageAlt: "Cloud blocks and app wireframes representing React Server Components"
sources:
  - title: "React docs: Server Components"
    url: "https://react.dev/reference/rsc/server-components"
  - title: "Next.js docs: Server and Client Components"
    url: "https://nextjs.org/docs/app/getting-started/server-and-client-components"
---

**React Server Components (RSC) let parts of your React app render only on the server, so they can read data directly and send HTML, but none of their JavaScript, to the browser.** In Next.js's App Router, components are server components by default, and you opt into client components with `"use client"` only where you need interactivity. Used well, that means faster pages and less JavaScript on your users' phones.

## The mental model

- **Server components:** fetch data, read files and databases, render markup. Their code never ships to the browser.
- **Client components:** handle state, effects, event handlers and browser APIs. Their code ships and hydrates.
- **Server components can render client components**, and pass them data as props.

## A simple pattern

```tsx
// app/products/page.tsx: server component (default)
import AddToCart from "./AddToCart";

export default async function Products() {
  const products = await db.product.findMany({ where: { inStock: true } });
  return products.map((p) => (
    <article key={p.id}>
      <h2>{p.name}</h2>
      <AddToCart id={p.id} />
    </article>
  ));
}
```

```tsx
// app/products/AddToCart.tsx
"use client";
export default function AddToCart({ id }: { id: string }) {
  return <button onClick={() => addToCart(id)}>Add to cart</button>;
}
```

The product list costs the browser nothing. Only the small button is interactive JavaScript.

## Common mistakes

- **Putting `"use client"` at the top of big layouts,** which turns everything below into client code.
- **Importing server-only code into client components:** secrets, database clients and Node.js modules. I hit this myself when a footer that read the filesystem got pulled into a client bundle.
- **Fetching on the client** what could be fetched on the server.
- **Over-fetching in many components** instead of loading data once, close to where it's needed.

## Why it matters for SEO and speed

Server-rendered content is in the HTML for search engines and AI crawlers, and less JavaScript improves [Core Web Vitals](/blog/core-web-vitals-seo).

## Next.js built well

At [NextGen Fusion](https://www.nextgenfusion.in), our Next.js development company in Lucknow, we build App Router projects with a clean server/client split: fast for users, readable for search engines.

[Build a fast Next.js site with me](/services/mern-nextjs-development).
