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
  title: "Gavgav Pet | Luxury Pet Spa",
  description: "Patili dostlarınız için üst düzey bakım ve spa deneyimi.",
  icons: {
    icon: "/icon.png", // public klasöründeki yeni isme yönlendirdik
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