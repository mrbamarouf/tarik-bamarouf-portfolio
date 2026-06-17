import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { formatSectionIndex, useLanguage } from "@/lib/language";

const mobileRevealSelector = [
  ".home-hero__image",
  ".selected-work__chapter",
  ".selected-work__row",
  ".selected-work > .w-full > a",
  ".home-services .service-card",
  "#process .mb-10",
  "#process .process-card",
  ".work-archive__masthead p",
  ".work-archive__masthead h1",
  ".work-archive__row",
  ".work-archive__list + div",
  ".about-page__intro .section-label",
  ".about-page__headline",
  ".about-page__media",
  ".about-page__content > div",
  ".about-page__content > a",
  ".project-detail__hero > img",
  ".project-detail__hero a",
  ".project-detail__copy",
  ".project-detail__overview-list > div",
  ".project-info-section__heading",
  ".project-spec-card",
  ".project-detail__gallery .section-label",
  ".project-detail__gallery figure",
  ".project-detail__reflection",
  ".project-detail__next",
  "footer > .w-full > .grid > div",
  "footer > .w-full > .my-10",
  "footer > .w-full > .flex",
].join(", ");

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;
    let fallbackTimer = 0;

    const clearReveals = () => {
      window.clearTimeout(fallbackTimer);
      observer?.disconnect();
      observer = null;
      document.body.classList.remove("mobile-reveals-ready");
      document.querySelectorAll<HTMLElement>("[data-mobile-reveal]").forEach((item) => {
        item.classList.remove("is-mobile-visible");
        item.removeAttribute("data-mobile-reveal");
        item.style.removeProperty("--mobile-reveal-index");
      });
    };

    const revealVisibleItems = (items: HTMLElement[]) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.08 && rect.bottom > -window.innerHeight * 0.08) {
          item.classList.add("is-mobile-visible");
        }
      });
    };

    const setupReveals = () => {
      clearReveals();

      if (
        !mobileQuery.matches ||
        reducedMotionQuery.matches ||
        !("IntersectionObserver" in window)
      ) {
        return;
      }

      const items = Array.from(document.querySelectorAll<HTMLElement>(mobileRevealSelector));
      if (!items.length) return;

      items.forEach((item, index) => {
        item.setAttribute("data-mobile-reveal", "");
        item.style.setProperty("--mobile-reveal-index", String(Math.min(index % 4, 3)));
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-mobile-visible");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px 6% 0px", threshold: 0.01 },
      );

      document.body.classList.add("mobile-reveals-ready");
      items.forEach((item) => observer?.observe(item));
      fallbackTimer = window.setTimeout(() => revealVisibleItems(items), 420);
    };

    setupReveals();
    mobileQuery.addEventListener("change", setupReveals);
    reducedMotionQuery.addEventListener("change", setupReveals);

    return () => {
      mobileQuery.removeEventListener("change", setupReveals);
      reducedMotionQuery.removeEventListener("change", setupReveals);
      clearReveals();
    };
  }, [pathname]);

  return (
    <div className="site-shell min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="site-main flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function SectionLabel({ index, title }: { index: string; title?: string }) {
  const { language } = useLanguage();
  const localizedIndex = formatSectionIndex(index, language);

  return (
    <div className="section-label flex items-center gap-6 text-[10px] tracking-luxury uppercase text-bronze">
      <span>{localizedIndex}</span>
      <span className="h-px w-12 bg-bronze/60" />
      {title && <span className="text-muted-foreground">{title}</span>}
    </div>
  );
}
