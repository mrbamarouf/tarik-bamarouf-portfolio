import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function SectionLabel({ index, title }: { index: string; title?: string }) {
  return (
    <div className="flex items-center gap-6 text-[10px] tracking-luxury uppercase text-bronze">
      <span>{index}</span>
      <span className="h-px w-12 bg-bronze/60" />
      {title && <span className="text-muted-foreground">{title}</span>}
    </div>
  );
}
