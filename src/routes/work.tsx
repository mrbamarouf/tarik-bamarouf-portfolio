import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import {
  BidiText,
  EnglishLayoutSlot,
  formatLocalizedNumber,
  projectDisplay,
  siteCopy,
  useLanguage,
} from "@/lib/language";
import { portfolioProjects } from "@/lib/portfolio-projects";

export const Route = createFileRoute("/work")({
  head: ({ matches }) => {
    if (matches.at(-1)?.routeId !== "/work") {
      return {};
    }

    return {
      meta: [
        { title: "Work | Tarik Bamarouf" },
        {
          name: "description",
          content:
            "Selected website design, UX/UI, brand identity, and front-end experiences by Tarik Bamarouf.",
        },
        { property: "og:title", content: "Work | Tarik Bamarouf" },
        {
          property: "og:description",
          content:
            "An editorial archive of premium websites, digital brand presence, UX/UI, and creative front-end work.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://tarikbamarouf.com/work" },
        {
          property: "og:image",
          content: new URL(portfolioProjects[0].img, "https://tarikbamarouf.com").href,
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "https://tarikbamarouf.com/work" }],
    };
  },
  component: WorkPage,
});

const projects = portfolioProjects;

function WorkPage() {
  const { language } = useLanguage();
  const t = siteCopy[language];
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname.startsWith("/work/") && pathname !== "/work") {
    return <Outlet />;
  }

  return (
    <SiteLayout>
      {/* Masthead */}
      <section className="work-archive__masthead border-b border-border/20 pt-36 pb-18 md:pt-48 md:pb-24">
        <div className="w-full px-6 md:px-12">
          <div className="flex items-end justify-between gap-8">
            <div className="max-w-[620px]">
              <p className="mb-6 text-[10px] uppercase tracking-luxury text-bronze">
                {t.work.archive}
              </p>
              <h1 className="font-serif text-4xl font-light leading-[1.02] md:text-5xl lg:text-[4.8rem]">
                <BidiText>{t.work.title}</BidiText>
              </h1>
            </div>
            <p className="hidden md:block text-[10px] tracking-luxury uppercase text-foreground/40">
              {t.work.volume}
            </p>
          </div>
        </div>
      </section>

      {/* Editorial archive list */}
      <section className="work-archive relative overflow-hidden py-12 md:py-20">
        <div className="w-full px-6 md:px-12">
          <ul className="work-archive__list">
            {projects.map((p, i) => {
              const display = projectDisplay(p.slug, language);
              const masterDisplay = projectDisplay(p.slug, "en");
              const isReversed = i % 2 === 1;
              const title = display.name ?? p.t;
              return (
                <li key={p.slug} className="work-archive__item">
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className={`work-archive__row group ${isReversed ? "work-archive__row--reverse" : ""}`}
                  >
                    <div className="work-archive__media">
                      <img
                        src={p.img}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="work-archive__image"
                      />
                    </div>
                    <div className="work-archive__content">
                      <div className="work-archive__number">
                        <span>
                          {formatLocalizedNumber(i + 1, language, {
                            minimumIntegerDigits: 2,
                          })}
                        </span>
                        <span aria-hidden="true" />
                      </div>
                      <p className="work-archive__category">
                        <EnglishLayoutSlot master={masterDisplay.category ?? p.cat}>
                          {display.category ?? p.cat}
                        </EnglishLayoutSlot>
                      </p>
                      <h2 className="work-archive__title">
                        <BidiText>{title}</BidiText>
                      </h2>
                      <p className="work-archive__disciplines">
                        <span>
                          <EnglishLayoutSlot master={masterDisplay.disciplines ?? p.disciplines}>
                            {display.disciplines ?? p.disciplines}
                          </EnglishLayoutSlot>
                        </span>
                        <span>{formatLocalizedNumber(p.year, language)}</span>
                      </p>
                      {display.intro && (
                        <p className="work-archive__intro">
                          <EnglishLayoutSlot master={masterDisplay.intro ?? display.intro}>
                            {display.intro}
                          </EnglishLayoutSlot>
                        </p>
                      )}
                      <span className="work-archive__cta">
                        {t.common.viewProject}
                        <ArrowRight className="lang-arrow h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-24 md:mt-32 flex items-center justify-between text-[10px] tracking-luxury uppercase text-foreground/40 pt-8 border-t border-border/20">
            <span>
              <BidiText>{t.work.end}</BidiText>
            </span>
            <span className="text-bronze/70">
              <BidiText>{t.work.note}</BidiText>
            </span>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
