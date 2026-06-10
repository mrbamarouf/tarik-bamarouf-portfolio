import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { formatLocalizedNumber, projectDisplay, siteCopy, useLanguage } from "@/lib/language";
import { portfolioProjects } from "@/lib/portfolio-projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work | Tarik Bamarouf" },
      {
        name: "description",
        content:
          "Selected projects by Tarik Bamarouf across luxury brand websites, e-commerce, and digital experiences.",
      },
      { property: "og:title", content: "Work | Tarik Bamarouf" },
      {
        property: "og:description",
        content:
          "An editorial archive of brand websites, e-commerce stores, and digital experiences.",
      },
    ],
  }),
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
                {t.work.title}
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
              const isReversed = i % 2 === 1;
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
                        alt={p.t}
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
                      <p className="work-archive__category">{display.category ?? p.cat}</p>
                      <h2 className="work-archive__title">{p.t}</h2>
                      <p className="work-archive__disciplines">
                        <span>{display.disciplines ?? p.disciplines}</span>
                        <span>{formatLocalizedNumber(p.year, language)}</span>
                      </p>
                      {display.intro && <p className="work-archive__intro">{display.intro}</p>}
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
            <span>{t.work.end}</span>
            <span className="text-bronze/70">{t.work.note}</span>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
