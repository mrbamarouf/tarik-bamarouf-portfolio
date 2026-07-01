import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import introVideo from "../assets/intro/final-intro.mp4";
import mobileIntroVideo from "../assets/intro/mobile-intro-9x16.mp4";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider, siteCopy, useLanguage } from "@/lib/language";

const MOBILE_INTRO_MEDIA_QUERY = "(max-width: 767px)";
const DESKTOP_INTRO_MEDIA_QUERY = "(min-width: 768px)";
const MOBILE_INTRO_CACHE_VERSION = "intro-mobile-v3";
const DESKTOP_INTRO_CACHE_VERSION = "intro-desktop-v3";
const mobileIntroVideoSrc = `${mobileIntroVideo}?v=${MOBILE_INTRO_CACHE_VERSION}`;
const desktopIntroVideoSrc = `${introVideo}?v=${DESKTOP_INTRO_CACHE_VERSION}`;
const INTRO_FALLBACK_MS = 12_500;
const INTRO_INTERNAL_NAVIGATION_KEY = "tarik-bamarouf-intro-internal-navigation";
let introHasPlayedThisPageLoad = false;
let pendingInternalIntroSkipHref: string | null = null;

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
          className:
            typeof element.className === "string"
              ? element.className
              : element.className.baseVal,
        }));

      console.debug("[intro-cleanup] elementsFromPoint(center)", elements);
    });
  }, 0);
}

function wakeMobileScrollAfterIntro() {
  if (typeof window === "undefined" || !isMobileIntroViewport()) return;

  const overlay = document.querySelector<HTMLElement>(".intro-overlay");
  overlay?.style.setProperty("pointer-events", "none");
  unlockIntroScroll();

  let scrollWasNudged = false;

  const cleanupAndWake = ({ nudgeScroll = false, debug = false } = {}) => {
    document.querySelector(".intro-overlay")?.remove();
    unlockIntroScroll();

    // Force WebKit to recalculate the now-unlocked document before the first touch gesture.
    void document.documentElement.offsetHeight;

    if (nudgeScroll && !scrollWasNudged && window.scrollY === 0) {
      scrollWasNudged = true;
      window.scrollTo(0, 1);
      void document.body.offsetHeight;
      window.scrollTo(0, 0);
    }

    if (debug) {
      logMobileIntroTopElements();
    }
  };

  window.requestAnimationFrame(() => {
    cleanupAndWake({ nudgeScroll: true });

    window.requestAnimationFrame(() => {
      cleanupAndWake({ debug: true });
    });
  });

  window.setTimeout(cleanupAndWake, 120);
}

function consumeInternalNavigationIntroSkip() {
  if (typeof window === "undefined") return false;

  try {
    const shouldSkip = window.sessionStorage.getItem(INTRO_INTERNAL_NAVIGATION_KEY) === "1";
    window.sessionStorage.removeItem(INTRO_INTERNAL_NAVIGATION_KEY);
    return shouldSkip;
  } catch {
    return false;
  }
}

function storeInternalNavigationIntroSkip() {
  try {
    window.sessionStorage.setItem(INTRO_INTERNAL_NAVIGATION_KEY, "1");
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
        <h2 className="mt-4 text-xl font-semibold text-foreground">{labels.notFoundTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {labels.notFoundBody}
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
          {labels.errorTitle}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {labels.errorBody}
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
      { title: "Tarik Bamarouf | Digital Experiences for Ambitious Brands" },
      {
        name: "description",
        content:
          "Premium websites, e-commerce stores, and digital experiences crafted for modern brands.",
      },
      { name: "author", content: "Tarik Bamarouf" },
      {
        property: "og:title",
        content: "Tarik Bamarouf | Digital Experiences for Ambitious Brands",
      },
      {
        property: "og:description",
        content:
          "Premium websites, e-commerce stores, and digital experiences crafted for modern brands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
  )};var c=function(){var p=["overflow","overflow-x","overflow-y","position","top","right","bottom","left","height","width","touch-action","overscroll-behavior"];document.documentElement.classList.remove("intro-scroll-lock");document.body.classList.remove("intro-scroll-lock");p.forEach(function(s){document.documentElement.style.removeProperty(s);document.body.style.removeProperty(s);});};if(r){window.sessionStorage.removeItem(k)}else if(window.sessionStorage.getItem(k)==="1"){document.querySelector(".intro-overlay")?.remove();c();}}catch{}`;

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <HeadContent />
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
      <IntroOverlay />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

function IntroOverlay() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const removeTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const mobileScrollWakeRanRef = useRef(false);
  const [state, setState] = useState<"visible" | "fading" | "hidden">(getInitialIntroState);

  useEffect(() => {
    const markInternalNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
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
        storeInternalNavigationIntroSkip();
      }
    };

    document.addEventListener("click", markInternalNavigation, { capture: true });
    window.addEventListener("pagehide", persistInternalNavigation);

    return () => {
      document.removeEventListener("click", markInternalNavigation, { capture: true });
      window.removeEventListener("pagehide", persistInternalNavigation);
    };
  }, []);

  const dismiss = () => {
    unlockIntroScroll();

    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
    }

    if (removeTimerRef.current !== null) {
      window.clearTimeout(removeTimerRef.current);
    }

    if (isMobileIntroViewport()) {
      setState("hidden");
      if (!mobileScrollWakeRanRef.current) {
        mobileScrollWakeRanRef.current = true;
        wakeMobileScrollAfterIntro();
      }
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

    const setIntroStartTime = () => {
      try {
        video.currentTime = 1;
      } catch {
        // Some mobile browsers allow seeking only after metadata is ready.
      }
    };

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
      if (removeTimerRef.current !== null) {
        window.clearTimeout(removeTimerRef.current);
      }
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
      video.removeEventListener("loadedmetadata", setIntroStartTime);
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
    </div>
  );
}
