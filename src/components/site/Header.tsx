import { Link, useRouterState } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { InstagramIcon, TikTokIcon } from "@/components/icons/SocialIcons";
import bamaroufStudioLogoMark from "@/assets/bamarouf-studio-logo-mark.png";
import signature from "@/assets/signature.webp";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/contact";
import { siteCopy, useLanguage } from "@/lib/language";

const MOBILE_MENU_MEDIA_QUERY = "(max-width: 767px)";
const MOBILE_MENU_LOCK_CLASS = "mobile-menu-scroll-lock";
const BAMAROUF_STUDIO_URL = "https://bamaroufstudio.com";
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
  { to: "/#credentials", key: "credentials", kind: "anchor" },
  { to: "/contact", key: "contact", kind: "route" },
] as const;

function getWindowScrollY() {
  if (typeof window === "undefined") return 0;

  return Math.max(
    0,
    window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0,
  );
}

function unlockMobileMenuScroll({ restorePosition = true } = {}) {
  if (typeof window === "undefined") return 0;

  const lockWasActive =
    document.documentElement.classList.contains(MOBILE_MENU_LOCK_CLASS) ||
    document.body.classList.contains(MOBILE_MENU_LOCK_CLASS) ||
    Boolean(document.body.dataset.mobileMenuScrollY);
  const isMobileMenuViewport = window.matchMedia(MOBILE_MENU_MEDIA_QUERY).matches;

  if (!lockWasActive && !isMobileMenuViewport) return getWindowScrollY();

  const storedScrollY = Number(document.body.dataset.mobileMenuScrollY);
  const scrollY = Number.isFinite(storedScrollY) ? storedScrollY : getWindowScrollY();
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

  return restorePosition && Number.isFinite(scrollY) ? scrollY : getWindowScrollY();
}

