"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, ChevronRight, ChevronLeft, PawPrint } from "lucide-react";
import { useState, useEffect } from "react";
import { getAdminStats } from "../admin/actions"; // Server Action'ı çağırıyoruz

// --- VERİ TİPİ ---
interface ServiceType {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
}

// --- VERİLER ---
const services: ServiceType[] = [
  {
    id: 1,
    title: "Makas & Stil",
    subtitle: "SCISSOR CUT",
    desc: "Irk standartlarına uygun, tamamen makas ile şekillendirme ve rötüş işlemleriyle dostunuza en uygun stili yaratıyoruz."
  },
  {
    id: 2,
    title: "Spa & Terapi",
    subtitle: "AROMA & KERATIN",
    desc: "Özel keratin yüklemesi ve aroma terapi ile tüy ve deri sağlığı için derinlemesine, rahatlatıcı lüks bakım."
  },
  {
    id: 3,
    title: "Yaratıcı Renkler",
    subtitle: "CREATIVE COLOR",
    desc: "Kuyruk, pati ve kulak bölgeleri için evcil hayvan dostu özel boyalarla sanatsal ve modern dokunuşlar."
  },
  {
    id: 4,
    title: "Kedi Bakım",
    subtitle: "FELINE CARE",
    desc: "Kediler için özel olarak tasarlanmış, stressiz makas ve makine tıraşı ile hijyenik bakım ritüelleri."
  },
  {
    id: 5,
    title: "Hijyen & Bakım",
    subtitle: "MAINTENANCE",
    desc: "Kıtık açma, tırnak kesimi, kulak temizliği ve detaylı tarama ile dostunuzun günlük konforunu sağlıyoruz."
  }
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paws, setPaws] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const [heroVideo, setHeroVideo] = useState("/kopek1video.mp4"); // Varsayılan video

  // --- 1. RASTGELE VE ÇAKIŞMAYAN PATİ ÜRETME ---
  useEffect(() => {
    const generateNonOverlappingPaws = (count: number) => {
      const generated: { id: number; x: number; y: number; style: React.CSSProperties }[] = [];
      let attempts = 0;
      const maxAttempts = 1000; 
      const minDistance = 10; 

      while (generated.length < count && attempts < maxAttempts) {
        attempts++;
        
        // %2 ile %98 arasında rastgele konum
        const x = 2 + Math.random() * 96; 
        const y = 2 + Math.random() * 96;

        const isOverlapping = generated.some(paw => {
            const distance = Math.sqrt(Math.pow(paw.x - x, 2) + Math.pow(paw.y - y, 2));
            return distance < minDistance; 
        });

        if (!isOverlapping) {
            generated.push({
                id: attempts, 
                x,
                y,
                style: {
                    top: `${y}%`,
                    left: `${x}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    opacity: 0.03 + Math.random() * 0.05, 
                    width: `${20 + Math.random() * 40}px`, 
                    height: "auto",
                }
            });
        }
      }
      return generated;
    };

    // Video URL'sini ve Patileri Yükle
    const loadData = async () => {
        // 1. Videoyu Çek
        const stats = await getAdminStats();
        if (stats.videoUrl) setHeroVideo(stats.videoUrl);

        // 2. Patileri Üret
        setPaws(generateNonOverlappingPaws(30));
    };

    loadData();
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentService = services[currentIndex];

  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-[150px] relative overflow-hidden"> 

      {/* --- RASTGELE PATİ DESENİ (ARKA PLAN) --- */}
      {/* absolute: Sayfa ile birlikte kayar (istediğin özellik).
          inset-0: Tüm sayfayı kaplar.
          h-full: Sayfa yüksekliği kadar uzar.
      */}
      <div className="absolute inset-0 pointer-events-none -z-0 w-full h-full overflow-hidden">
        {paws.map((paw) => (
          <PawPrint
            key={paw.id}
            className="absolute text-[#C08282]" // Gül kurusu rengi
            style={paw.style}
          />
        ))}
      </div>

      {/* --- HERO SECTION --- */}
      <section className="w-full px-4 md:px-8 pb-4 md:pb-8 min-h-screen md:h-[90vh] relative z-10">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 shadow-2xl overflow-hidden rounded-sm">
            <div className="relative w-full h-[50vh] md:h-full bg-stone-200 overflow-hidden group">
                <video 
                  key={heroVideo} // Key değişince video yenilenir
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="bg-[#DCCFCF] flex flex-col justify-center items-center text-center p-8 md:p-24 relative">
                <div className="max-w-md space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-black/70 block">
                    Premium Pet Care
                  </span>
                  <h2 className="text-5xl md:text-8xl font-serif text-black leading-[0.9]">
                    Mobile <br/> Pet Spa
                  </h2>
                  <p className="text-black/90 font-medium text-sm md:text-lg leading-relaxed font-sans">
                    Dostunuz için sıradan bir kuaförden fazlası. <br/>
                    İstanbul&apos;un en seçkin bakım deneyimi.
                  </p>
                  <div className="pt-4 md:pt-8">
                    <Button asChild className="bg-black text-white border border-black hover:!bg-white hover:!text-black transition-colors duration-300 rounded-none h-14 md:h-16 px-8 md:px-12 text-[10px] md:text-xs tracking-[0.25em] uppercase">
                        <Link href="/appointment">Randevu Oluştur</Link>
                    </Button>
                  </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- HİZMETLER --- */}
      <section className="py-24 border-b border-stone-200 relative z-10">
        
        <div className="container mx-auto px-6 md:px-12 mb-12">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-stone-500 mb-2 block">
                Gavgav Collection
            </span>
            <h3 className="text-5xl md:text-6xl font-serif text-black font-light leading-none">
                Hizmetlerimiz
            </h3>
        </div>

        <div className="w-full px-4 md:px-12">
            <div className="relative w-full h-[60vh] md:h-[70vh] bg-stone-900 overflow-hidden shadow-2xl flex items-end md:items-center">
                
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                >
                  <source src="/anavideo.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                <div className="relative z-10 w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center h-full">
                    
                    <div className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        
                        <div className="text-white/30 text-6xl md:text-8xl font-serif mb-4">
                            0{currentService.id}
                        </div>

                        <span className="text-[#DCCFCF] text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                            {currentService.subtitle}
                        </span>

                        <h4 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                            {currentService.title}
                        </h4>

                        <p className="text-stone-300 font-sans text-sm md:text-lg leading-relaxed max-w-md mb-8">
                            {currentService.desc}
                        </p>

                        <Button asChild className="bg-transparent border border-white text-white hover:!bg-white hover:!text-black transition-all duration-300 rounded-none px-8 py-6 text-xs tracking-widest uppercase active:scale-95">
                            <Link href="/services">Detaylı İncele</Link>
                        </Button>
                    </div>

                </div>

                <div className="absolute bottom-8 right-8 md:bottom-20 md:right-20 flex gap-4 z-20">
                    <button 
                        onClick={prevSlide}
                        className="w-12 h-12 md:w-16 md:h-16 border border-white/30 text-white flex items-center justify-center hover:!bg-white hover:!text-black transition-all duration-300 backdrop-blur-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="w-12 h-12 md:w-16 md:h-16 border border-white/30 text-white flex items-center justify-center hover:!bg-white hover:!text-black transition-all duration-300 backdrop-blur-sm"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
                    <div 
                        className="h-full bg-[#DCCFCF] transition-all duration-500"
                        style={{ width: `${((currentIndex + 1) / services.length) * 100}%` }}
                    ></div>
                </div>

            </div>
        </div>
      </section>

      {/* --- QUOTE BÖLÜMÜ --- */}
      <section className="py-32 bg-stone-900 text-center px-6 relative z-10">
        <Star className="w-6 h-6 text-[#DCCFCF] mx-auto mb-8 animate-pulse" />
        <h3 className="text-3xl md:text-5xl font-serif text-white max-w-5xl mx-auto leading-[1.2] font-light">
           &quot;Sadece bir kuaför değil, dostunuzun kendini özel hissedeceği bir yaşam alanı.&quot;
        </h3>
        <div className="mt-16">
            <Link href="/contact" className="inline-block text-[#DCCFCF] font-bold uppercase tracking-[0.2em] text-sm hover:text-white transition-colors border-b border-[#DCCFCF] pb-2 hover:border-white">
                Bize Ulaşın
            </Link>
        </div>
      </section>

    </main>
  );
}