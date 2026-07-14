import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import introVideo from "../assets/intro/final-intro.mp4";
import mobileIntroVideo from "../assets/intro/mobile-intro-9x16.mp4";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BidiText, LanguageProvider, siteCopy, useLanguage } from "@/lib/language";

declare const __APP_BUILD_VERSION__: string;

const MOBILE_INTRO_MEDIA_QUERY = "(max-width: 767px)";
const DESKTOP_INTRO_MEDIA_QUERY = "(min-width: 768px)";
const MOBILE_INTRO_CACHE_VERSION = "intro-mobile-v4";
const DESKTOP_INTRO_CACHE_VERSION = "intro-desktop-v3";
const mobileIntroVideoSrc = `${mobileIntroVideo}?v=${MOBILE_INTRO_CACHE_VERSION}`;
const desktopIntroVideoSrc = `${introVideo}?v=${DESKTOP_INTRO_CACHE_VERSION}`;
const GOOGLE_ANALYTICS_MEASUREMENT_ID = "G-Q94YGB4E3G";
const GOOGLE_ANALYTICS_SCRIPT_SRC = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`;
const googleAnalyticsInitScript = `window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', '${GOOGLE_ANALYTICS_MEASUREMENT_ID}');`;
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tarik Bamarouf",
  url: "https://tarikbamarouf.com",
  email: "tarikbamarouf@gmail.com",
  description:
    "Independent digital studio focused on premium website design, UX/UI, brand identity direction, and front-end craft.",
  founder: {
    "@type": "Person",
    name: "Tarik Bamarouf",
    url: "https://tarikbamarouf.com/about",
  },
  areaServed: "Worldwide",
});
const INTRO_FALLBACK_MS = 12_500;
const INTRO_STALL_FALLBACK_MS = 2_800;
const INTRO_INTERNAL_NAVIGATION_KEY = "tarik-bamarouf-intro-internal-navigation";
const INTRO_INTERNAL_NAVIGATION_SKIP_TTL_MS = 10_000;
const APP_BUILD_VERSION =
  typeof __APP_BUILD_VERSION__ === "string" && __APP_BUILD_VERSION__
    ? __APP_BUILD_VERSION__
    : "dev";
const APP_BUILD_VERSION_ENDPOINT = "/build-version.json";
const APP_SHELL_REFRESH_KEY = "tarik-bamarouf-shell-refresh-version";
const SITE_OWNED_CACHE_PATTERNS = [/tarik/i, /bamarouf/i, /portfolio/i, /tanstack-start/i];
let introHasPlayedThisPageLoad = false;
let pendingInternalIntroSkipHref: string | null = null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const MOBILE_SCROLL_LOCK_INLINE_STYLES = [
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

function isMobileIntroViewport() {
  return window.matchMedia(MOBILE_INTRO_MEDIA_QUERY).matches;
}

function clearMobileIntroScrollStyles() {
  MOBILE_SCROLL_LOCK_INLINE_STYLES.forEach((property) => {
    document.documentElement.style.removeProperty(property);
    document.body.style.removeProperty(property);
  });
}

function unlockIntroScroll() {
  document.documentElement.classList.remove("intro-scroll-lock");
  document.body.classList.remove("intro-scroll-lock");

  if (typeof window === "undefined" || !isMobileIntroViewport()) return;

  clearMobileIntroScrollStyles();
  window.requestAnimationFrame(clearMobileIntroScrollStyles);
  window.setTimeout(clearMobileIntroScrollStyles, 80);
}

function logMobileIntroTopElements() {
  if (typeof window === "undefined" || !import.meta.env.DEV || !isMobileIntroViewport()) return;

  window.setTimeout(() => {
    window.requestAnimationFrame(() => {
      const elements = document
        .elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2)
        .slice(0, 8)
        .map((element) => ({
          tag: element.tagName.toLowerCase(),
          id: element.id,
          className: element.getAttribute("class") ?? "",
        }));

      console.debug("[intro-cleanup] elementsFromPoint(center)", elements);
    });
  }, 0);
}

