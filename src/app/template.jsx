"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

// The root template only remounts when the first URL segment changes, so
// /blog -> /blog/post would not animate. Keying by pathname makes every page
// change an exit + enter. The page itself is still server-rendered; this only
// wraps it. Hash links (/#about) keep the same pathname and do not animate.
export default function Template({ children }) {
  const pathname = usePathname();
  return (
    <ViewTransition
      key={pathname}
      enter="page-enter"
      exit="page-exit"
      default="none"
    >
      <div className="page-transition">{children}</div>
    </ViewTransition>
  );
}
