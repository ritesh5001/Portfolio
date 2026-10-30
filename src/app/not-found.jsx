import Link from "next/link";
import PageNav from "../components/PageNav";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: { absolute: "Page not found | Ritesh Giri" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageNav />
      <main
        id="main-content"
        className="content-page min-h-screen bg-white text-ink flex items-center"
      >
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="text-xs tracking-[0.5em] uppercase text-ink/60">404</p>
          <h1 className="mt-4 text-3xl md:text-4xl font-light uppercase">
            That page does not exist
          </h1>
          <p className="mt-4 text-ink/70 font-light">
            The link may be out of date. Everything that is live is linked
            below.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.25em] text-white"
            >
              Home
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-black/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-ink hover:border-black hover:bg-black/5 transition-colors"
            >
              All work
            </Link>
            <Link
              href="/hire-web-developer-in-lucknow"
              className="rounded-full border border-black/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-ink hover:border-black hover:bg-black/5 transition-colors"
            >
              Hire me
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
