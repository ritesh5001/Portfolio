"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useMotionPreference } from "./SiteMotion";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function sameSelection(previous, next) {
  if (Object.is(previous, next)) return true;
  if (
    !previous ||
    !next ||
    typeof previous !== "object" ||
    typeof next !== "object"
  )
    return false;
  const keys = Object.keys(previous);
  return (
    keys.length === Object.keys(next).length &&
    keys.every(
      (key) => Object.hasOwn(next, key) && Object.is(previous[key], next[key]),
    )
  );
}

/** FLIP the existing cards; retain their real DOM, links, and crawler content. */
export default function useAnimatedFilter(initial = "All") {
  const [active, setActive] = useState(initial);
  const gridRef = useRef(null);
  const pending = useRef(null);
  const running = useRef([]);
  const { ready, reduced } = useMotionPreference();

  const select = (next) => {
    if (sameSelection(active, next)) return;
    const grid = gridRef.current;
    if (grid && ready && !reduced) {
      const rects = new Map();
      for (const item of grid.children) {
        if (item.getClientRects().length)
          rects.set(item, item.getBoundingClientRect());
        // Retarget from the visible frame if a first entrance is still running.
        for (const animation of item.getAnimations?.() ?? [])
          animation.cancel();
      }
      pending.current = { rects, height: grid.getBoundingClientRect().height };
      grid.dataset.filterChanging = "true";
    }
    setActive(next);
  };

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const before = pending.current;
    pending.current = null;
    running.current.forEach((animation) => animation.cancel());
    running.current = [];
    if (!grid) return;
    if (!before || reduced || !ready || typeof grid.animate !== "function") {
      delete grid.dataset.filterChanging;
      return;
    }
    grid.dataset.filterChanging = "true";

    const animate = (element, frames, duration, delay = 0) => {
      const animation = element.animate(frames, {
        duration,
        delay,
        easing: EASE,
        fill: "both",
      });
      running.current.push(animation);
      return animation;
    };
    const height = grid.getBoundingClientRect().height;
    const items = [...grid.children].filter(
      (item) => item.getClientRects().length,
    );
    const afterRects = new Map(
      items.map((item) => [item, item.getBoundingClientRect()]),
    );
    const unchanged =
      items.length === before.rects.size &&
      Math.abs(before.height - height) < 1 &&
      items.every((item) => {
        const previous = before.rects.get(item);
        const after = afterRects.get(item);
        return (
          previous &&
          Math.abs(previous.left - after.left) < 1 &&
          Math.abs(previous.top - after.top) < 1
        );
      });
    if (unchanged) {
      delete grid.dataset.filterChanging;
      return;
    }
    items.forEach((item, index) => {
      const after = afterRects.get(item);
      if (after.bottom < -80 || after.top > window.innerHeight + 80) return;
      item.dataset.motionState = "revealed";
      const previous = before.rects.get(item);
      const from = previous
        ? {
            opacity: 1,
            transform:
              "translate(" +
              (previous.left - after.left) +
              "px," +
              (previous.top - after.top) +
              "px)",
          }
        : { opacity: 0, transform: "translateY(12px) scale(.985)" };
      animate(
        item,
        [from, { opacity: 1, transform: "none" }],
        previous ? 320 : 250,
        previous ? 0 : (index % 3) * 30,
      );
    });
    // Large archives can shrink by many screens. Keep their controls and empty
    // state in place instead of animating through thousands of pixels.
    const fromHeight =
      Math.abs(before.height - height) < window.innerHeight
        ? before.height
        : height;
    const resize = animate(
      grid,
      [{ height: fromHeight + "px" }, { height: height + "px" }],
      340,
    );
    resize.onfinish = () => {
      running.current.forEach((animation) => animation.cancel());
      running.current = [];
      delete grid.dataset.filterChanging;
    };
    return () => {
      running.current.forEach((animation) => animation.cancel());
      running.current = [];
      delete grid.dataset.filterChanging;
    };
  }, [active, ready, reduced]);

  return { active, select, gridRef };
}
