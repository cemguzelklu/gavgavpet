"use client";

import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

export default function Footer({ dark = false }: { dark?: boolean }) {
  return (
    <footer className={`${dark ? "bg-black text-white border-stone-800" : "bg-[#FDFBF7] text-black border-stone-200"} pt-24 border-t overflow-hidden relative`}>
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12 mb-24 relative z-10">

        {/* 1. KOLON */}
        <div className="space-y-8 max-w-sm">
          <div>
            <div className={`text-3xl font-serif font-light tracking-tight mb-4 ${dark ? "text-white" : "text-black"}`}>
              GAVGAVPET
            </div>
            <p className={`text-sm font-light leading-relaxed ${dark ? "text-stone-400" : "text-stone-600"}`}>
              İstanbul&apos;un kalbinde, patili dostlarınız için modern, hijyenik ve sevgi dolu bir bakım merkezi.
            </p>
          </div>

          <div className="space-y-3">
            <span className={`text-xs font-bold tracking-[0.2em] uppercase block ${dark ? "text-white" : "text-black"}`}>
              Gavgav Club&apos;a Katıl
            </span>
            <div className={`flex border-b pb-2 ${dark ? "border-stone-700" : "border-black"}`}>
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className={`bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-500 ${dark ? "text-white" : "text-black"}`}
              />
              <button className={`text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity ${dark ? "text-white" : "text-black"}`}>
                KAYDOL
              </button>
            </div>
          </div>
        </div>

        {/* 2. KOLON */}
        <div className="grid grid-cols-2 gap-12 text-sm tracking-widest uppercase">
          <div className="flex flex-col gap-4">
            <span className={`font-bold mb-2 text-xs ${dark ? "text-white" : "text-black"}`}>Keşfet</span>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className={`transition-colors cursor-pointer ${dark ? "text-stone-500 hover:text-white" : "text-stone-500 hover:text-black"}`}>
              Ana Sayfa
            </a>
            <Link href="/about" className={`transition-colors ${dark ? "text-stone-500 hover:text-white" : "text-stone-500 hover:text-black"}`}>Hakkımızda</Link>
            <Link href="/services" className={`transition-colors ${dark ? "text-stone-500 hover:text-white" : "text-stone-500 hover:text-black"}`}>Hizmetler</Link>
            <Link href="/sss" className={`transition-colors ${dark ? "text-stone-500 hover:text-white" : "text-stone-500 hover:text-black"}`}>SSS</Link>
            <Link href="/contact" className={`transition-colors ${dark ? "text-stone-500 hover:text-white" : "text-stone-500 hover:text-black"}`}>İletişim</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className={`font-bold mb-2 text-xs ${dark ? "text-white" : "text-black"}`}>Yasal</span>
            <Link href="/" className={`transition-colors ${dark ? "text-stone-500 hover:text-white" : "text-stone-500 hover:text-black"}`}>KVKK</Link>
            <Link href="/" className={`transition-colors ${dark ? "text-stone-500 hover:text-white" : "text-stone-500 hover:text-black"}`}>Gizlilik</Link>
            <Link href="/" className={`transition-colors ${dark ? "text-stone-500 hover:text-white" : "text-stone-500 hover:text-black"}`}>Kullanım Şartları</Link>
          </div>
        </div>

        {/* 3. KOLON */}
        <div className="text-left md:text-right space-y-4">
          <p className={`text-xs uppercase tracking-widest font-bold ${dark ? "text-stone-500" : "text-stone-500"}`}>
            Rezervasyon & Bilgi
          </p>
          <a
            href="tel:+905368994374"
            className={`text-3xl font-serif hover:opacity-50 transition-opacity cursor-pointer block ${dark ? "text-white" : "text-black"}`}
          >
            +90 (536) 899 43 74
          </a>
          <a
            href="mailto:gavgavpetkuafor@gmail.com"
            className={`text-sm hover:opacity-70 transition-colors ${dark ? "text-stone-400" : "text-stone-600"}`}
          >
            gavgavpetkuafor@gmail.com
          </a>
          <div className="flex gap-4 pt-4 md:justify-end">
            <Link
              href="https://www.instagram.com/gavgavpet_kuafor/"
              target="_blank"
              className={`hover:opacity-50 transition-opacity ${dark ? "text-white" : "text-black"}`}
            >
              <Instagram size={20} />
            </Link>
            <a
              href="https://wa.me/905368994374"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-50 transition-opacity ${dark ? "text-white" : "text-black"}`}
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* DEVASA ALT YAZI */}
      <div className={`w-full border-t ${dark ? "border-white/5" : "border-black/5"}`}>
        <h1 className={`text-[13vw] leading-[0.8] font-serif text-center select-none pointer-events-none tracking-tighter w-full ${dark ? "text-white/5" : "text-black/5"}`}>
          GAVGAVPET
        </h1>
      </div>

      <div className="absolute bottom-4 w-full text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-500">
          © 2026 GavgavPet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}