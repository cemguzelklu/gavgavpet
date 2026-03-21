"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const pillars = [
  {
    numeral: "01",
    tag: "Lokasyon",
    title: "Sarıyer & Maslak",
    desc: "Maslak 1453 Sitesi'nde, İstanbul'un en prestijli bölgesinde. Levent, Ayazağa ve İstinye'den kolayca ulaşım.",
  },
  {
    numeral: "02",
    tag: "Uzmanlık",
    title: "Makas Tıraş & Grooming",
    desc: "Irka özel makas teknikleri, ozon terapi, keratin ve spa. Her dokunuş, bir uzmanlık meselesi.",
  },
  {
    numeral: "03",
    tag: "Fark",
    title: "Birebir & Stressiz",
    desc: "Aynı anda sınırlı sayıda misafir. Kalabalık salon ortamı yok. Dostunuz için sakin, güvenli ve özel bir deneyim.",
  },
];

export default function HomeAbout() {
  return (
    <section className="relative z-10 bg-[#FDFBF7]">

      {/* ÜST — Editorial başlık + açıklama */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-stone-200">

        {/* Sol — Büyük başlık */}
        <div className="px-10 md:px-16 py-16 md:py-24 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col justify-between gap-8">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 block mb-8">
              Sarıyer · Maslak · İstanbul
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-black font-light leading-[0.95]">
              Sıradan bir<br />
              <em className="text-[#C08282]">kuaförden</em><br />
              fazlası.
            </h2>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-4 group w-fit"
          >
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-black group-hover:text-stone-500 transition-colors">
              Bizi Tanıyın
            </span>
            <span className="w-8 h-[1px] bg-black group-hover:w-16 transition-all duration-500" />
          </Link>
        </div>

        {/* Sağ — Ana metin */}
        <div className="px-10 md:px-16 py-16 md:py-24 flex flex-col justify-center gap-6">
          <p className="font-sans text-stone-600 text-base md:text-lg leading-relaxed">
            GavgavPet, <strong className="text-black font-medium">Sarıyer</strong> ve <strong className="text-black font-medium">Maslak</strong> bölgesinde
            köpek ve kedi sahiplerine özel, butik bir bakım deneyimi sunuyor.
            2019&apos;dan bu yana yüzlerce tüylü dostu ağırladık.
          </p>
          <p className="font-sans text-stone-400 text-sm leading-relaxed">
            <strong className="text-stone-600 font-medium">Maslak 1453 Sitesi</strong>&apos;ndeki stüdyomuzda
            makas tıraş, spa, ozon terapi ve kedi bakımı hizmetleri veriyoruz.
            Her seans yalnızca bir misafir için ayrılmıştır —
            çünkü dostunuz bunu hak ediyor.
          </p>

          {/* İnce istatistik şeridi */}
          <div className="grid grid-cols-3 gap-0 border-t border-stone-200 mt-4 pt-8">
            <div className="text-center border-r border-stone-200">
              <div className="font-serif text-3xl text-black mb-1">500<span className="text-[#C08282] text-xl">+</span></div>
              <div className="font-sans text-[9px] font-bold tracking-[0.25em] uppercase text-stone-400">Tüylü Misafir</div>
            </div>
            <div className="text-center border-r border-stone-200">
              <div className="font-serif text-3xl text-black mb-1">4.6<span className="text-[#C08282] text-xl">★</span></div>
              <div className="font-sans text-[9px] font-bold tracking-[0.25em] uppercase text-stone-400">Google Puanı</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl text-black mb-1">&apos;   <span className="text-[#C08282]">19</span></div>
              <div className="font-sans text-[9px] font-bold tracking-[0.25em] uppercase text-stone-400">Kuruluş</div>
            </div>
          </div>
        </div>
      </div>

      {/* ALT — 3 sütun pillar */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-stone-200">
        {pillars.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
            className="group relative px-10 py-12 border-b md:border-b-0 md:border-r border-stone-200 last:border-r-0 hover:bg-stone-50 transition-colors duration-300 overflow-hidden"
          >
            {/* Arka plan numeral */}
            <span className="absolute top-4 right-6 font-serif text-[5rem] text-stone-100 leading-none select-none group-hover:text-stone-200 transition-colors pointer-events-none">
              {p.numeral}
            </span>

            <span className="font-sans text-[9px] font-bold tracking-[0.35em] uppercase text-[#C08282] block mb-4">
              {p.tag}
            </span>
            <h3 className="font-serif text-2xl text-black mb-3 leading-tight relative z-10">
              {p.title}
            </h3>
            <p className="font-sans text-stone-500 text-sm leading-relaxed relative z-10">
              {p.desc}
            </p>
            <div className="mt-6 w-6 h-[1px] bg-stone-300 group-hover:w-12 transition-all duration-500" />
          </motion.div>
        ))}
      </div>

    </section>
  );
}