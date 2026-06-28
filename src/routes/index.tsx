import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, LayoutTemplate, PenTool, Rocket } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import cinematicHero from "@/assets/cinematic-hero.webp";
import processDesign from "@/assets/process/design.webp";
import processDevelopment from "@/assets/process/development.webp";
import processDiscovery from "@/assets/process/discovery.webp";
import processStrategy from "@/assets/process/strategy.webp";
import aboutImg from "@/assets/about.webp";
import finalCtaWall from "@/assets/final-cta-wall.webp";
import { SiteLayout } from "@/components/site/Layout";
import { CONTACT_EMAIL, emailHref, whatsappHref } from "@/lib/contact";
import {
  EnglishLayoutSlot,
  formatLocalizedNumber,
  projectDisplay,
  siteCopy,
  useLanguage,
} from "@/lib/language";
import { portfolioProjects } from "@/lib/portfolio-projects";
import serviceBrandWebsites from "@/assets/services/brand-websites.webp";
import serviceBusinessWebsites from "@/assets/services/business-websites.webp";
import serviceDesignDevelopment from "@/assets/services/design-development.webp";
import serviceEcommerceStores from "@/assets/services/ecommerce-stores.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tarik Bamarouf | Digital Experiences for Ambitious Brands" },
      {
        name: "description",
        content:
          "Tarik Bamarouf designs and builds premium websites, e-commerce stores, and digital experiences for modern brands.",
      },
      {
        property: "og:title",
        content: "Tarik Bamarouf | Digital Experiences for Ambitious Brands",
      },
      {
        property: "og:description",
        content:
          "Premium websites, e-commerce stores, and digital experiences crafted for modern brands.",
      },
    ],
  }),
  component: Index,
});

const projects = portfolioProjects;
const selectedWorkProjects = portfolioProjects;

const steps = [
  {
    n: "01",
    icon: Compass,
    image: processDiscovery,
  },
  {
    n: "02",
    icon: LayoutTemplate,
    image: processStrategy,
  },
  {
    n: "03",
    icon: PenTool,
    image: processDesign,
  },
  {
    n: "04",
    icon: Rocket,
    image: processDevelopment,
  },
] as const;

const serviceVisuals = [
  { image: serviceBrandWebsites, position: "52% 44%" },
  { image: serviceBusinessWebsites, position: "50% 48%" },
  { image: serviceEcommerceStores, position: "50% 44%" },
  { image: serviceDesignDevelopment, position: "center" },
] as const;

function hasFineHoverPointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

function isApproachMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
}

function renderApproachHeadline(headline: typeof siteCopy.en.home.approachHeadline) {
  return (
    <>
      <span className="approach-section__headline-line">{headline.line1}</span>
      <span className="approach-section__headline-line">
        {headline.line2Before && `${headline.line2Before} `}
        <span className="approach-section__headline-emphasis">{headline.emphasis}</span>
        {headline.line2After && ` ${headline.line2After}`}
      </span>
      {headline.line3 && (
        <span className="approach-section__headline-line">{headline.line3}</span>
      )}
    </>
  );
}

