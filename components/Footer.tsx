"use client";

import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react"; // Facebook/Twitter çıktı, MessageCircle (WhatsApp için) eklendi

export default function Footer() {
  return (
    <footer className="bg-[#FDFBF7] text-black pt-24 border-t border-stone-200 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12 mb-24 relative z-10">
        
        {/* 1. KOLON: Marka ve Bülten */}
        <div className="space-y-8 max-w-sm">
          <div>
            <div className="text-3xl font-serif font-light tracking-tight text-black mb-4">
                GAVGAVPET
            </div>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
                İstanbul&apos;un kalbinde, patili dostlarınız için modern, hijyenik ve sevgi dolu bir bakım merkezi.
            </p>
          </div>

          {/* E-Bülten Alanı */}
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-black block">
                Gavgav Club&apos;a Katıl
            </span>
            <div className="flex border-b border-black pb-2">
                <input 
                    type="email" 
                    placeholder="E-posta adresiniz" 
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400 text-black"
                />
                <button className="text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                    KAYDOL
                </button>
            </div>
          </div>
        </div>

        {/* 2. KOLON: Linkler (Grid) */}
        <div className="grid grid-cols-2 gap-12 text-sm tracking-widest uppercase">
          <div className="flex flex-col gap-4">
            <span className="text-black font-bold mb-2 text-xs">Keşfet</span>
            
            {/* ESLint hatasını susturmak için */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="text-stone-500 hover:text-black transition-colors cursor-pointer">
                Ana Sayfa
            </a>

            <Link href="/services" className="text-stone-500 hover:text-black transition-colors">Hizmetler</Link>
            <Link href="/contact" className="text-stone-500 hover:text-black transition-colors">İletişim</Link>

          </div>
          <div className="flex flex-col gap-4">
            <span className="text-black font-bold mb-2 text-xs">Yasal</span>
            <Link href="/" className="text-stone-500 hover:text-black transition-colors">KVKK</Link>
            <Link href="/" className="text-stone-500 hover:text-black transition-colors">Gizlilik</Link>
            <Link href="/" className="text-stone-500 hover:text-black transition-colors">Kullanım Şartları</Link>
          </div>
        </div>

        {/* 3. KOLON: İletişim */}
        <div className="text-left md:text-right space-y-4">
           <p className="text-xs uppercase tracking-widest text-stone-500 font-bold">Rezervasyon & Bilgi</p>
           
           {/* Telefon Numarası Güncellendi */}
           <a href="tel:+905368994374" className="text-3xl font-serif text-black hover:opacity-50 transition-opacity cursor-pointer block">
             +90 (536) 899 43 74
           </a>
           
           <a href="mailto:gavgavpetkuafor@gmail.com" className="text-stone-600 text-sm hover:text-black transition-colors">
             gavgavpetkuafor@gmail.com
           </a>
           
           {/* SOSYAL MEDYA İKONLARI */}
           <div className="flex gap-4 pt-4 md:justify-end">
               
               {/* Instagram */}
               <Link href="https://www.instagram.com/gavgavpet_kuafor/" target="_blank" className="hover:opacity-50 transition-opacity">
                    <Instagram size={20} />
               </Link>
               
               {/* WhatsApp (Yeni Eklendi) */}
               {/* wa.me link formatı kullanıldı */}
               <a href="https://wa.me/905368994374" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity" aria-label="WhatsApp">
                    <MessageCircle size={20} />
               </a>

           </div>
        </div>
      </div>
      
      {/* DEVASA ALT YAZI */}
      <div className="w-full border-t border-black/5">
         <h1 className="text-[13vw] leading-[0.8] font-serif text-center text-black/5 select-none pointer-events-none tracking-tighter w-full">
            GAVGAVPET
         </h1>
      </div>

      <div className="absolute bottom-4 w-full text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">
            © 2026 GavgavPet. All rights reserved.
        </p>
      </div>

    </footer>
  );
}