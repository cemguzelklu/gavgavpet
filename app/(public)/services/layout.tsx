// app/(public)/services/layout.tsx  ← YENİ DOSYA
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Köpek ve Kedi Grooming Hizmetleri – Sarıyer Maslak",
  description:
    "GavgavPet'te makas tıraş, spa, ozon terapi, keratin, yaratıcı renklendirme ve kedi bakımı. Sarıyer Maslak 1453'te premium pet grooming.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}
  <Footer dark={true} />
  
  </>;
}