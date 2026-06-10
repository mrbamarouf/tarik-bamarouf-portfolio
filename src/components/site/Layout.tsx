import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { formatSectionIndex, useLanguage } from "@/lib/language";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="site-main flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function SectionLabel({ index, title }: { index: string; title?: string }) {
  const { language } = useLanguage();
  const localizedIndex = formatSectionIndex(index, language);

  return (
    <div className="section-label flex items-center gap-6 text-[10px] tracking-luxury uppercase text-bronze">
      <span>{localizedIndex}</span>
      <span className="h-px w-12 bg-bronze/60" />
      {title && <span className="text-muted-foreground">{title}</span>}
    </div>
  );
}
