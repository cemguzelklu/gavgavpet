"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocationFooterBox from "@/components/LocationFooterBox";

const values = [
  {
    numeral: "I",
    title: "Önce Sevgi",
    desc: "Her dostu kendi çocuğumuz gibi benimsiyoruz. Bakım sürecinde stres değil, huzur ve güven hissettirmeyi önceliğimiz olarak görüyoruz.",
    tag: "Care First",
  },
  {
    numeral: "II",
    title: "Uzman Eller",
    desc: "Yılların deneyimiyle şekillenmiş bir ekip. Sadece estetik değil, tüy ve deri sağlığını da ön planda tutarak her ırka özel teknikler uyguluyoruz.",
    tag: "Expert Grooming",
  },
  {
    numeral: "III",
    title: "Premium Ürünler",
    desc: "Dermatolojik olarak test edilmiş, hayvan dostu ve vegan sertifikalı ürünler kullanıyoruz. Cildine ne sürdüğümüz bizim için de önemli.",
    tag: "Vegan & Safe",
  },
  {
    numeral: "IV",
    title: "Birebir İlgi",
    desc: "Her seans yalnızca bir misafire ayrılmıştır. Dostunuz asla kalabalık, gürültülü bir ortamda bekletilmez.",
    tag: "One on One",
  },
];

const stats = [
  { number: "2019", label: "Kuruluş Yılı" },
  { number: "500+", label: "Mutlu Misafir" },
  { number: "4.6★", label: "Google Puanı" },
  { number: "7/7", label: "Hizmet Günleri" },
];

export default function AboutPage() {
  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-[100px]">

      {/* HERO */}
      <section className="w-full px-6 lg:px-12 py-16 border-b border-stone-200">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 block mb-6">
              Hakkımızda
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif text-black leading-[0.9] font-light">
              Gavgav<br />
              <em>Pet</em>
            </h1>
          </div>
          <div className="space-y-6 pb-2">
            <p className="font-sans text-base md:text-lg text-stone-600 leading-relaxed">
              Sarıyer&apos;in kalbinde, Maslak 1453&apos;te kurulu GavgavPet; köpek ve kedilere
              yönelik premium grooming ve spa hizmetleriyle İstanbul&apos;un en özel
              pet kuaförü olmayı hedefliyor.
            </p>
            <p className="font-sans text-stone-400 text-sm leading-relaxed">
              2019&apos;dan bu yana ekibimiz, yüzlerce tüylü dostu ağırladı. Her seans,
              standartta değil; dostunuzun ihtiyacına özel tasarlanmış bir deneyimdir.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-stone-200">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="py-12 px-8 text-center border-r border-stone-200 last:border-r-0"
            >
              <div className="font-serif text-4xl md:text-5xl text-black mb-2">{stat.number}</div>
              <div className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 px-6 lg:px-12 border-b border-stone-200">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 block mb-4">
              Hikayemiz
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-black font-light leading-tight">
              Sıradan bir<br />kuaförden<br />fazlası.
            </h2>
          </div>
          <div className="space-y-6 leading-relaxed">
            <p className="font-sans text-stone-600 text-base md:text-lg">
              GavgavPet, Sarıyer ve Maslak bölgesinde evcil hayvan sahiplerinin
              güvenle emanet edebileceği bir bakım atölyesi ihtiyacından doğdu.
              Kuruluşumuzdan bu yana tek bir ilkeyle yönetiyoruz kendimizi:{" "}
              <em className="font-serif text-black">her dostu, kendi çocuğumuz gibi.</em>
            </p>
            <p className="font-sans text-stone-500 text-base md:text-lg">
              Maslak 1453 Sitesi&apos;ndeki stüdyomuz butik bir konseptle
              tasarlanmıştır. Dostunuz; kalabalık, yüksek sesli, stres dolu bir
              salon ortamıyla değil — sakin, temiz ve sevgi dolu bir atmosferle
              karşılaşıyor.
            </p>
            <p className="font-sans text-stone-500 text-base md:text-lg">
              Kullandığımız her ürün dermatolojik olarak test edilmiş, her alet
              her seans öncesi sterilize edilmiş, her kesim ırkın anatomisine
              göre planlanmıştır. Sarıyer ve Maslak&apos;ta pet kuaför deneyimini
              yeniden tanımlamak için buradayız.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES — Editorial Grid */}
      <section className="border-b border-stone-200 bg-[#FDFBF7]">
        <div className="max-w-[1400px] mx-auto">

          {/* Başlık */}
          <div className="px-6 lg:px-12 pt-20 pb-12 flex items-end justify-between border-b border-stone-200">
            <div>
              <span className="font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 block mb-4">
                Değerlerimiz
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-black font-light leading-tight">
                Bizi farklı<br />kılan nedir?
              </h2>
            </div>
            <span className="hidden md:block font-serif text-[8rem] text-stone-100 leading-none select-none">
              ✦
            </span>
          </div>

          {/* 4 kart — 2x2 grid, her biri büyük ve editorial */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={i}
                className="group relative px-10 md:px-14 py-14 md:py-16 border-b border-r border-stone-200 last:border-r-0 even:border-r-0 md:even:border-r-0 md:[&:nth-child(odd)]:border-r hover:bg-stone-50 transition-colors duration-300 overflow-hidden"
              >
                {/* Arka plan numeral */}
                <span className="absolute top-6 right-8 font-serif text-[5rem] md:text-[7rem] text-stone-100 leading-none select-none group-hover:text-stone-200 transition-colors duration-300 pointer-events-none">
                  {v.numeral}
                </span>

                {/* Tag */}
                <span className="font-sans text-[9px] font-bold tracking-[0.35em] uppercase text-[#C08282] block mb-5">
                  {v.tag}
                </span>

                {/* Başlık */}
                <h3 className="font-serif text-2xl md:text-3xl text-black mb-4 leading-tight relative z-10">
                  {v.title}
                </h3>

                {/* Açıklama */}
                <p className="font-sans text-stone-500 text-sm leading-relaxed relative z-10 max-w-sm">
                  {v.desc}
                </p>

                {/* Alt ince çizgi aksanı */}
                <div className="mt-8 w-8 h-[1px] bg-stone-300 group-hover:w-16 transition-all duration-500" />
              </div>
            ))}
          </div>

        </div>
      </section>

      <LocationFooterBox />

    </main>
  );
}