"use client";

import React from "react";
import Link from "next/link";

const INSTA_POSTS = [
  "1.png", "2.png", "3.png", "4.png", "5.png",
  "6.png", "7.png", "8.png", "9.png", "10.png",
];

export default function InstaCarousel() {
  const N = INSTA_POSTS.length;

  return (
    <section className="relative z-10 bg-stone-900 overflow-hidden">

      {/* Arka plan dekor — soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C08282]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ÜST — Başlık alanı */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 md:pt-20 pb-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-end border-b border-white/10">

        {/* Sol — etiket + başlık */}
        <div className="md:col-span-2">
          <span className="font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-[#DCCFCF] block mb-4">
            Instagram · @gavgavpet_kuafor
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light leading-[0.95]">
            Bizden<br />
            <em className="text-[#DCCFCF]">Kareler.</em>
          </h2>
        </div>

        {/* Sağ — açıklama + buton */}
        <div className="flex flex-col gap-6">
          <p className="font-sans text-stone-400 text-sm leading-relaxed">
            Tüylü dostlarımızla dolu anları Instagram&apos;da paylaşıyoruz.
            Bizi takip ederek güncel içerikleri kaçırmayın.
          </p>
          <Link
            href="https://www.instagram.com/gavgavpet_kuafor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 group w-fit"
          >
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-white group-hover:text-stone-400 transition-colors">
              Profili Ziyaret Et
            </span>
            <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-500" />
          </Link>
        </div>
      </div>

      {/* ORTA — 3D Carousel */}
      <div
        className="relative w-full"
        style={{
          perspective: "40em",
          WebkitMask: "linear-gradient(90deg, transparent, #000 12% 88%, transparent)",
          mask: "linear-gradient(90deg, transparent, #000 12% 88%, transparent)",
          minHeight: "520px",
          display: "grid",
        }}
      >
        <div
          style={{
            display: "grid",
            placeSelf: "center",
            transformStyle: "preserve-3d",
            animation: "gavgav-rotate 55s linear infinite",
          }}
        >
          {INSTA_POSTS.map((url, i) => (
            <Link
              key={i}
              href="https://www.instagram.com/gavgavpet_kuafor"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                gridArea: "1 / 1",
                display: "block",
                width: "16em",
                aspectRatio: "4 / 5",
                transform: `rotateY(calc(${i} * (360deg / ${N}))) translateZ(calc(-1 * (0.5 * 16em + 0.5em) / tan(0.5 * (360deg / ${N}))))`,
                backfaceVisibility: "hidden",
                borderRadius: "0.25em",
                overflow: "hidden",
                boxShadow: "0 20px 60px -15px rgba(0,0,0,0.6)",
                transition: "box-shadow 0.3s",
              }}
            >
              <img
                src={`/instagram/${url}`}
                alt={`GavgavPet Instagram ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* ALT — Kayan marquee + buton */}
      <div className="relative z-10 border-t border-white/10">

        {/* Kayan text şeridi */}
        <div className="overflow-hidden py-4 border-b border-white/10">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "gavgav-marquee-dark 25s linear infinite" }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center flex-shrink-0">
                {[
                  "Instagram'da Takip Et",
                  "500+ Mutlu Misafir",
                  "Sarıyer & Maslak",
                  "Premium Grooming",
                  "Köpek & Kedi Bakımı",
                  "7/7 Hizmet",
                ].map((item, j) => (
                  <div key={j} className="flex items-center">
                    <span className="font-sans text-[10px] font-bold tracking-[0.35em] uppercase text-white/30 px-8">
                      {item}
                    </span>
                    <span className="text-[#C08282] text-xs select-none">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Alt buton şeridi */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C08282] animate-pulse" />
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500">
              Güncel içerikler için bizi takip edin
            </span>
          </div>
          <Link
            href="https://www.instagram.com/gavgavpet_kuafor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 px-10 bg-white text-black font-sans text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-[#DCCFCF] transition-colors duration-300 flex-shrink-0"
          >
            Instagram&apos;da Takip Et
          </Link>
        </div>
      </div>

    </section>
  );
}