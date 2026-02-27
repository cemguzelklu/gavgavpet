"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, Sparkles } from "lucide-react";

// HİZMET VERİLERİ (Aynen Korundu)
const servicesList = [
  {
    id: "01",
    title: "Makas & Stil",
    subtitle: "SCISSOR CUT & STYLING",
    description: "Her ırkın anatomisine ve tüy yapısına uygun, tamamen makas kullanılarak yapılan 'show kalite' tıraşlar. Makine izi olmadan, doğal ve pürüzsüz bir görünüm.",
    features: ["Irk Standartlarında Kesim", "Yıkama & Fön", "Hijyen Tıraşı", "Tırnak Kesimi"],
  },
  {
    id: "02",
    title: "Spa & Terapi",
    subtitle: "AROMA & HYDROMASSAGE",
    description: "Sadece temizlik değil, ruhsal ve bedensel arınma. Ozon terapi ve mikro baloncuk teknolojisi ile derinlemesine deri temizliği ve rahatlama.",
    features: ["Ozon Terapi", "Mikro Baloncuk Banyosu", "Aroma Terapi", "Keratin Yüklemesi"],
  },
  {
    id: "03",
    title: "Yaratıcı Renkler",
    subtitle: "CREATIVE GROOMING",
    description: "Dostunuzun karakterini yansıtan güvenli ve geçici renk dokunuşları. Kuyruk, kulak veya pati uçlarına yapılan sanatsal renklendirmeler.",
    features: ["Vegan Boyalar", "Pati & Kuyruk Renklendirme", "Geçici Tebeşir Uygulamaları"],
  },
  {
    id: "04",
    title: "Kedi Özel Bakım",
    subtitle: "FELINE EXCLUSIVE",
    description: "Kedilerin hassas doğasına uygun, sessiz ve stressiz bir ortamda; anestezi kullanılmadan yapılan profesyonel bakım ritüelleri.",
    features: ["Anestezisiz Tıraş", "Kıtık Açma", "Tırnak Kesimi", "Özel Kedi Banyosu"],
  },
  {
    id: "05",
    title: "Hijyen & Bakım",
    subtitle: "MAINTENANCE & HYGIENE",
    description: "Düzenli yapılması gereken temel bakım işlemleri. Dostunuzun yaşam kalitesini artıran küçük ama hayati dokunuşlar.",
    features: ["Göz & Kulak Temizliği", "Pati Bakımı", "Anal Kese Temizliği", "Detaylı Tarama"],
  }
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-black">
      
      {/* --- SABİT ARKA PLAN VİDEOSU --- */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
        >
            <source src="/kopekkesim2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
      </div>

      {/* --- İÇERİK KATMANI --- */}
      <div className="relative z-10">

        {/* --- HERO SECTION --- */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-white/50 mx-auto animate-pulse" />
                <span className="block text-white/70 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
                    Gavgav Signature Services
                </span>
                <h1 className="text-5xl md:text-9xl font-serif text-white font-light leading-none">
                    Atelier <br/> Grooming
                </h1>
                <p className="text-stone-300 max-w-lg mx-auto text-sm md:text-lg font-light leading-relaxed">
                    Sıradan bir kuaförden fazlası. <br/>
                    Dostunuz için tasarlanmış bir sanat atölyesi.
                </p>
            </div>

            {/* SCROLL GÖSTERGESİ - OPTİMİZE EDİLMİŞ MESAFE (bottom-[-20px] ve md:bottom-[-30px]) */}
            <div className="absolute bottom-[-20px] md:bottom-[-30px] left-0 w-full flex justify-center z-20 mix-blend-overlay">
                <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] text-white/80 font-bold tracking-[0.4em] uppercase animate-pulse">
                        Explore
                    </span>
                    <div className="w-[1px] h-24 bg-gradient-to-b from-white via-white/50 to-transparent"></div>
                </div>
            </div>
        </section>

        {/* --- HİZMET KARTLARI --- */}
        <section className="py-24 px-4 md:px-0 flex flex-col items-center gap-24 md:gap-40 pb-40">
            {servicesList.map((service, index) => (
                <div 
                    key={service.id} 
                    className="w-full max-w-4xl backdrop-blur-md bg-white/5 border border-white/10 p-8 md:p-16 rounded-none md:rounded-sm hover:bg-white/10 transition-all duration-500 group"
                >
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                        
                        {/* Numara */}
                        <div className="hidden md:block">
                            <span className="text-6xl md:text-8xl font-serif text-white/20 group-hover:text-white/40 transition-colors">
                                {service.id}
                            </span>
                        </div>

                        {/* İçerik */}
                        <div className="flex-1 space-y-6">
                            <span className="md:hidden text-5xl font-serif text-white/20 mb-4 block">
                                {service.id}
                            </span>

                            <div className="space-y-2">
                                <span className="text-[#DCCFCF] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block">
                                    {service.subtitle}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                                    {service.title}
                                </h2>
                            </div>

                            <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light">
                                {service.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-stone-400 text-[11px] md:text-sm tracking-wide uppercase">
                                        <div className="w-1 h-1 bg-white rounded-full"></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <Button asChild className="bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 rounded-none h-12 px-8 text-xs tracking-[0.2em] uppercase w-full md:w-auto">
                                    <Link href="/appointment">Randevu Oluştur</Link>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </section>

        {/* --- FOOTER CTA --- */}
        <section className="py-32 text-center px-6 bg-black relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <Star className="w-8 h-8 mx-auto mb-8 text-white/30 animate-spin-slow" />
            
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">
                Hazır mısınız?
            </h2>
            
            <div className="flex justify-center gap-6">
                <Button asChild className="bg-transparent border border-white/30 text-white hover:!bg-white hover:!text-black rounded-none h-14 px-10 text-xs tracking-[0.2em] uppercase transition-all">
                    <Link href="/contact">İletişime Geç</Link>
                </Button>
            </div>
        </section>

      </div>
    </main>
  );
}