function consumeInternalNavigationIntroSkip() {
  if (typeof window === "undefined") return false;

  try {
    const storedSkip = window.sessionStorage.getItem(INTRO_INTERNAL_NAVIGATION_KEY);
    window.sessionStorage.removeItem(INTRO_INTERNAL_NAVIGATION_KEY);

    if (!storedSkip) return false;

    const skip = JSON.parse(storedSkip) as { href?: string; storedAt?: number };
    if (skip.href !== window.location.href || typeof skip.storedAt !== "number") {
      return false;
    }

    return Date.now() - skip.storedAt < INTRO_INTERNAL_NAVIGATION_SKIP_TTL_MS;
  } catch {
    return false;
  }
}

function storeInternalNavigationIntroSkip(href: string) {
  try {
    window.sessionStorage.setItem(
      INTRO_INTERNAL_NAVIGATION_KEY,
      JSON.stringify({ href, storedAt: Date.now() }),
    );
  } catch {
    // If storage is unavailable, the intro still falls back to normal page-load behavior.
  }
}

function isReloadNavigation() {
  const [navigation] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  return navigation?.type === "reload";
}

function getInitialIntroState(): "visible" | "fading" | "hidden" {
  if (typeof window === "undefined") return "visible";

  if (isReloadNavigation()) {
    consumeInternalNavigationIntroSkip();
  } else if (introHasPlayedThisPageLoad || consumeInternalNavigationIntroSkip()) {
    introHasPlayedThisPageLoad = true;
    return "hidden";
  }

  introHasPlayedThisPageLoad = true;
  return "visible";
}

