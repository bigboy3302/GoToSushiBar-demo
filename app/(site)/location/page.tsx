import type { Metadata } from "next";
import Location from "@/components/Location";

export const metadata: Metadata = {
  title: "Atrašanās vieta — Go To Sushi Bar",
};

export default function LocationPage() {
  return <Location />;
}