export function Header() {
  const { language, toggleLanguage } = useLanguage();
  const t = siteCopy[language];
  const locationHref = useRouterState({ select: (state) => state.location.href });
  const lastScrollY = useRef(0);
  const isMobileViewportRef = useRef(false);
  const atTopRef = useRef(true);
  const heroVisibleRef = useRef(true);
  const showChromeRef = useRef(true);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [showChrome, setShowChrome] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const updateIsMobileViewport = (next: boolean) => {
    if (isMobileViewportRef.current === next) return;
    isMobileViewportRef.current = next;
    setIsMobileViewport(next);
  };

  const updateAtTop = (next: boolean) => {
    if (atTopRef.current === next) return;
    atTopRef.current = next;
    setAtTop(next);
  };

  const updateHeroVisible = (next: boolean) => {
    if (heroVisibleRef.current === next) return;
    heroVisibleRef.current = next;
    setHeroVisible(next);
  };

  const updateShowChrome = (next: boolean) => {
    if (showChromeRef.current === next) return;
    showChromeRef.current = next;
    setShowChrome(next);
  };

  const syncMobileChromeVisible = (scrollY = getWindowScrollY()) => {
    lastScrollY.current = scrollY;
    updateAtTop(scrollY <= 8);
    updateShowChrome(true);
  };

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_MENU_MEDIA_QUERY);
    let scrollFrame = 0;
    let resizeFrame = 0;

    const getHeroVisibility = () => {
      const hero = document.querySelector<HTMLElement>(".home-hero");

      if (!hero) return getWindowScrollY() <= 96;

      const rect = hero.getBoundingClientRect();
      return rect.bottom > 96 && rect.top < window.innerHeight;
    };

    const updateForScrollPosition = () => {
      scrollFrame = 0;
      const currentScrollY = getWindowScrollY();
      const nextAtTop = currentScrollY <= 8;
      const delta = currentScrollY - lastScrollY.current;

      updateAtTop(nextAtTop);

      const nextHeroVisible = getHeroVisibility();
      updateHeroVisible(nextHeroVisible);

      if (!nextHeroVisible) {
        updateShowChrome(false);
      } else if (nextAtTop) {
        updateShowChrome(true);
      } else if (Math.abs(delta) > 6) {
        const scrollingDown = delta > 0;
        updateShowChrome(!scrollingDown);
      }

      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (mobileQuery.matches) return;
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateForScrollPosition);
    };

    lastScrollY.current = getWindowScrollY();
    isMobileViewportRef.current = mobileQuery.matches;
    atTopRef.current = lastScrollY.current <= 8;
    setIsMobileViewport(mobileQuery.matches);
    if (mobileQuery.matches) {
      setAtTop(atTopRef.current);
      showChromeRef.current = true;
      setShowChrome(true);
      heroVisibleRef.current = true;
      setHeroVisible(true);
    } else {
      updateForScrollPosition();
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    const updateForResize = () => {
      resizeFrame = 0;
      const currentScrollY = getWindowScrollY();
      const isMobile = mobileQuery.matches;

      updateIsMobileViewport(isMobile);
      updateAtTop(currentScrollY <= 8);

      if (isMobile) {
        lastScrollY.current = currentScrollY;
        updateHeroVisible(true);
        updateShowChrome(true);
      } else {
        const nextHeroVisible = getHeroVisibility();
        updateHeroVisible(nextHeroVisible);
        if (!nextHeroVisible) {
          updateShowChrome(false);
        }
      }
    };

    const onResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(updateForResize);
    };

    const resetMobileChrome = () => {
      if (!mobileQuery.matches) return;

      unlockMobileMenuScroll({ restorePosition: false });
      syncMobileChromeVisible();
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pageshow", resetMobileChrome);
    window.addEventListener("popstate", resetMobileChrome);
    window.addEventListener("hashchange", resetMobileChrome);
    window.addEventListener("orientationchange", resetMobileChrome);
    mobileQuery.addEventListener("change", onResize);
    return () => {
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", resetMobileChrome);
      window.removeEventListener("popstate", resetMobileChrome);
      window.removeEventListener("hashchange", resetMobileChrome);
      window.removeEventListener("orientationchange", resetMobileChrome);
      mobileQuery.removeEventListener("change", onResize);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia(MOBILE_MENU_MEDIA_QUERY).matches) return;

    unlockMobileMenuScroll({ restorePosition: false });
    syncMobileChromeVisible();
    setIsMobileMenuOpen(false);

    const syncFrame = window.requestAnimationFrame(() => {
      syncMobileChromeVisible();
    });

    return () => window.cancelAnimationFrame(syncFrame);
  }, [language, locationHref]);

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_MENU_MEDIA_QUERY);

    if (!isMobileMenuOpen || !mobileQuery.matches) {
      const restoredScrollY = unlockMobileMenuScroll();
      if (!mobileQuery.matches) return undefined;

      syncMobileChromeVisible(restoredScrollY);
      const syncFrame = window.requestAnimationFrame(() => syncMobileChromeVisible());
      return () => window.cancelAnimationFrame(syncFrame);
    }

    const scrollY = getWindowScrollY();
    document.body.dataset.mobileMenuScrollY = String(scrollY);
    document.body.style.setProperty("--mobile-menu-scroll-y", `-${scrollY}px`);
    document.documentElement.classList.add(MOBILE_MENU_LOCK_CLASS);
    document.body.classList.add(MOBILE_MENU_LOCK_CLASS);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mobileQuery.addEventListener("change", handleMediaChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMediaChange);
      unlockMobileMenuScroll();
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const firstMenuItem = mobileMenuRef.current?.querySelector<HTMLElement>("a, button");
    const focusFrame = window.requestAnimationFrame(() => firstMenuItem?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      const restoredScrollY = unlockMobileMenuScroll();
      syncMobileChromeVisible(restoredScrollY);
      setIsMobileMenuOpen(false);
      window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    unlockMobileMenuScroll();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }

    setIsMobileMenuOpen(true);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();

    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateShowChrome(true);
    }
  };

  const chromeVisible = isMobileViewport
    ? true
    : isMobileMenuOpen
    ? true
    : heroVisible && (showChrome || atTop);

  const mobileMenuPortal =
    isMobileMenuOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={mobileMenuRef}
            id="mobile-navigation"
            className="site-header__mobile-menu md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
          >
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label={t.nav.close}
              className="site-header__mobile-close text-[10px] uppercase tracking-editorial text-bronze transition-colors duration-300 hover:text-bronze-soft"
            >
              {t.nav.close}
            </button>

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
              <a
                href={BAMAROUF_STUDIO_URL}
                onClick={closeMobileMenu}
                aria-label={t.nav.studioLabel}
                className="site-header__mobile-studio"
                dir={language === "ar" ? "rtl" : "ltr"}
              >
                <img
                  src={bamaroufStudioLogoMark}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="site-header__mobile-studio-mark"
                />
                <span className="site-header__studio-name">{t.nav.studio}</span>
              </a>
              <nav className="site-header__mobile-social" aria-label={t.footer.socialLabel}>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.footer.instagramLabel}
                  className="site-header__mobile-social-link"
                >
                  <InstagramIcon className="site-header__mobile-social-icon" />
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.footer.tiktokLabel}
                  className="site-header__mobile-social-link"
                >
                  <TikTokIcon className="site-header__mobile-social-icon" />
                </a>
              </nav>
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  toggleLanguage();
                }}
                aria-label={t.nav.switchLabel}
                className="w-fit text-sm uppercase tracking-editorial text-bronze hover:text-bronze-soft"
              >
                {t.nav.switchTo}
              </button>
            </nav>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className={`site-header fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,padding,opacity,transform,filter] duration-700 ease-out ${
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
                chromeVisible
                  ? "w-[142px] opacity-100 md:w-[178px]"
                  : "w-[132px] opacity-0 md:w-[162px]"
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

          <div
            className={`site-header__actions hidden justify-self-end transition-all duration-700 ease-out md:flex ${
              chromeVisible
                ? "pointer-events-auto translate-y-0 opacity-100 blur-0"
                : "pointer-events-none -translate-y-3 opacity-0 blur-[2px]"
            }`}
          >
            <a
              href={BAMAROUF_STUDIO_URL}
              aria-label={t.nav.studioLabel}
              className="site-header__studio-link"
            >
              <img
                src={bamaroufStudioLogoMark}
                alt=""
                decoding="async"
                className="site-header__studio-mark"
              />
            </a>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t.nav.switchLabel}
              className="text-[10px] uppercase tracking-editorial text-bronze transition-colors duration-500 hover:text-bronze-soft"
            >
              {t.nav.switchTo}
            </button>
          </div>

          <button
            ref={mobileMenuButtonRef}
            className={`justify-self-end text-[10px] uppercase tracking-editorial text-bronze transition-all duration-700 ease-out md:hidden ${
              chromeVisible
                ? "pointer-events-auto translate-y-0 opacity-100 blur-0"
                : "pointer-events-none -translate-y-3 opacity-0 blur-[2px]"
            }`}
            onClick={toggleMobileMenu}
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? t.nav.close : t.nav.menu}
          >
            {isMobileMenuOpen ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </header>

      {mobileMenuPortal}
    </>
  );
}
