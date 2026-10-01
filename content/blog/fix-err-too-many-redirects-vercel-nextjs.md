---
title: "Fixing ERR_TOO_MANY_REDIRECTS on Vercel with Next.js"
description: "Two redirects were fighting: one in Vercel's domain settings, one in next.config.js. How to spot the loop with curl and fix it for good."
date: 2026-09-30
keyword: "err_too_many_redirects vercel"
tags: ["Next.js", "Vercel", "Debugging"]
service: "mern-nextjs-development"
draft: false
---

Right after deploying a rebuilt version of this site, every visit to it failed with Chrome's **"This page isn't working — redirected you too many times"** (`ERR_TOO_MANY_REDIRECTS`). The build was green. The code was fine. The problem was that two different layers were each trying to decide which domain was the "real" one, and they disagreed.

If you're seeing this on a Next.js site hosted on Vercel, the short version is: **you probably have a host redirect in `next.config.js` that points the opposite way from the redirect in your Vercel domain settings.** Here's how I confirmed it and fixed it.

## What the redirect loop actually was

I'd added this to `next.config.mjs`, because my canonical tags pointed at the apex domain (`riteshgiri.dev`) and I didn't want `www` serving a duplicate copy of the site:

```js
async redirects() {
  return [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.riteshgiri.dev" }],
      destination: "https://riteshgiri.dev/:path*",
      permanent: true,
    },
  ];
},
```

What I hadn't checked was that the Vercel project already had **`www.riteshgiri.dev` set as the primary domain**, with the apex configured to redirect to it. So:

1. A visitor requests `riteshgiri.dev` → Vercel redirects to `www.riteshgiri.dev`
2. The request hits my app on `www` → `next.config` redirects back to `riteshgiri.dev`
3. Back to step 1, until the browser gives up

Neither redirect was wrong on its own. Together, they never end.

## How to confirm it in 30 seconds

Don't reach for `curl -L` here. With a loop it just follows the redirects until it hits the limit, and you learn nothing. Ask each host for **one hop** instead:

```bash
curl -sI https://riteshgiri.dev/
curl -sI https://www.riteshgiri.dev/
```

This is what came back, trimmed to the lines that matter:

```text
# riteshgiri.dev
HTTP/2 307
location: https://www.riteshgiri.dev/
server: Vercel

# www.riteshgiri.dev
HTTP/2 308
location: https://riteshgiri.dev/
refresh: 0;url=https://riteshgiri.dev/
```

Two things give it away:

- **Each host points at the other.** That's the loop, in two lines.
- **They come from different layers.** The `307` is Vercel's domain-level redirect: it happens before your app runs. The `308` with a `refresh: 0;url=` header is what Next.js emits for a `permanent: true` rule in `redirects()`. So one redirect lives in the Vercel dashboard and the other lives in your code.

## The fix: one host, one place that decides it

Pick which host is canonical, and let exactly one layer enforce it.

Since Vercel was already redirecting apex → `www`, the least disruptive fix was to agree with it:

1. **Delete the host redirect from `next.config.mjs`.** Vercel's domain settings are the right place for apex/`www` redirects anyway: they run at the edge, before your app, on every route including static files.
2. **Point every canonical signal at the host Vercel serves.** On this site that's one constant that the canonical tags, `og:url`, JSON-LD `@id`s, `sitemap.xml` and `robots.txt` all read from:

```js
export const SITE_URL = "https://www.riteshgiri.dev";
```

After the redeploy, the apex answers with a single redirect to `www`, and `www` answers `200`. No loop.

If you'd rather have the apex as your canonical host, the fix is the same shape in reverse: change the primary domain in **Vercel → Project → Settings → Domains**, *then* point your canonical URL at the apex. Just don't do it in code *and* in Vercel.

## Why this matters beyond "the site is down"

A redirect loop is the loud version of the problem. The quiet version is just as common. Your canonical tag says `https://example.com/` but the site actually serves from `https://www.example.com/`. Now every canonical tag points at a URL that redirects somewhere else. Search engines usually work it out, but you're spending crawl budget on redirect hops and splitting signals between two hosts.

While you're in the Vercel domain settings, check the **status code** on the apex → `www` redirect too. Mine came back as `307`, which is a *temporary* redirect. For a permanent host choice, a permanent redirect (`308`) is the clearer signal to search engines that the `www` URL is the one to index.

## Checklist

- [ ] Run `curl -sI` against both hosts. Do they point at each other?
- [ ] Remove any `has: [{ type: "host" ... }]` redirect from `next.config` if Vercel already handles the domain redirect
- [ ] Make the canonical URL in your code match Vercel's **primary** domain
- [ ] Check that canonical tags, `og:url`, sitemap URLs and the `Sitemap:` line in `robots.txt` all use that same host
- [ ] Set the apex ↔ `www` redirect to a permanent status code

If your Next.js site has this or a related deployment problem and you'd rather hand it off, [that's the kind of work I do](/services/mern-nextjs-development).
