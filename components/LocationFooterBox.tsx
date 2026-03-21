"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export default function ContactCta() {
  return (
    <section className={`py-24 md:py-32 bg-[#FDFBF7] overflow-hidden relative w-full ${inter.className}`}>
      
      {/* Hafif doku deseni */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #d6d3d1 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center">

          {/* ─ Sol: Yazı + Buton ─ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-start text-left w-full"
          >
            <span className="text-[10px] tracking-[0.35em] text-stone-400 uppercase mb-6 block">
              İletişim
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-extralight tracking-tight text-stone-800 leading-[1.05] mb-8">
              Minik Dostunuz İçin <br />
              <span className="italic text-stone-500">Kusursuz Bakım</span>
            </h2>

            <div className="w-14 h-[1px] bg-stone-300 mb-8" />

            <p className="text-stone-500 font-light tracking-wide mb-10 max-w-lg leading-relaxed text-sm md:text-base">
              GavGav Pet Kuaför&apos;de sevimli dostlarınızın tüy kesimi, banyo ve pati bakımı gibi tüm ihtiyaçlarını sevgiyle ve profesyonelce karşılıyoruz. Hemen randevunuzu oluşturun, patili dostunuzu mutlu edelim.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* DEĞİŞİKLİK BURADA: hover:!text-black ve transition-all kullanıldı */}
              <Link
                href="/appointment"
                className="bg-black text-white border border-black px-10 py-4 text-xs font-light tracking-[0.25em] uppercase hover:bg-white hover:!text-black transition-all duration-500 shadow-xl text-center"
              >
                Randevu Oluştur
              </Link>
              
              <Link
                href="/contact"
                className="px-10 py-4 text-xs font-light tracking-[0.25em] uppercase text-stone-700 border border-stone-300 hover:bg-stone-700 hover:text-white hover:border-stone-700 transition-all duration-500 text-center"
              >
                İletişime Geç
              </Link>
            </div>
          </motion.div>

          {/* ─ Sağ: Lokasyon Kartı ─ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full"
          >
            <div className="bg-[#FDFBF7] shadow-2xl shadow-stone-200 overflow-hidden flex flex-col rounded-sm">

              <div className="w-full h-64 sm:h-72 lg:h-80 relative">
                <iframe
                  title="GavGav Pet Konum"
                  src="https://maps.google.com/maps?q=Maslak%201453%20Sitesi,%20T4b%20Blok%20Sariyer%20GavGav%20Pet&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  style={{ filter: "grayscale(100%)" }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="p-8 flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-1">Adres</p>
                    <p className="text-stone-700 text-sm font-light leading-relaxed">
                      Maslak 1453 Sitesi, T4b Blok <br /> -4. Kat, No: 213 <br /> 34398 Sarıyer / İstanbul
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-[#FDFBF7]" />

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-stone-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-1">Telefon</p>
                    <a href="tel:+905368994374" className="text-stone-700 text-sm font-light hover:text-stone-900 transition-colors">
                      +90 536 899 43 74
                    </a>
                  </div>
                </div>

                <div className="h-[1px] bg-[#FDFBF7]" />

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-stone-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-1">Çalışma Saatleri</p>
                    <p className="text-stone-700 text-sm font-light">
                      Pazartesi — Pazar <br /> 09:00 – 19:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}