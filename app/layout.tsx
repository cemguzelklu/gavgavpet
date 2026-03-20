import type { Metadata } from "next";
import "@uploadthing/react/styles.css";
import "./globals.css";
import { Toaster } from "sonner";
import { Playfair_Display, Lato } from "next/font/google";
// 1. ADIM: Loader bileşenini içe aktar (Yolun doğruluğunu kontrol et)
import Loader from "@/components/Loader"; 

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Pet Kuaför Sarıyer & Maslak | GavgavPet – Premium Köpek ve Kedi Bakımı",
    template: "%s | GavgavPet",
  },
  description:
    "Sarıyer Maslak 1453'te hizmet veren GavgavPet; köpek tıraşı, kedi bakımı, spa ve grooming hizmetleriyle İstanbul'un en özel pet kuaförü.",
  keywords: [
    "pet kuaför sarıyer",
    "pet kuaför maslak",
    "köpek kuaförü sarıyer",
    "köpek tıraşı maslak",
    "kedi tıraşı sarıyer",
    "pet grooming istanbul",
    "gavgavpet",
  ],
  openGraph: {
    title: "Pet Kuaför Sarıyer & Maslak | GavgavPet",
    description:
      "Sarıyer Maslak 1453'te köpek ve kedi bakımı. Makas tıraş, spa, ozon terapi ve daha fazlası.",
    url: "https://gavgavpet.com",
    siteName: "GavgavPet",
    locale: "tr_TR",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased min-h-screen flex flex-col bg-stone-50 text-rich-black`}>
        
        {/* 2. ADIM: Loader'ı buraya ekledik. Tüm sayfalarda önce bu görünecek. */}
        <Loader /> 

        {children}
        
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}