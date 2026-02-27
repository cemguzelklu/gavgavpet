"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, PawPrint } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation"; // --- YENİ: Sayfa yolunu almak için eklendi ---
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// --- GÜNCELLENEN BİLEŞEN ---
const MenuLink = ({ href, label, onClick, isActive }: { href: string, label: string, onClick: (e: React.MouseEvent) => void, isActive: boolean }) => (
  <Link 
    href={href} 
    onClick={onClick} 
    className={`group flex items-center text-3xl md:text-4xl font-serif py-2 transition-all duration-500 ${isActive ? "text-stone-900 italic" : "text-black"}`}
  >
      {/* isActive ise çizgi sabit durur, değilse sadece hoverda çıkar */}
      <span className={`h-[1px] bg-black transition-all duration-500 ease-out 
        ${isActive ? "w-12 mr-4 opacity-100" : "w-0 mr-0 opacity-0 group-hover:w-8 group-hover:mr-4 group-hover:opacity-100"}
      `}></span>
      
      {/* Yazı kayma efekti */}
      <span className={`transition-all duration-500 ease-out 
        ${isActive ? "translate-x-2 font-medium" : "group-hover:italic group-hover:translate-x-2 group-hover:text-stone-600"}
      `}>
          {label}
      </span>
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // --- MEVCUT SAYFAYI ALIR ---

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
        e.preventDefault();
        window.scrollTo(0, 0);
        window.location.reload();
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out group hover:bg-[#FDFBF7] hover:shadow-sm
        ${scrolled ? "py-4" : "py-8 md:py-12"}
    `}>
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 md:px-12">
        
        {/* --- SOL: MENÜ BUTONU --- */}
        <div className="flex-1 flex items-center justify-start">
           {isMounted && (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <button className="flex items-center gap-3 group/btn outline-none relative z-50">
                        <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-1000 group-hover/btn:rotate-90">
                           {isOpen ? (
                             <X className="w-8 h-8 text-black stroke-[1.5]" />
                           ) : (
                             <Menu className="w-8 h-8 text-black stroke-[1.5]" />
                           )}
                        </div>
                    </button>
                </SheetTrigger>
                
                <SheetContent side="left" className="w-full md:w-[400px] bg-[#FDFBF7] border-r border-stone-100 p-8 md:p-10 z-[60] transition-all duration-500 ease-in-out">
                    <SheetHeader className="mb-8 md:mb-12 text-left">
                        <SheetTitle className="font-serif text-3xl md:text-4xl font-light text-black tracking-tight">
                        <h1 className="text-2xl md:text-4xl font-serif text-black tracking-tight hover:opacity-70 transition-opacity scale-y-105 flex items-baseline">
                    <span className="font-bold">GAVGAV</span>
                    <span className="font-light italic ml-0.3">Pet</span>
                </h1>
                        </SheetTitle>
                    </SheetHeader>
                    
                    <div className="flex flex-col gap-4 md:gap-6">
                        {/* isActive={(pathname === "/")} kontrolü hangi sayfanın aktif olduğunu belirler */}
                        <MenuLink href="/" label="Ana Sayfa" onClick={handleHomeClick} isActive={pathname === "/"} />
                        <MenuLink href="/services" label="Hizmetler" onClick={() => setIsOpen(false)} isActive={pathname === "/services"} />
                        <MenuLink href="/contact" label="İletişim" onClick={() => setIsOpen(false)} isActive={pathname === "/contact"} />
                        
                        <div className="mt-6 md:hidden">
                             <Button asChild className="w-full bg-black text-white border border-black hover:!bg-white hover:!text-black transition-colors duration-300 rounded-none py-6 text-xs tracking-widest uppercase">
                                <Link href="/appointment" onClick={() => setIsOpen(false)}>Randevu Al</Link>
                            </Button>
                        </div>

                        <div className="mt-8 md:mt-16 pt-8 md:pt-10 border-t border-stone-200">
                            <p className="text-xs uppercase tracking-widest text-stone-400 mb-4 md:mb-6 font-bold">Bize Ulaşın</p>
                            <a href="tel:+905368994374" className="text-xl font-serif text-black mb-2 block">+90 (536) 899 43 74</a>
                            <a href="mailto:gavgavpetkuafor@gmail.com" className="text-lg font-serif text-stone-600 block">gavgavpetkuafor@gmail.com</a>
                        </div>
                    </div>
                </SheetContent>
                </Sheet>
            )}
        </div>

        {/* --- ORTA: LOGO --- */}
        <div className="flex-1 flex justify-center">
            <Link 
                href="/" 
                onClick={handleHomeClick}
                className="flex items-center gap-2 z-10 cursor-pointer group/logo"
            >
                <div className="flex items-end gap-[2px] mb-[2px]">
                    <PawPrint className="w-3 h-3 text-black fill-black/10 -rotate-12 mb-[1px] opacity-60 transition-transform duration-300 group-hover/logo:-translate-x-1" strokeWidth={1.5} />
                    <PawPrint className="w-4 h-4 text-black fill-black/10 rotate-12 transition-transform duration-300 group-hover/logo:rotate-0" strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl md:text-4xl font-serif text-black tracking-tight hover:opacity-70 transition-opacity scale-y-105 flex items-baseline">
                    <span className="font-bold">GAVGAV</span>
                    <span className="font-light italic ml-0.3">Pet</span>
                </h1>
            </Link>
        </div>

       {/* --- SAĞ: RANDEVU BUTONU --- */}
       <div className="flex-1 flex items-center justify-end">
            <Button asChild className="!hidden md:!flex bg-black text-white border border-black hover:!bg-white hover:!text-black transition-colors duration-300 rounded-full h-11 px-6 text-xs tracking-widest uppercase shadow-none items-center justify-center">
                <Link href="/appointment">Randevu Al</Link>
            </Button>
        </div>

      </div>
    </nav>
  );
}