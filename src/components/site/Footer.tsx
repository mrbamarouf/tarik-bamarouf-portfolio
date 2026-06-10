import { Link } from "@tanstack/react-router";
import signature from "@/assets/signature.webp";
import { whatsappHref, emailHref, CONTACT_EMAIL } from "@/lib/contact";
import { siteCopy, useLanguage } from "@/lib/language";

export function Footer() {
  const { language } = useLanguage();
  const t = siteCopy[language];

  return (
    <footer className="relative border-t border-bronze/10 bg-ink">
      <div className="w-full px-6 py-16 md:px-10 md:py-20 lg:px-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex" aria-label={`Tarik Bamarouf ${t.nav.home}`}>
              <img
                src={signature}
                alt="Tarik Bamarouf"
                loading="lazy"
                decoding="async"
                className="h-auto w-[250px] drop-shadow-[0_14px_38px_oklch(0.72_0.09_70/.16)] md:w-[330px]"
              />
            </Link>
            <p className="mt-8 max-w-md font-serif text-2xl font-light leading-snug text-foreground/90 md:text-3xl">
              {t.footer.headline}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-bronze px-6 py-3 text-[10px] uppercase tracking-editorial text-ink transition-colors duration-500 hover:bg-bronze-soft"
              >
                {t.footer.whatsapp}
              </a>
              <a
                href={emailHref}
                className="inline-flex items-center gap-3 border border-bronze/20 px-6 py-3 text-[10px] uppercase tracking-editorial text-foreground/90 transition-colors duration-500 hover:border-bronze/60 hover:text-bronze"
              >
                {t.footer.email}
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="mb-6 text-[10px] uppercase tracking-luxury text-bronze">
              {t.footer.navigate}
            </p>
            <ul className="space-y-3 font-serif text-xl font-light">
              <li>
                <Link to="/" className="link-underline">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/work" className="link-underline">
                  {t.nav.work}
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-underline">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="mb-6 text-[10px] uppercase tracking-luxury text-bronze">
              {t.footer.direct}
            </p>
            <ul className="space-y-3 font-serif text-xl font-light">
              <li>
                <a href={emailHref} className="link-underline">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {t.footer.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 mt-16 h-px bg-bronze/20 md:mt-20" />

        <div className="flex flex-col items-start justify-between gap-4 text-[10px] uppercase tracking-editorial text-muted-foreground md:flex-row md:items-center">
          <span>{t.footer.rights}</span>
          <span>{t.footer.location}</span>
        </div>
      </div>
    </footer>
  );
}
