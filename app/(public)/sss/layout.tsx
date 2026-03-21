import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular – Pet Kuaför Sarıyer Maslak | GavgavPet",
  description:
    "GavgavPet hakkında merak edilenler: köpek tıraşı, kedi bakımı, randevu, ürünler ve fiyatlar. Sarıyer Maslak 1453'teki pet kuaföründen yanıtlar.",
    alternates: {
      canonical: "/sss", 
    },
  };

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}
   <Footer />
  </>;
}