"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { installSiteMotion } from "../lib/site-motion";

const MotionContext = createContext(null);
const STORAGE_KEY = "portfolio-motion";

export function useMotionPreference() {
  return useContext(MotionContext) ?? { ready: false, reduced: true };
}

/** Keep server-rendered content intact; enhance it after hydration. */
export default function SiteMotion({ children }) {
  const pathname = usePathname();
  const [preference, setPreference] = useState("system");
  const [systemReduced, setSystemReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncSystem = () => setSystemReduced(media.matches);
    syncSystem();
    media.addEventListener("change", syncSystem);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "reduced" || stored === "full") setPreference(stored);
    } catch {
      // Private browsing can disable storage; the control still works.
    }
    setReady(true);
    return () => media.removeEventListener("change", syncSystem);
  }, []);

  const reduced =
    preference === "system" ? systemReduced : preference === "reduced";
  const toggle = useCallback(() => {
    const next = reduced ? "full" : "reduced";
    setPreference(next);
    // Keep the pre-paint flag (set by the inline script in layout.jsx) in sync.
    document.documentElement.dataset.motionPref = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Saving the preference is optional.
    }
  }, [reduced]);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    // Never replay what is already on screen: the first paint (or the page
    // transition, on client navigation) is the entrance.
    const cleanup = installSiteMotion({ reduced, animateInitial: false });
    return () => {
      cleanup();
      delete document.documentElement.dataset.motion;
    };
  }, [pathname, ready, reduced]);

  const value = useMemo(
    () => ({ reduced, ready, toggle }),
    [reduced, ready, toggle],
  );
  return (
    <MotionContext.Provider value={value}>
      <div className="scroll-progress" aria-hidden="true">
        <span data-scroll-progress />
      </div>
      {children}
    </MotionContext.Provider>
  );
}

export function MotionToggle() {
  const motion = useContext(MotionContext);
  if (!motion) return null;
  return (
    <button
      type="button"
      className="motion-toggle"
      disabled={!motion.ready}
      aria-pressed={motion.reduced}
      aria-label={
        motion.reduced ? "Enable full animations" : "Reduce animations"
      }
      onClick={motion.toggle}
    >
      <span className="motion-toggle-icon" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      Motion: {motion.reduced ? "reduced" : "full"}
    </button>
  );
}
