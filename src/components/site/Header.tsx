import { Link } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import signature from "@/assets/signature.webp";
import { siteCopy, useLanguage } from "@/lib/language";

const MOBILE_MENU_MEDIA_QUERY = "(max-width: 767px)";
const MOBILE_MENU_LOCK_CLASS = "mobile-menu-scroll-lock";
const MOBILE_MENU_INLINE_LOCK_STYLES = [
  "overflow",
  "overflow-x",
  "overflow-y",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "height",
  "width",
  "touch-action",
  "overscroll-behavior",
] as const;

const nav = [
  { to: "/work", key: "work", kind: "route" },
  { to: "/about", key: "about", kind: "route" },
  { to: "/#services", key: "services", kind: "anchor" },
  { to: "/#process", key: "process", kind: "anchor" },
  { to: "/contact", key: "contact", kind: "route" },
] as const;

function unlockMobileMenuScroll({ restorePosition = true } = {}) {
  if (typeof window === "undefined") return;

  const lockWasActive =
    document.documentElement.classList.contains(MOBILE_MENU_LOCK_CLASS) ||
    document.body.classList.contains(MOBILE_MENU_LOCK_CLASS) ||
    Boolean(document.body.dataset.mobileMenuScrollY);
  const isMobileMenuViewport = window.matchMedia(MOBILE_MENU_MEDIA_QUERY).matches;

  if (!lockWasActive && !isMobileMenuViewport) return;

  const scrollY = Number(document.body.dataset.mobileMenuScrollY ?? "0");
  const clearMenuLockStyles = () => {
    MOBILE_MENU_INLINE_LOCK_STYLES.forEach((property) => {
      document.documentElement.style.removeProperty(property);
      document.body.style.removeProperty(property);
    });
  };

  document.documentElement.classList.remove(MOBILE_MENU_LOCK_CLASS);
  document.body.classList.remove(MOBILE_MENU_LOCK_CLASS);
  document.body.style.removeProperty("--mobile-menu-scroll-y");
  clearMenuLockStyles();
  delete document.body.dataset.mobileMenuScrollY;

  if (restorePosition && Number.isFinite(scrollY)) {
    window.scrollTo(0, scrollY);
  }

  window.requestAnimationFrame(clearMenuLockStyles);
  window.setTimeout(clearMenuLockStyles, 80);
}

