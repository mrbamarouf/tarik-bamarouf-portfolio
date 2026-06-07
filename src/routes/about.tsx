import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout, SectionLabel } from "@/components/site/Layout";
import aboutImg from "@/assets/about.png";
import { siteCopy, useLanguage } from "@/lib/language";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Tarik Bamarouf" },
      {
        name: "description",
        content:
          "A digital experience designer working with brand systems, cinematic art direction, and considered technology.",
      },
      { property: "og:title", content: "About | Tarik Bamarouf" },
      {
        property: "og:description",
        content:
          "A digital experience designer working at the quiet intersection of editorial design, cinematic art direction, and considered technology.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { language } = useLanguage();
  const t = siteCopy[language];

  return (
    <SiteLayout>
      <section className="pt-40 md:pt-56 pb-24">
        <div className="w-full px-6 md:px-12">
          <SectionLabel index="I" title={t.about.label} />
          <h1 className="mt-10 font-serif text-2xl md:text-4xl lg:text-[3rem] leading-[1.12] max-w-3xl font-light">
            <span className="italic font-light">{t.about.titleA}</span>
            <span className="gradient-bronze-text">{t.about.titleB}</span>
            <span className="block text-foreground/70 italic font-light">{t.about.titleC}</span>
          </h1>
        </div>
      </section>

      <section className="pb-32 md:pb-48">
        <div className="grid w-full grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12 lg:gap-20">
          <div className="md:col-span-6">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={aboutImg}
                alt={t.about.portraitAlt}
                className="absolute inset-0 h-full w-full object-cover object-[24%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
            <p className="mt-4 text-[10px] tracking-luxury uppercase text-muted-foreground">
              {t.about.portraitLabel}
            </p>
          </div>

          <div className="md:col-span-6 md:pt-12 space-y-16">
            <div>
              <SectionLabel index="II" title={t.about.biography} />
              <p className="mt-8 font-serif text-xl md:text-2xl italic font-light leading-snug text-foreground/85">
                {t.about.biographyBody}
              </p>
            </div>

            <div>
              <SectionLabel index="III" title={t.about.philosophy} />
              <p className="mt-8 text-foreground/70 leading-relaxed">{t.about.philosophyBody}</p>
            </div>

            <div>
              <SectionLabel index="IV" title={t.about.disciplines} />
              <ul className="mt-8 grid grid-cols-2 gap-y-3 font-serif text-lg">
                {t.about.disciplineItems.map((item) => (
                  <li key={item} className="text-foreground/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionLabel index="V" title={t.about.recognition} />
              <p className="mt-8 text-foreground/70 leading-relaxed italic">
                {t.about.recognitionBody}
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-block text-[11px] tracking-luxury uppercase text-bronze link-underline"
            >
              {t.about.begin}
              <ArrowRight className="lang-arrow ml-2 inline h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
