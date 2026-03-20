import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hakkımızda – GavgavPet Sarıyer Maslak Pet Kuaförü",
  description:
    "GavgavPet, 2019'dan bu yana Sarıyer Maslak 1453'te köpek ve kedi bakımı sunan premium pet kuaförüdür. Hikayemizi, değerlerimizi ve ekibimizi tanıyın.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}
   <Footer />
  </>;
}