function Index() {
  const { language } = useLanguage();
  const t = siteCopy[language];
  const localizedServices = t.services;
  const localizedSteps = t.steps;
  const selectedWorkCount = selectedWorkProjects.length;
  const selectedWorkCountLabel = formatLocalizedNumber(selectedWorkCount, language, {
    minimumIntegerDigits: 2,
  });
  const serviceCarouselRef = useRef<HTMLDivElement | null>(null);
  const approachRef = useRef<HTMLElement | null>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeProcessIndex, setActiveProcessIndex] = useState<number | null>(null);
  const [activeApproachIndex, setActiveApproachIndex] = useState<number | null>(null);
  const [isApproachMobile, setIsApproachMobile] = useState(false);
  const [approachProgress, setApproachProgress] = useState(0);
  const approachStages = t.home.approachStages;
  const approachTimelineProgress =
    isApproachMobile
      ? 0
      : activeApproachIndex === null
        ? approachProgress
        : (activeApproachIndex + 1) / approachStages.length;
  const approachStyle = {
    "--approach-progress": approachTimelineProgress,
  } as CSSProperties & Record<"--approach-progress", number>;

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const syncApproachMode = () => {
      const isMobile = mobileQuery.matches;
      setIsApproachMobile(isMobile);
      if (isMobile) {
        setActiveApproachIndex(null);
      }
    };

    syncApproachMode();
    mobileQuery.addEventListener("change", syncApproachMode);

    return () => mobileQuery.removeEventListener("change", syncApproachMode);
  }, []);

  useEffect(() => {
    const carousel = serviceCarouselRef.current;
    if (!carousel) return undefined;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let frame = 0;

    const updateActiveService = () => {
      if (!mobileQuery.matches) {
        setActiveServiceIndex(0);
        return;
      }

      const cards = Array.from(carousel.querySelectorAll<HTMLElement>(".service-card"));
      if (!cards.length) return;

      const carouselRect = carousel.getBoundingClientRect();
      const carouselCenter = carouselRect.left + carouselRect.width / 2;

      const closestIndex = cards.reduce(
        (closest, card, index) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenter - carouselCenter);
          return distance < closest.distance ? { index, distance } : closest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      ).index;

      setActiveServiceIndex((current) => (current === closestIndex ? current : closestIndex));
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveService();
      });
    };

    const handleMediaChange = () => scheduleUpdate();

    carousel.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    mobileQuery.addEventListener("change", handleMediaChange);
    scheduleUpdate();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      carousel.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mobileQuery.removeEventListener("change", handleMediaChange);
    };
  }, [localizedServices.length]);

  useEffect(() => {
    const section = approachRef.current;
    if (!section) return undefined;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let frame = 0;
    let listening = false;

    const updateApproachProgress = () => {
      const sectionRect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.72;
      const end = -sectionRect.height + viewportHeight * 0.34;
      const rawProgress = (start - sectionRect.top) / Math.max(start - end, 1);
      const nextProgress = Math.min(1, Math.max(0, rawProgress));

      setApproachProgress((current) =>
        Math.abs(current - nextProgress) < 0.006 ? current : nextProgress,
      );
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateApproachProgress();
      });
    };

    const addListeners = () => {
      if (listening) return;
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
      listening = true;
    };

    const removeListeners = () => {
      if (!listening) return;
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      listening = false;
    };

    const syncTimeline = () => {
      if (mobileQuery.matches) {
        if (frame) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }
        removeListeners();
        setApproachProgress(0);
        return;
      }

      addListeners();
      scheduleUpdate();
    };

    syncTimeline();
    mobileQuery.addEventListener("change", syncTimeline);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      removeListeners();
      mobileQuery.removeEventListener("change", syncTimeline);
    };
  }, []);

  const handleApproachStageClick = (index: number) => {
    if (isApproachMobileViewport()) {
      return;
    }

    if (hasFineHoverPointer()) {
      setActiveApproachIndex(index);
      return;
    }

    setActiveApproachIndex((current) => (current === index ? null : index));
  };

  return (
    <SiteLayout>
      <section className="home-hero relative min-h-[100svh] overflow-hidden bg-ink">
        <img
          src={cinematicHero}
          alt="Tarik Bamarouf cinematic hero"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="home-hero__image absolute inset-0 h-full w-full object-contain object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.035_0.006_65/.78)_0%,oklch(0.035_0.006_65/.50)_28%,oklch(0.035_0.006_65/.08)_58%,oklch(0.035_0.006_65/.34)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,oklch(0.035_0.006_65/.04)_36%,oklch(0.035_0.006_65/.52)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-6 top-24 bottom-10 border border-bronze/10 md:inset-x-10 lg:inset-x-14" />

        <div className="home-hero__content relative z-10 flex min-h-[100svh] w-full flex-col px-6 pb-10 pt-32 md:px-10 lg:px-14 lg:pt-36">
          <div className="home-hero__copy mt-auto max-w-[480px] pb-14 md:pb-18">
            <p className="reveal text-[10px] uppercase tracking-luxury text-bronze">
              {t.home.heroLabel}
            </p>
            <h1 className="reveal reveal-delay-1 mt-5 font-serif text-[clamp(3rem,14vw,4.6rem)] font-light leading-[0.96] text-foreground md:text-7xl lg:text-8xl">
              <EnglishLayoutSlot
                master={
                  <>
                    {siteCopy.en.home.heroLine1}
                    <br />
                    {siteCopy.en.home.heroLine2}
                    <br />
                    {siteCopy.en.home.heroLine3}{" "}
                    <span className="italic text-bronze-soft">
                      {siteCopy.en.home.heroEmphasis}
                    </span>
                    <br />
                    {siteCopy.en.home.heroLine4}
                  </>
                }
              >
                {t.home.heroLine1}
                <br />
                {t.home.heroLine2}
                <br />
                {t.home.heroLine3}{" "}
                <span className="italic text-bronze-soft">{t.home.heroEmphasis}</span>
                {t.home.heroLine4 && (
                  <>
                    <br />
                    {t.home.heroLine4}
                  </>
                )}
              </EnglishLayoutSlot>
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-sm text-sm font-light leading-7 text-foreground/76 md:text-base">
              {t.home.heroBody}
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/work"
                className="inline-flex items-center gap-3 bg-bronze px-7 py-4 text-[11px] uppercase tracking-editorial text-ink shadow-[0_18px_60px_oklch(0.72_0.09_70/.20)] transition-colors duration-500 hover:bg-bronze-soft"
              >
                {t.home.viewWork}
                <ArrowRight className="lang-arrow h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-3 py-4 text-[11px] uppercase tracking-editorial text-foreground/88 transition-colors duration-500 hover:text-bronze"
              >
                {t.home.startProject}
                <ArrowRight
                  className="lang-arrow h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="home-hero__meta grid grid-cols-2 border-t border-bronze/20 pt-5 text-[10px] uppercase tracking-luxury text-foreground/50 md:grid-cols-3">
            <span>Tarik Bamarouf</span>
            <span className="hidden text-center md:block">{t.home.portfolioLabel}</span>
            <span className="text-right text-bronze">{t.common.scroll}</span>
          </div>
        </div>
      </section>

      <section
        ref={approachRef}
        className="approach-section relative overflow-hidden border-t border-border/25 bg-ink"
        style={approachStyle}
      >
        <div className="approach-section__atmosphere" aria-hidden="true" />
        <div className="approach-section__inner relative z-10">
          <div className="approach-section__lead">
            <h2 className="approach-section__headline font-serif font-light text-foreground">
              <EnglishLayoutSlot
                master={renderApproachHeadline(siteCopy.en.home.approachHeadline)}
              >
                {renderApproachHeadline(t.home.approachHeadline)}
              </EnglishLayoutSlot>
            </h2>
            <p className="approach-section__body font-light text-foreground/76">
              <EnglishLayoutSlot master={siteCopy.en.home.approachBody}>
                {t.home.approachBody}
              </EnglishLayoutSlot>
            </p>
          </div>

          <div className="approach-section__experience">
            <div className="approach-section__timeline" aria-hidden="true">
              <span className="approach-section__timeline-track" />
              <span className="approach-section__timeline-fill" />
            </div>

            <div
              className="approach-section__stages"
              onMouseLeave={isApproachMobile ? undefined : () => setActiveApproachIndex(null)}
              onBlur={
                isApproachMobile
                  ? undefined
                  : (event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setActiveApproachIndex(null);
                      }
                    }
              }
            >
              {approachStages.map((stage, index) => {
                const isActive = activeApproachIndex === index;
                const stageContent = (
                  <>
                    <span className="approach-stage__number font-serif">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="approach-stage__copy">
                      <span className="approach-stage__title">
                        <EnglishLayoutSlot master={siteCopy.en.home.approachStages[index].t}>
                          {stage.t}
                        </EnglishLayoutSlot>
                      </span>
                      <span className="approach-stage__description">
                        <EnglishLayoutSlot master={siteCopy.en.home.approachStages[index].d}>
                          {stage.d}
                        </EnglishLayoutSlot>
                      </span>
                    </span>
                  </>
                );

                if (isApproachMobile) {
                  return (
                    <article
                      key={stage.t}
                      className="approach-stage approach-stage--mobile-story"
                      style={{ transitionDelay: `${index * 55}ms` }}
                    >
                      {stageContent}
                    </article>
                  );
                }

                return (
                  <button
                    key={stage.t}
                    type="button"
                    data-scroll-reveal
                    className={`approach-stage ${isActive ? "is-active" : ""}`}
                    aria-expanded={isActive}
                    style={{ transitionDelay: `${index * 70}ms` }}
                    onMouseEnter={() => {
                      if (hasFineHoverPointer()) {
                        setActiveApproachIndex(index);
                      }
                    }}
                    onFocus={() => {
                      if (hasFineHoverPointer()) {
                        setActiveApproachIndex(index);
                      }
                    }}
                    onClick={() => handleApproachStageClick(index)}
                  >
                    {stageContent}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="selected-work relative overflow-hidden border-y border-border/25 bg-background py-18 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,oklch(0.72_0.09_70/.08),transparent_30%)]" />
        <div className="w-full px-6 md:px-10 lg:px-14">
          <div className="selected-work__chapter" aria-label={`${selectedWorkCountLabel} ${t.home.selectedProjectsLabel}`}>
            <p className="selected-work__chapter-kicker">{t.home.selectedPortfolioLabel}</p>
            <strong className="selected-work__chapter-count">
              {selectedWorkCountLabel}
            </strong>
            <p className="selected-work__chapter-label">{t.home.selectedProjectsLabel}</p>
            <span
              className="selected-work__chapter-divider"
              aria-hidden="true"
            >
              <span />
            </span>
          </div>

          <div className="relative z-10 border border-border/35 bg-ink/35 shadow-[0_40px_120px_oklch(0_0_0/.28)]">
            {selectedWorkProjects.map((p, i) => {
              const display = projectDisplay(p.slug, language);
              const masterDisplay = projectDisplay(p.slug, "en");
              return (
                <Link
                  key={p.slug}
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="selected-work__row group relative block min-h-[220px] overflow-hidden border-b border-border/35 last:border-b-0 md:min-h-[228px]"
                >
                  <img
                    src={p.img}
                    alt={p.t}
                    loading="lazy"
                    decoding="async"
                    className="selected-work__image absolute inset-y-0 right-0 h-full w-full object-cover opacity-78 transition-all duration-[1400ms] ease-out group-hover:scale-[1.03] group-hover:opacity-95 md:w-[68%]"
                  />
                  <div className="selected-work__veil selected-work__veil--primary absolute inset-0 bg-[linear-gradient(90deg,oklch(0.035_0.006_65/.99)_0%,oklch(0.035_0.006_65/.94)_33%,oklch(0.035_0.006_65/.50)_58%,oklch(0.035_0.006_65/.10)_100%)]" />
                  <div className="selected-work__veil selected-work__veil--secondary absolute inset-0 bg-[linear-gradient(0deg,oklch(0.035_0.006_65/.52),transparent_58%,oklch(0.035_0.006_65/.24))]" />
                  <div className="absolute inset-0 opacity-0 ring-1 ring-inset ring-bronze/25 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="selected-work__content relative z-10 grid min-h-[220px] grid-cols-1 gap-6 p-7 md:min-h-[228px] md:grid-cols-[minmax(280px,0.40fr)_1fr_auto] md:items-center md:p-9 lg:p-10">
                    <div>
                      <p className="font-serif text-lg italic text-bronze">
                        {formatLocalizedNumber(i + 1, language, { minimumIntegerDigits: 2 })}
                      </p>
                      <p className="mt-5 max-w-sm text-[10px] uppercase tracking-luxury text-bronze/90">
                        <EnglishLayoutSlot master={masterDisplay.category ?? p.cat}>
                          {display.category ?? p.cat}
                        </EnglishLayoutSlot>
                      </p>
                      <h3 className="mt-3 font-serif text-4xl font-light leading-none text-foreground transition-colors duration-500 group-hover:text-bronze-soft md:text-5xl">
                        {p.t}
                      </h3>
                    </div>

                    <p className="max-w-sm self-end text-sm font-light leading-7 text-foreground/74 md:self-center">
                      <EnglishLayoutSlot master={masterDisplay.disciplines ?? p.disciplines}>
                        {display.disciplines ?? p.disciplines}
                      </EnglishLayoutSlot>
                    </p>

                    <span className="inline-flex w-fit items-center gap-3 self-end border border-bronze/35 bg-ink/25 px-5 py-3 text-[10px] uppercase tracking-editorial text-bronze transition-all duration-500 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink md:self-center">
                      {t.common.viewProject}
                      <ArrowRight
                        className="lang-arrow h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link
            to="/work"
            className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-editorial text-bronze md:hidden"
          >
            {t.common.viewAllProjects}
            <ArrowRight className="lang-arrow h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        id="about"
        className="home-about relative overflow-hidden bg-ink py-24 md:min-h-[640px] md:py-34"
      >
        <div className="absolute inset-0">
            <img
              src={aboutImg}
              alt=""
              loading="lazy"
              decoding="async"
              className="home-about__image cinematic-drift h-full w-full object-cover object-[24%_center] opacity-72 saturate-75 contrast-110"
            />
          <div className="home-about__shade absolute inset-0 bg-[linear-gradient(90deg,oklch(0.035_0.006_65/.90)_0%,oklch(0.035_0.006_65/.68)_40%,oklch(0.035_0.006_65/.22)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_48%,oklch(0.72_0.09_70/.20),transparent_33%),radial-gradient(circle_at_74%_34%,oklch(0.82_0.07_78/.12),transparent_28%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="pointer-events-none absolute left-6 top-24 h-80 w-[42rem] max-w-[88vw] bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.09_70/.18),transparent_68%)] blur-2xl md:left-10 lg:left-14" />
        <div className="home-about__content relative z-10 grid min-h-[430px] w-full grid-cols-12 items-center gap-8 px-6 md:px-10 lg:px-14">
          <div className="home-about__heading col-span-12 lg:col-span-5">
            <p
              className="scroll-reveal text-[10px] uppercase tracking-luxury text-bronze"
              data-scroll-reveal
            >
              {t.home.aboutLabel}
            </p>
            <h2
              className="scroll-reveal mt-6 font-serif text-5xl font-light leading-[0.98] text-foreground drop-shadow-[0_20px_60px_oklch(0_0_0/.55)] md:text-7xl lg:text-8xl"
              data-scroll-reveal
              style={{ transitionDelay: "120ms" }}
            >
              {t.home.aboutTitle.split("\n").map((line, index, lines) => (
                <span key={line}>
                  {line}
                  {index < lines.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
          <div className="home-about__body col-span-12 flex flex-col items-start justify-start lg:col-span-4 lg:col-start-6 lg:justify-center xl:col-start-6">
            <p
              className="scroll-reveal max-w-md text-base font-light leading-8 text-foreground/82"
              data-scroll-reveal
              style={{ transitionDelay: "220ms" }}
            >
              <EnglishLayoutSlot master={siteCopy.en.home.aboutBody}>
                {t.home.aboutBody}
              </EnglishLayoutSlot>
            </p>
            <Link
              to="/about"
              className="scroll-reveal group mt-9 inline-flex w-fit items-center gap-3 text-[11px] uppercase tracking-editorial text-bronze transition-colors duration-500 hover:text-bronze-soft"
              data-scroll-reveal
              style={{ transitionDelay: "320ms" }}
            >
              {t.home.aboutCta}
              <ArrowRight
                className="lang-arrow h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="home-services relative overflow-hidden border-y border-border/25 bg-background py-18 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.09_70/.10),transparent_32%)]" />
        <div className="relative z-10 w-full px-6 md:px-10 lg:px-14">
          <p
            className="scroll-reveal text-[10px] uppercase tracking-luxury text-bronze"
            data-scroll-reveal
          >
            {t.home.servicesLabel}
          </p>
          <div
            ref={serviceCarouselRef}
            className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
          >
            {localizedServices.map((service, i) => {
              const visual = serviceVisuals[i % serviceVisuals.length];

              return (
                <article
                  key={service.t}
                  className="service-card group relative min-h-[390px] overflow-hidden border border-bronze/18 bg-ink/68 p-7 shadow-[0_24px_80px_oklch(0_0_0/.22)] transition-all duration-700 hover:-translate-y-2 hover:border-bronze/42 hover:bg-ink/82 hover:shadow-[0_34px_110px_oklch(0_0_0/.38)] lg:p-8"
                >
                  <img
                    src={visual.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="service-card__image absolute inset-0 h-full w-full object-cover opacity-[0.94] transition-all duration-[1400ms] group-hover:scale-[1.045] group-hover:opacity-100"
                    style={{ objectPosition: visual.position }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.035_0.006_65/.00)_0%,oklch(0.035_0.006_65/.08)_38%,oklch(0.035_0.006_65/.62)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,oklch(0.78_0.10_72/.14),transparent_30%),radial-gradient(circle_at_82%_18%,oklch(0.72_0.09_70/.10),transparent_28%)] opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-x-7 top-7 h-px bg-gradient-to-r from-bronze/70 via-bronze/20 to-transparent" />
                  <div className="service-card__content relative z-10 flex h-full min-h-[310px] flex-col justify-between">
                    <span className="font-serif text-2xl italic text-bronze drop-shadow-[0_8px_24px_oklch(0_0_0/.45)]">
                      {formatLocalizedNumber(i + 1, language, { minimumIntegerDigits: 2 })}
                    </span>
                    <div>
                      <h3 className="font-serif text-3xl font-light leading-tight text-foreground transition-colors duration-500 group-hover:text-bronze-soft">
                        {service.t}
                      </h3>
                      <p className="mt-4 text-sm font-light leading-7 text-foreground/74">
                        {service.d}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="service-carousel-dots md:hidden" aria-hidden="true">
            {localizedServices.map((service, i) => (
              <span
                key={service.t}
                className={
                  i === activeServiceIndex
                    ? "service-carousel-dots__dot is-active"
                    : "service-carousel-dots__dot"
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="relative overflow-hidden bg-ink py-20 md:py-26">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.09_70/.14),transparent_32%),linear-gradient(180deg,oklch(0.035_0.006_65),oklch(0.045_0.006_65))]" />
        <div className="relative z-10 w-full px-6 md:px-10 lg:px-14">
          <div className="mb-10 flex items-center gap-6">
            <p className="text-[10px] uppercase tracking-luxury text-foreground/70">
              {t.home.processLabel}
            </p>
            <span className="h-px w-14 bg-bronze/65" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isOpen = activeProcessIndex === i;
              return (
                <article
                  key={step.n}
                  aria-controls={`process-step-${step.n}`}
                  aria-expanded={isOpen}
                  className={`process-card group relative overflow-hidden border border-bronze/22 bg-[linear-gradient(180deg,oklch(0.075_0.006_65),oklch(0.035_0.004_65))] shadow-[0_30px_90px_oklch(0_0_0/.32)] transition-colors duration-500 hover:border-bronze/45 ${isOpen ? "is-open" : ""}`}
                  onClick={() => {
                    if (!window.matchMedia("(max-width: 767px)").matches) return;
                    setActiveProcessIndex((current) => (current === i ? null : i));
                  }}
                >
                  <div className="process-card__media relative h-56 overflow-hidden border-b border-bronze/16 md:h-64 lg:h-72">
                    <img
                      src={step.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-95 transition-all duration-[1400ms] group-hover:scale-[1.035] group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.035_0.006_65/.08)_0%,oklch(0.035_0.006_65/.04)_45%,oklch(0.035_0.006_65/.54)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,oklch(0.035_0.006_65/.18)_100%)]" />
                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-bronze/45 bg-ink/58 text-bronze shadow-[0_16px_40px_oklch(0_0_0/.35)] backdrop-blur-sm">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <ArrowRight
                        className="absolute bottom-10 right-6 hidden h-5 w-5 text-bronze md:block"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="process-card__body relative min-h-[260px] p-8">
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-bronze/50 via-bronze/15 to-transparent" />
                    <span className="font-serif text-7xl font-light leading-none text-bronze lg:text-8xl">
                      {formatLocalizedNumber(step.n, language)}
                    </span>
                    <span className="mt-4 block h-px w-12 bg-bronze/55" />
                    <div className="mt-5">
                      <h3 className="text-sm font-medium uppercase tracking-editorial text-foreground/95">
                        <EnglishLayoutSlot master={siteCopy.en.steps[i].t}>
                          {localizedSteps[i].t}
                        </EnglishLayoutSlot>
                      </h3>
                      <p
                        id={`process-step-${step.n}`}
                        className="mt-5 max-w-xs text-sm font-light leading-7 text-foreground/72"
                      >
                        <EnglishLayoutSlot master={siteCopy.en.steps[i].d}>
                          {localizedSteps[i].d}
                        </EnglishLayoutSlot>
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final-cta relative overflow-hidden border-t border-bronze/10 bg-ink">
        <div className="final-cta__ambient" aria-hidden="true" />
        <div className="final-cta__grain" aria-hidden="true" />
        <div className="final-cta__beam" aria-hidden="true" />
        <div className="final-cta__scene" aria-hidden="true">
          <div className="final-cta__artwork">
            <img
              src={finalCtaWall}
              alt=""
              className="final-cta__artwork-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="final-cta__inner relative z-10 flex w-full items-center px-6 py-20 md:px-10 lg:px-14 lg:py-0">
          <div className="final-cta__copy scroll-reveal" data-scroll-reveal>
            <p className="text-[10px] uppercase tracking-luxury text-bronze">{t.home.ctaLabel}</p>
            <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2.8rem,6vw,7.6rem)] font-light leading-[0.96]">
              <EnglishLayoutSlot master={siteCopy.en.home.ctaTitle}>
                {t.home.ctaTitle}
              </EnglishLayoutSlot>
            </h2>
            <p className="mt-7 max-w-md text-sm font-light leading-7 text-foreground/70">
              {t.home.ctaBody}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="final-cta__button final-cta__button--primary inline-flex items-center gap-3 bg-bronze px-7 py-4 text-[11px] uppercase tracking-editorial text-ink transition-colors duration-500 hover:bg-bronze-soft"
              >
                {t.home.ctaButton}
                <ArrowRight className="lang-arrow h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={emailHref}
                className="final-cta__button final-cta__button--secondary inline-flex items-center gap-3 border border-bronze/30 px-7 py-4 text-[11px] uppercase tracking-editorial text-bronze transition-colors duration-500 hover:border-bronze hover:text-bronze-soft"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
