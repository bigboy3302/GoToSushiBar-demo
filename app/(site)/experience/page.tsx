import type { Metadata } from "next";
import Experience from "@/components/Experience";

export const metadata: Metadata = {
  title: "Pieredze — Go To Sushi Bar",
};

export default function ExperiencePage() {
  return <Experience />;
}
