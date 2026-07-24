import { Link, useRouterState } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
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
  const locationHref = useRouterState({ select: (state) => state.location.href });
  const lastScrollY = useRef(0);
  const hasMobileScrollIntent = useRef(false);
  const isMobileViewportRef = useRef(false);
  const atTopRef = useRef(true);
  const heroVisibleRef = useRef(true);
  const showChromeRef = useRef(true);
  const openRef = useRef(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [showChrome, setShowChrome] = useState(true);
  const [open, setOpen] = useState(false);

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

  const updateOpen = (next: boolean) => {
    if (openRef.current === next) return;
    openRef.current = next;
    setOpen(next);
  };

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_MENU_MEDIA_QUERY);
    let scrollFrame = 0;
    let resizeFrame = 0;
    const getScrollY = () =>
      Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);

    const getHeroVisibility = () => {
      const hero = document.querySelector<HTMLElement>(".home-hero");

      if (!hero) return getScrollY() <= 96;

      const rect = hero.getBoundingClientRect();
      return rect.bottom > 96 && rect.top < window.innerHeight;
    };

    const updateForScrollPosition = () => {
      scrollFrame = 0;
      const currentScrollY = getScrollY();
      const nextAtTop = currentScrollY <= 8;
      const delta = currentScrollY - lastScrollY.current;
      const isMobile = mobileQuery.matches;

      updateAtTop(nextAtTop);

      if (isMobile) {
        if (openRef.current || nextAtTop || delta < -1) {
          updateShowChrome(true);
        } else if (currentScrollY > 72 && delta > 8) {
          hasMobileScrollIntent.current = true;
          updateShowChrome(false);
          updateOpen(false);
        }
      } else {
        const nextHeroVisible = getHeroVisibility();
        updateHeroVisible(nextHeroVisible);

        if (!nextHeroVisible) {
          updateShowChrome(false);
          updateOpen(false);
        } else if (nextAtTop) {
          updateShowChrome(true);
        } else if (Math.abs(delta) > 6) {
          const scrollingDown = delta > 0;
          updateShowChrome(!scrollingDown);
          if (scrollingDown) updateOpen(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateForScrollPosition);
    };

    lastScrollY.current = getScrollY();
    isMobileViewportRef.current = mobileQuery.matches;
    atTopRef.current = lastScrollY.current <= 8;
    setIsMobileViewport(mobileQuery.matches);
    if (mobileQuery.matches) {
      setAtTop(atTopRef.current);
      showChromeRef.current = true;
      setShowChrome(true);
    } else {
      updateForScrollPosition();
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    const updateForResize = () => {
      resizeFrame = 0;
      const currentScrollY = getScrollY();
      const isMobile = mobileQuery.matches;

      updateIsMobileViewport(isMobile);
      updateAtTop(currentScrollY <= 8);

      if (isMobile) {
        lastScrollY.current = currentScrollY;
        hasMobileScrollIntent.current = false;
        updateShowChrome(true);
      } else {
        const nextHeroVisible = getHeroVisibility();
        updateHeroVisible(nextHeroVisible);
        if (!nextHeroVisible) {
          updateShowChrome(false);
          updateOpen(false);
        }
      }
    };

    const onResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(updateForResize);
    };

    const resetMobileChrome = () => {
      if (!mobileQuery.matches) return;

      const currentScrollY = getScrollY();
      lastScrollY.current = currentScrollY;
      updateAtTop(currentScrollY <= 8);
      updateShowChrome(true);
      updateOpen(false);
      hasMobileScrollIntent.current = false;
    };

    const markMobileScrollIntent = () => {
      if (mobileQuery.matches) hasMobileScrollIntent.current = true;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pageshow", resetMobileChrome);
    window.addEventListener("touchstart", markMobileScrollIntent, { passive: true });
    window.addEventListener("wheel", markMobileScrollIntent, { passive: true });
    mobileQuery.addEventListener("change", onResize);
    return () => {
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", resetMobileChrome);
      window.removeEventListener("touchstart", markMobileScrollIntent);
      window.removeEventListener("wheel", markMobileScrollIntent);
      mobileQuery.removeEventListener("change", onResize);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia(MOBILE_MENU_MEDIA_QUERY).matches) return;

    unlockMobileMenuScroll({ restorePosition: false });
    const currentScrollY = Math.max(
      0,
      window.scrollY || document.documentElement.scrollTop || 0,
    );
    lastScrollY.current = currentScrollY;
    hasMobileScrollIntent.current = false;
    updateAtTop(currentScrollY <= 8);
    updateShowChrome(true);
    updateOpen(false);
  }, [language, locationHref]);

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
        updateOpen(false);
      }
    };

    mobileQuery.addEventListener("change", handleMediaChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMediaChange);
      unlockMobileMenuScroll();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const firstMenuItem = mobileMenuRef.current?.querySelector<HTMLElement>("a, button");
    const focusFrame = window.requestAnimationFrame(() => firstMenuItem?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      unlockMobileMenuScroll();
      updateOpen(false);
      window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const closeMobileMenu = () => {
    unlockMobileMenuScroll();
    if (window.matchMedia(MOBILE_MENU_MEDIA_QUERY).matches) {
      const currentScrollY = Math.max(
        0,
        window.scrollY || document.documentElement.scrollTop || 0,
      );
      lastScrollY.current = currentScrollY;
      hasMobileScrollIntent.current = false;
      updateAtTop(currentScrollY <= 8);
      updateShowChrome(true);
    }
    updateOpen(false);
  };

  const toggleMobileMenu = () => {
    if (window.matchMedia(MOBILE_MENU_MEDIA_QUERY).matches) {
      lastScrollY.current = Math.max(
        0,
        window.scrollY || document.documentElement.scrollTop || 0,
      );
      hasMobileScrollIntent.current = false;
      updateShowChrome(true);
    }

    const nextOpen = !openRef.current;
    if (!nextOpen) unlockMobileMenuScroll();
    updateOpen(nextOpen);
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
    ? showChrome || atTop || open
    : heroVisible && (showChrome || atTop || open);

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
          aria-expanded={open}
          aria-label={open ? t.nav.close : t.nav.menu}
        >
          {open ? t.nav.close : t.nav.menu}
        </button>
      </div>

      {open && chromeVisible && (
        <div
          ref={mobileMenuRef}
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
