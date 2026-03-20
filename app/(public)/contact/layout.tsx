// app/(public)/contact/layout.tsx  ← YENİ DOSYA
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "İletişim ve Adres – GavgavPet Sarıyer Maslak 1453",
  description:
    "GavgavPet ile iletişime geçin. Adres: Maslak 1453 Sitesi, Sarıyer / İstanbul. Telefon, WhatsApp veya e-posta ile randevu alın.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}
   <Footer /></>;
}