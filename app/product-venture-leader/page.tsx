import type { Metadata } from "next";
import { ProductProfilePage } from "@/components/product-profile-page";
import { localizeMetadata } from "@/lib/i18n/metadata";
const original: Metadata = {
  title: "Product & Venture Leader in the Netherlands",
  description:
    "Alex Lindholm is a Netherlands-based product and venture leader with 10+ years across product discovery, startup incubation, venture building, accelerator programs, portfolio analysis and business development.",
  keywords: [
    "Product Manager Netherlands",
    "Product Lead Netherlands",
    "Venture Builder Netherlands",
    "Accelerator Program Director",
    "Innovation and Incubation Lead",
    "Entrepreneur in Residence Netherlands",
    "Startup Portfolio Analyst",
    "Alex Lindholm",
  ],
  alternates: { canonical: "https://www.axlindholm.nl/product-venture-leader" },
  openGraph: {
    title: "Alex Lindholm | Product & Venture Leader",
    description:
      "Professional profile covering product discovery, venture building, startup incubation, accelerator leadership and business development.",
    url: "https://www.axlindholm.nl/product-venture-leader",
    type: "profile",
  },
};
export const metadata = localizeMetadata(original, "/product-venture-leader", "en");
export default function Page(){return <ProductProfilePage locale="en"/>;}
