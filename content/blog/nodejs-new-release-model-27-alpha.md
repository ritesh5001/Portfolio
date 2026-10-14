---
title: "Node.js Moves to One Release a Year: What Changes"
description: "From 2027, Node.js ships one major release each April and every release becomes LTS. What changes, why, and how to plan Node.js upgrades from now on."
date: 2026-10-22T19:39:00+05:30
keyword: "node.js release schedule"
tags: ["Node.js", "Backend", "Web Development"]
service: "mern-nextjs-development"
image: "/blog-images/nodejs-new-release-model-27-alpha.jpg"
imageAlt: "Rocket and calendar ring representing the new yearly Node.js release schedule"
sources:
  - title: "Node.js blog: Evolving the Node.js release schedule"
    url: "https://nodejs.org/en/blog/announcements/evolving-the-nodejs-release-schedule"
  - title: "HeroDevs: Node.js moving to one release a year"
    url: "https://www.herodevs.com/blog-posts/node-js-moving-to-one-release-a-year"
---

**Node.js is changing its release schedule: starting with Node.js 27 in 2027, there will be one major release a year, shipped in April and promoted to LTS in October, and every major release will become LTS.** The old pattern of two releases a year, where only the even-numbered one became LTS, ends with Node.js 26.

## What's changing

| | Old model | New model (from 2027) |
|---|---|---|
| Major releases | Two a year (April and October) | One a year (April) |
| Which become LTS | Even-numbered only | Every release |
| LTS promotion | October | October |
| Early testing | Odd-numbered "Current" releases | An alpha channel |

Node.js 26, released in April 2026, is the last line under the old model. It becomes LTS on October 28, 2026 and reaches end of life in April 2029. Node.js 27 is expected in April 2027, with LTS in October 2027.

## Why the change

The Node.js project is maintained mostly by volunteers, and backporting security fixes across four or five active release lines had become hard to sustain. Fewer, longer-lived lines mean security releases are easier to produce and test. The support window for each LTS line stays roughly the same length.

## What it means for your projects

- **Simpler upgrade planning.** Every April's release becomes your next LTS target that October, so there are no odd-versus-even rules to remember.
- **A yearly rhythm.** Upgrade production to the new LTS each winter, after its October promotion and once your dependencies support it.
- **Test early in the alpha channel** if you maintain libraries or large apps.

## Our upgrade policy

At [NextGen Fusion](https://www.nextgenfusion.in), our Node.js development company in Lucknow, client backends move to the newest LTS within a few months of its October promotion, with CI testing against it before that. With one release a year, that becomes an easy annual routine.

[Need help maintaining a Node.js app?](/services/mern-nextjs-development)
