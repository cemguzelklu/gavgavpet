import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Randevu Oluştur – GavgavPet Sarıyer Maslak Pet Kuaförü",
  description:
    "GavgavPet, 2019'dan bu yana Sarıyer Maslak 1453'te köpek ve kedi bakımı sunan premium pet kuaförüdür. Hikayemizi, değerlerimizi ve ekibimizi tanıyın.",
    alternates: {
        canonical: "/appointment", 
      },
};

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}
   <Footer />
  </>;
}