function NotFoundComponent() {
  const { language } = useLanguage();
  const labels = siteCopy[language].common;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          <BidiText>{labels.notFoundTitle}</BidiText>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          <BidiText>{labels.notFoundBody}</BidiText>
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {labels.goHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { language } = useLanguage();
  const labels = siteCopy[language].common;

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          <BidiText>{labels.errorTitle}</BidiText>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          <BidiText>{labels.errorBody}</BidiText>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {labels.tryAgain}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {labels.goHome}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tarik Bamarouf | Independent Digital Studio" },
      {
        name: "description",
        content:
          "Premium website design, UX/UI, brand identity direction, and front-end experiences for ambitious brands.",
      },
      { name: "author", content: "Tarik Bamarouf" },
      {
        property: "og:title",
        content: "Tarik Bamarouf | Independent Digital Studio",
      },
      {
        property: "og:description",
        content:
          "Premium website design, UX/UI, brand identity direction, and front-end experiences for ambitious brands.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Tarik Bamarouf" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const internalNavigationIntroCleanup = `try{var n=performance.getEntriesByType("navigation")[0];var r=n&&n.type==="reload";var k=${JSON.stringify(
    INTRO_INTERNAL_NAVIGATION_KEY,
  )};var ttl=${INTRO_INTERNAL_NAVIGATION_SKIP_TTL_MS};var c=function(){var p=["overflow","overflow-x","overflow-y","position","top","right","bottom","left","height","width","touch-action","overscroll-behavior"];document.documentElement.classList.remove("intro-scroll-lock");document.body.classList.remove("intro-scroll-lock");p.forEach(function(s){document.documentElement.style.removeProperty(s);document.body.style.removeProperty(s);});};if(r){window.sessionStorage.removeItem(k)}else{var raw=window.sessionStorage.getItem(k);if(raw){var skip=JSON.parse(raw);var ok=skip&&skip.href===window.location.href&&typeof skip.storedAt==="number"&&Date.now()-skip.storedAt<ttl;window.sessionStorage.removeItem(k);if(ok){document.querySelector(".intro-overlay")?.remove();c();}}}}catch{}`;

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script id="google-analytics-script" async src={GOOGLE_ANALYTICS_SCRIPT_SRC} />
        <script
          id="google-analytics-init"
          dangerouslySetInnerHTML={{ __html: googleAnalyticsInitScript }}
        />
        <script
          id="site-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        <script dangerouslySetInnerHTML={{ __html: internalNavigationIntroCleanup }} />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductionReliabilityGuards />
      <GoogleAnalyticsPageViews />
      <IntroOverlay />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

function isSiteOwnedCache(cacheName: string) {
  return SITE_OWNED_CACHE_PATTERNS.some((pattern) => pattern.test(cacheName));
}

function ProductionReliabilityGuards() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
          Promise.all(registrations.map((registration) => registration.unregister())),
        )
        .catch(() => {
          // A service-worker cleanup failure must never block the page.
        });
    }

    if ("caches" in window) {
      window.caches
        .keys()
        .then((cacheNames) =>
          Promise.all(
            cacheNames.filter(isSiteOwnedCache).map((cacheName) => window.caches.delete(cacheName)),
          ),
        )
        .catch(() => {
          // Cache Storage is optional; ignore unsupported or restricted modes.
        });
    }
  }, []);

  useEffect(() => {
    if (!APP_BUILD_VERSION || APP_BUILD_VERSION === "dev") return undefined;

    const controller = new AbortController();
    let cancelled = false;

    fetch(`${APP_BUILD_VERSION_ENDPOINT}?t=${Date.now()}`, {
      cache: "no-store",
      headers: { accept: "application/json" },
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { version?: unknown; commit?: unknown } | null) => {
        if (cancelled || !payload) return;

        const deployedVersion =
          typeof payload.version === "string"
            ? payload.version
            : typeof payload.commit === "string"
              ? payload.commit
              : "";

        if (!deployedVersion || deployedVersion === APP_BUILD_VERSION) {
          window.sessionStorage.removeItem(APP_SHELL_REFRESH_KEY);
          return;
        }

        const refreshMarker = `${APP_BUILD_VERSION}->${deployedVersion}`;
        if (window.sessionStorage.getItem(APP_SHELL_REFRESH_KEY) === refreshMarker) return;

        window.sessionStorage.setItem(APP_SHELL_REFRESH_KEY, refreshMarker);
        window.location.reload();
      })
      .catch(() => {
        // Version checks are defensive only; a failed request should not affect visitors.
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return null;
}

function GoogleAnalyticsPageViews() {
  const location = useLocation();
  const hasTrackedInitialPageViewRef = useRef(false);

  useEffect(() => {
    if (!hasTrackedInitialPageViewRef.current) {
      hasTrackedInitialPageViewRef.current = true;
      return;
    }

    if (typeof window.gtag !== "function") return;

    const pagePath = `${location.pathname}${location.searchStr ?? ""}`;

    window.gtag("event", "page_view", {
      send_to: GOOGLE_ANALYTICS_MEASUREMENT_ID,
      page_title: document.title,
      page_location: `${window.location.origin}${location.href}`,
      page_path: pagePath,
    });
  }, [location.href, location.pathname, location.searchStr]);

  return null;
}

function IntroOverlay() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const removeTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const stallTimerRef = useRef<number | null>(null);
  const dismissedRef = useRef(false);
  const { language } = useLanguage();
  const [state, setState] = useState<"visible" | "fading" | "hidden">(getInitialIntroState);

  useEffect(() => {
    const markInternalNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");

      if (!link || link.target || link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      pendingInternalIntroSkipHref = url.href;
      window.setTimeout(() => {
        if (pendingInternalIntroSkipHref === url.href) {
          pendingInternalIntroSkipHref = null;
        }
      }, 1500);
    };

    const persistInternalNavigation = () => {
      if (pendingInternalIntroSkipHref && window.location.href !== pendingInternalIntroSkipHref) {
        storeInternalNavigationIntroSkip(pendingInternalIntroSkipHref);
      }
    };

    document.addEventListener("click", markInternalNavigation, { capture: true });
    window.addEventListener("pagehide", persistInternalNavigation);

    return () => {
      document.removeEventListener("click", markInternalNavigation, { capture: true });
      window.removeEventListener("pagehide", persistInternalNavigation);
    };
  }, []);

  const clearIntroTimers = () => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

    if (stallTimerRef.current !== null) {
      window.clearTimeout(stallTimerRef.current);
      stallTimerRef.current = null;
    }

    if (removeTimerRef.current !== null) {
      window.clearTimeout(removeTimerRef.current);
      removeTimerRef.current = null;
    }
  };

  const dismiss = () => {
    if (dismissedRef.current) return;

    dismissedRef.current = true;
    clearIntroTimers();
    unlockIntroScroll();

    if (isMobileIntroViewport()) {
      setState("hidden");
      logMobileIntroTopElements();
      return;
    }

    setState((current) => {
      if (current !== "visible") return current;

      removeTimerRef.current = window.setTimeout(() => {
        setState("hidden");
        logMobileIntroTopElements();
      }, 760);

      return "fading";
    });
  };

  useEffect(() => {
    if (state !== "visible") {
      unlockIntroScroll();
      return undefined;
    }

    window.scrollTo(0, 0);
    document.documentElement.classList.add("intro-scroll-lock");
    document.body.classList.add("intro-scroll-lock");

    return () => {
      unlockIntroScroll();
    };
  }, [state]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const isMobileIntro = isMobileIntroViewport();
    const introSrc = isMobileIntro ? mobileIntroVideoSrc : desktopIntroVideoSrc;

    if (isMobileIntro) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
    }

    const setIntroStartTime = () => {
      try {
        video.currentTime = 1;
      } catch {
        // Some mobile browsers allow seeking only after metadata is ready.
      }
    };

    const failIntro = () => {
      dismiss();
    };

    const clearStallFallback = () => {
      if (stallTimerRef.current === null) return;
      window.clearTimeout(stallTimerRef.current);
      stallTimerRef.current = null;
    };

    const scheduleStallFallback = () => {
      if (dismissedRef.current || stallTimerRef.current !== null) return;

      stallTimerRef.current = window.setTimeout(() => {
        dismiss();
      }, INTRO_STALL_FALLBACK_MS);
    };

    const failureEvents = ["abort", "error"] as const;
    const stallEvents = ["stalled", "waiting"] as const;
    const recoveryEvents = [
      "canplay",
      "canplaythrough",
      "loadeddata",
      "playing",
      "timeupdate",
    ] as const;

    failureEvents.forEach((eventName) => video.addEventListener(eventName, failIntro));
    stallEvents.forEach((eventName) => video.addEventListener(eventName, scheduleStallFallback));
    recoveryEvents.forEach((eventName) => video.addEventListener(eventName, clearStallFallback));

    video.src = introSrc;
    video.dataset.introMode = isMobileIntro ? "mobile" : "desktop";

    video.load();
    setIntroStartTime();
    video.addEventListener("loadedmetadata", setIntroStartTime, { once: true });

    fallbackTimerRef.current = window.setTimeout(dismiss, INTRO_FALLBACK_MS);

    const playPromise = video.play();
    playPromise?.catch(() => {
      dismiss();
    });

    return () => {
      clearIntroTimers();
      video.removeEventListener("loadedmetadata", setIntroStartTime);
      failureEvents.forEach((eventName) => video.removeEventListener(eventName, failIntro));
      stallEvents.forEach((eventName) =>
        video.removeEventListener(eventName, scheduleStallFallback),
      );
      recoveryEvents.forEach((eventName) =>
        video.removeEventListener(eventName, clearStallFallback),
      );
    };
  }, []);

  if (state === "hidden") return null;

  return (
    <div className={`intro-overlay ${state === "fading" ? "intro-overlay--fading" : ""}`}>
      <video
        ref={videoRef}
        className="intro-overlay__video"
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={dismiss}
        onError={dismiss}
        aria-hidden="true"
      >
        <source
          src={mobileIntroVideoSrc}
          media={MOBILE_INTRO_MEDIA_QUERY}
          type="video/mp4"
          data-intro-source="mobile"
        />
        <source
          src={desktopIntroVideoSrc}
          media={DESKTOP_INTRO_MEDIA_QUERY}
          type="video/mp4"
          data-intro-source="desktop"
        />
      </video>
      <button type="button" className="intro-overlay__skip" onClick={dismiss}>
        {language === "ar" ? "تخطي المقدمة" : "Skip Intro"}
      </button>
    </div>
  );
}
