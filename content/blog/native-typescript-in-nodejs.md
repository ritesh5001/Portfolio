---
title: "Native TypeScript in Node.js: Type Stripping Explained"
description: "Node.js now runs TypeScript directly by stripping types, stable since v25.2.0. What works, what doesn't, and when you still need a build step."
date: 2026-10-29T15:10:00+05:30
keyword: "node.js typescript type stripping"
tags: ["Node.js", "TypeScript", "Backend"]
service: "mern-nextjs-development"
sources:
  - title: "Node.js docs: TypeScript (type stripping)"
    url: "https://nodejs.org/download/rc/v25.0.0-rc.2/docs/api/typescript.html"
  - title: "CodeZine: Node.js v25.2.0 stabilises type stripping"
    url: "https://codezine.jp/news/detail/22568"
---

**Node.js can now run TypeScript files directly with `node app.ts`, by removing ("stripping") the type annotations and running what's left as JavaScript.** The feature became stable in Node.js 25.2.0 (it's at release-candidate level in the 24.12 line) and is stable in Node.js 26, which becomes LTS on October 28, 2026. For scripts, tools and many backends, that means no separate compile step.

## How type stripping works

Node replaces type annotations with whitespace and runs the remaining JavaScript. Two consequences:

- **It's fast**, because there's no real compilation.
- **It doesn't type-check.** Node will happily run code with type errors. You still run `tsc --noEmit` (or your editor) to catch them.

## What works and what doesn't

**Works out of the box:** "erasable" syntax that disappears cleanly: type annotations, interfaces, type aliases, generics and `import type`.

**Needs a flag or a tool:** syntax that generates JavaScript, like `enum`, `namespace` with runtime code, and parameter properties in constructors. These need the separate transform option, or a tool like `tsx`.

**Not handled:** `tsconfig.json` paths and options. Node doesn't read your tsconfig.

```ts
// Runs directly with: node greet.ts
type User = { name: string };
export function greet(user: User): string {
  return `Hello, ${user.name}`;
}
```

## When you still need a build step

- Frontend code: browsers don't run TypeScript, and bundlers do much more than strip types.
- Projects using enums, decorators or path aliases.
- Libraries you publish to npm, which should ship JavaScript and type declarations.

A sensible setup for backends: write "erasable-only" TypeScript (the `erasableSyntaxOnly` compiler option helps enforce it), run it directly with Node, and keep `tsc --noEmit` in CI for type safety.

## Modern TypeScript backends

At [NextGen Fusion](https://www.nextgenfusion.in), our Node.js and TypeScript development company in Lucknow, we use type stripping for scripts and services where it simplifies the toolchain, and keep strict type checking in CI.

[Build a TypeScript backend with me](/services/mern-nextjs-development).
