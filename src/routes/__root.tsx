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
const MOBILE_INTRO_VERSION_KEY = "tarik-intro-mobile-v3";
const DESKTOP_INTRO_VERSION_KEY = "tarik-intro-desktop-v3";
const mobileIntroVideoSrc = `${mobileIntroVideo}?v=${MOBILE_INTRO_CACHE_VERSION}`;
const desktopIntroVideoSrc = `${introVideo}?v=${DESKTOP_INTRO_CACHE_VERSION}`;

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
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
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
  const [state, setState] = useState<"visible" | "fading" | "hidden">("visible");

  const dismiss = () => {
    setState((current) => {
      if (current !== "visible") return current;

      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }

      if (removeTimerRef.current !== null) {
        window.clearTimeout(removeTimerRef.current);
      }

      removeTimerRef.current = window.setTimeout(() => {
        setState("hidden");
      }, 760);

      return "fading";
    });
  };

  useEffect(() => {
    if (state === "hidden") {
      document.documentElement.classList.remove("intro-scroll-lock");
      document.body.classList.remove("intro-scroll-lock");
      return undefined;
    }

    window.scrollTo(0, 0);
    document.documentElement.classList.add("intro-scroll-lock");
    document.body.classList.add("intro-scroll-lock");

    return () => {
      document.documentElement.classList.remove("intro-scroll-lock");
      document.body.classList.remove("intro-scroll-lock");
    };
  }, [state]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const isMobileIntro = window.matchMedia(MOBILE_INTRO_MEDIA_QUERY).matches;
    const introSrc = isMobileIntro ? mobileIntroVideoSrc : desktopIntroVideoSrc;
    const introVersionKey = isMobileIntro ? MOBILE_INTRO_VERSION_KEY : DESKTOP_INTRO_VERSION_KEY;
    const introVersion = isMobileIntro ? MOBILE_INTRO_CACHE_VERSION : DESKTOP_INTRO_CACHE_VERSION;

    const setIntroStartTime = () => {
      try {
        video.currentTime = 1;
      } catch {
        // Some mobile browsers allow seeking only after metadata is ready.
      }
    };

    video.src = introSrc;
    video.dataset.introMode = isMobileIntro ? "mobile" : "desktop";

    try {
      window.localStorage.setItem(introVersionKey, introVersion);
      window.sessionStorage.setItem(introVersionKey, introVersion);
    } catch {
      // Storage can be unavailable in private browsing; the versioned URL still busts cache.
    }

    video.load();
    setIntroStartTime();
    video.addEventListener("loadedmetadata", setIntroStartTime, { once: true });

    fallbackTimerRef.current = window.setTimeout(dismiss, 14000);

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
