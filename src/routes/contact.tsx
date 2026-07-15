import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SiteLayout, SectionLabel } from "@/components/site/Layout";
import { whatsappHref, emailHref, CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/contact";
import { BidiText, EnglishLayoutSlot, siteCopy, useLanguage } from "@/lib/language";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Tarik Bamarouf" },
      {
        name: "description",
        content:
          "Start a direct conversation about your website, UX/UI, brand presence, or creative digital experience.",
      },
      { property: "og:title", content: "Contact | Tarik Bamarouf" },
      {
        property: "og:description",
        content:
          "Start a direct conversation about your website, UX/UI, brand presence, or creative digital experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tarikbamarouf.com/contact" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://tarikbamarouf.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { language } = useLanguage();
  const t = siteCopy[language];

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-contact-reveal]");
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

  return (
    <SiteLayout>
      <section className="contact-page relative overflow-hidden pt-40 pb-36 md:pt-56 md:pb-52">
        <div className="contact-page__ambient" aria-hidden="true" />
        <div className="contact-page__grain" aria-hidden="true" />
        <div className="contact-page__light" aria-hidden="true" />

        <div className="relative z-10 w-full px-6 md:px-12">
          <div className="contact-hero" data-contact-reveal>
            <SectionLabel index="I" title={t.contact.label} />
            <h1 className="mt-10 max-w-4xl font-serif text-5xl font-light leading-[0.98] tracking-normal text-foreground md:text-7xl lg:text-[7rem]">
              <span className="italic font-light">
                <BidiText>{t.contact.titleA}</BidiText>
              </span>
              {t.contact.titleB && (
                <span className="text-bronze-soft">
                  <BidiText>{t.contact.titleB}</BidiText>
                </span>
              )}
            </h1>
            <div className="contact-hero__rule mt-10" />
            <p className="mt-10 max-w-md text-base font-light leading-relaxed text-foreground/68 md:text-lg">
              <EnglishLayoutSlot master={siteCopy.en.contact.body}>
                {t.contact.body}
              </EnglishLayoutSlot>
            </p>
          </div>

          <div className="contact-actions mt-20 grid grid-cols-1 gap-5 md:mt-28 md:grid-cols-12">
            <a
              href={emailHref}
              aria-label={`${t.contact.email}: ${CONTACT_EMAIL}`}
              className="contact-card contact-card--primary group md:col-span-7"
              data-contact-reveal
            >
              <span className="contact-card__glow" aria-hidden="true" />
              <p className="text-[10px] uppercase tracking-luxury text-bronze">
                {t.contact.primary}
              </p>
              <div className="mt-auto">
                <h2 className="contact-card__email font-serif text-4xl font-light leading-[1.02] text-foreground transition-transform duration-700 group-hover:translate-x-2 md:text-6xl">
                  {CONTACT_EMAIL}
                </h2>
                <span className="mt-12 inline-flex items-center gap-3 text-[11px] uppercase tracking-luxury text-bronze-soft">
                  {t.contact.compose}
                  <ArrowRight
                    className="lang-arrow h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-2"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.contact.whatsapp}: ${WHATSAPP_DISPLAY}`}
              className="contact-card contact-card--secondary group md:col-span-5"
              data-contact-reveal
            >
              <span className="contact-card__glow" aria-hidden="true" />
              <p className="text-[10px] uppercase tracking-luxury text-bronze">
                {t.contact.secondary}
              </p>
              <div className="mt-auto">
                <h2 className="contact-card__whatsapp-number font-serif text-3xl font-light leading-[1.05] text-foreground transition-transform duration-700 group-hover:translate-x-2 md:text-5xl">
                  <WhatsAppIcon
                    className="contact-card__whatsapp-icon"
                  />
                  {WHATSAPP_DISPLAY}
                </h2>
                <p className="mt-8 max-w-sm text-sm font-light leading-relaxed text-foreground/58 md:text-base">
                  <BidiText>{t.contact.whatsappBody}</BidiText>
                </p>
                <span className="mt-12 inline-flex items-center gap-3 text-[11px] uppercase tracking-luxury text-bronze">
                  {t.contact.openChat}
                  <ArrowRight
                    className="lang-arrow h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-2"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