export function Header() {
  const { language, toggleLanguage } = useLanguage();
  const t = siteCopy[language];
  const lastScrollY = useRef(0);
  const [atTop, setAtTop] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [showChrome, setShowChrome] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const getHeroVisibility = () => {
      const hero = document.querySelector<HTMLElement>(".home-hero");

      if (!hero) return window.scrollY <= 96;

      const rect = hero.getBoundingClientRect();
      return rect.bottom > 96 && rect.top < window.innerHeight;
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const nextAtTop = currentScrollY <= 8;
      const delta = currentScrollY - lastScrollY.current;
      const nextHeroVisible = getHeroVisibility();

      setAtTop(nextAtTop);
      setHeroVisible(nextHeroVisible);

      if (!nextHeroVisible) {
        setShowChrome(false);
        setOpen(false);
      } else if (nextAtTop) {
        setShowChrome(true);
      } else if (Math.abs(delta) > 6) {
        const scrollingDown = delta > 0;
        setShowChrome(!scrollingDown);
        if (scrollingDown) setOpen(false);
      }

      lastScrollY.current = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      const nextHeroVisible = getHeroVisibility();
      setHeroVisible(nextHeroVisible);
      if (!nextHeroVisible) {
        setShowChrome(false);
        setOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_MENU_MEDIA_QUERY);

    if (!open || !mobileQuery.matches) {
      unlockMobileMenuScroll({ restorePosition: false });
      return undefined;
    }

    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.dataset.mobileMenuScrollY = String(scrollY);
    document.body.style.setProperty("--mobile-menu-scroll-y", `-${scrollY}px`);
    document.documentElement.classList.add(MOBILE_MENU_LOCK_CLASS);
    document.body.classList.add(MOBILE_MENU_LOCK_CLASS);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        setOpen(false);
      }
    };

    mobileQuery.addEventListener("change", handleMediaChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMediaChange);
      unlockMobileMenuScroll();
    };
  }, [open]);

  const closeMobileMenu = () => {
    unlockMobileMenuScroll();
    setOpen(false);
  };

  const toggleMobileMenu = () => {
    setOpen((current) => {
      if (current) {
        unlockMobileMenuScroll();
      }

      return !current;
    });
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();

    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShowChrome(true);
    }
  };

  const chromeVisible = heroVisible && (showChrome || atTop || open);

  return (
    <header
      className={`site-header ${open ? "site-header--menu-open" : ""} fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,padding,opacity,transform,filter] duration-700 ease-out ${
        chromeVisible
          ? atTop
            ? "border-transparent bg-transparent py-5 md:py-7"
            : "border-bronze/10 bg-background/76 py-3 backdrop-blur-md"
          : "pointer-events-none -translate-y-4 border-transparent bg-transparent py-4 opacity-0 blur-[2px] backdrop-blur-0"
      }`}
      aria-hidden={!chromeVisible}
    >
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 px-6 md:px-10 lg:px-14">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="site-header__logo group pointer-events-auto flex translate-y-0 items-center transition-transform duration-700 ease-out"
          aria-label={`Tarik Bamarouf ${t.nav.home}`}
        >
          <img
            src={signature}
            alt="Tarik Bamarouf"
            decoding="async"
            className={`h-auto drop-shadow-[0_8px_24px_oklch(0.72_0.09_70/.14)] transition-all duration-700 ease-out group-hover:opacity-100 group-hover:brightness-125 ${
              chromeVisible ? "w-[142px] opacity-100 md:w-[178px]" : "w-[132px] opacity-0 md:w-[162px]"
            }`}
          />
        </Link>

        <nav
          className={`hidden items-center justify-center gap-10 transition-all duration-700 ease-out md:flex ${
            chromeVisible
              ? "pointer-events-auto translate-y-0 opacity-100 blur-0"
              : "pointer-events-none -translate-y-3 opacity-0 blur-[2px]"
          }`}
          aria-hidden={!chromeVisible}
        >
          {nav.map((item) =>
            item.kind === "route" ? (
              <Link
                key={item.to}
                to={item.to}
                className="site-header__nav-link text-[10px] uppercase tracking-editorial text-foreground/78 transition-colors duration-500 hover:text-bronze"
                activeProps={{ className: "text-bronze" }}
                activeOptions={{ exact: true }}
              >
                {t.nav[item.key]}
              </Link>
            ) : (
              <a
                key={item.to}
                href={item.to}
                className="site-header__nav-link text-[10px] uppercase tracking-editorial text-foreground/78 transition-colors duration-500 hover:text-bronze"
              >
                {t.nav[item.key]}
              </a>
            ),
          )}
        </nav>

        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={t.nav.switchLabel}
          className={`hidden justify-self-end text-[10px] uppercase tracking-editorial text-bronze transition-all duration-700 ease-out hover:text-bronze-soft md:block ${
            chromeVisible
              ? "pointer-events-auto translate-y-0 opacity-100 blur-0"
              : "pointer-events-none -translate-y-3 opacity-0 blur-[2px]"
          }`}
        >
          {t.nav.switchTo}
        </button>

        <button
          className={`justify-self-end text-[10px] uppercase tracking-editorial text-bronze transition-all duration-700 ease-out md:hidden ${
            chromeVisible
              ? "pointer-events-auto translate-y-0 opacity-100 blur-0"
              : "pointer-events-none -translate-y-3 opacity-0 blur-[2px]"
          }`}
          onClick={toggleMobileMenu}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? t.nav.close : t.nav.menu}
        >
          {open ? t.nav.close : t.nav.menu}
        </button>
      </div>

      {open && chromeVisible && (
        <div
          id="mobile-navigation"
          className="site-header__mobile-menu mt-5 border-t border-bronze/10 bg-background/95 backdrop-blur-md md:hidden"
        >
          <nav className="flex flex-col gap-6 px-6 py-8">
            {nav.map((item) =>
              item.kind === "route" ? (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className="site-header__nav-link text-sm uppercase tracking-editorial text-foreground/80 hover:text-bronze"
                >
                  {t.nav[item.key]}
                </Link>
              ) : (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={closeMobileMenu}
                  className="site-header__nav-link text-sm uppercase tracking-editorial text-foreground/80 hover:text-bronze"
                >
                  {t.nav[item.key]}
                </a>
              ),
            )}
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                closeMobileMenu();
              }}
              aria-label={t.nav.switchLabel}
              className="w-fit text-sm uppercase tracking-editorial text-bronze hover:text-bronze-soft"
            >
              {t.nav.switchTo}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
