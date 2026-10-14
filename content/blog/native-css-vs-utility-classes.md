---
title: "Native CSS in 2026: Do You Still Need Utility Classes?"
description: "Container queries, :has(), nesting and cascade layers are now widely supported. What they replace, and whether utility classes still make sense."
date: 2026-10-25T12:20:00+05:30
keyword: "modern css features"
tags: ["CSS", "Web Development", "Frontend"]
service: "mern-nextjs-development"
sources:
  - title: "MDN: CSS container queries"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries"
  - title: "MDN: :has() selector"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:has"
  - title: "MDN: CSS nesting"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting"
---

**Plain CSS has caught up with most of what we used preprocessors and utility frameworks for: nesting, container queries, the `:has()` "parent" selector and cascade layers all work in current browsers.** That doesn't make utility-first frameworks like Tailwind obsolete. I use Tailwind on this site. But it changes when you need them, and how much custom CSS is reasonable to write by hand.

## The features that changed things

**Nesting.** Write `.card { & h3 { ... } }` without Sass.

**Container queries.** Style a component based on the width of *its container*, not the whole viewport. That's the missing piece for truly reusable components:

```css
.product-grid { container-type: inline-size; }
@container (min-width: 600px) {
  .product-card { display: grid; grid-template-columns: 1fr 2fr; }
}
```

**`:has()`.** Style a parent based on its children, for example highlighting a form group that contains an invalid input, with no JavaScript.

**Cascade layers (`@layer`).** Control which styles win without specificity wars, which is especially useful alongside third-party CSS.

**Custom properties, `clamp()` and modern colour functions** for fluid, themeable designs.

## So, utilities or native CSS?

**Utility classes still win when:**
- A team needs consistency without a design-system lead.
- You're building fast, and co-locating styles with markup speeds you up.
- You want a design-token system enforced by default.

**Native CSS wins when:**
- You're styling complex, reusable components where container queries and `:has()` shine.
- You're writing a WordPress or WooCommerce theme, where a build step is overhead.
- You want fewer dependencies and less markup noise.

**My practice:** utilities for layout and spacing, and native CSS for component logic like container queries and `:has()` states. Both live happily together, especially with cascade layers.

## Fast, maintainable frontends

At [NextGen Fusion](https://www.nextgenfusion.in), our web development company in Lucknow, we write lean CSS for WooCommerce themes and Next.js apps alike, because less CSS and JavaScript means faster pages and better Core Web Vitals.

[Get a faster website](/hire-web-developer-in-lucknow).
