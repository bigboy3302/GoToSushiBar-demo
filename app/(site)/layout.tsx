import { cookies } from "next/headers";
import { LangProvider } from "@/lib/i18n/LangContext";
import PageMotion from "@/components/PageMotion";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const initialLang = cookies().get("lang")?.value === "en" ? "en" : "lv";

  return (
    <LangProvider initialLang={initialLang}>
      <div className="grain" aria-hidden="true" />
      <PageMotion />
      <div id="page">
        <Header />
        <main id="top">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
