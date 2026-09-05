import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Work_Sans, Archivo } from "next/font/google";
import "./globals.css";
import "./admin/admin.css";

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Go To Sushi Bar — Cēsu vecpilsēta",
  description:
    "Suši bārs Cēsu vecpilsētā, Rīgas ielā 9. Svaigi ruļļi, vasaras terase, aizvešana un piegāde. Sushi bar in Cēsis Old Town.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialLang = cookies().get("lang")?.value === "en" ? "en" : "lv";

  return (
    <html lang={initialLang} className={`${workSans.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
