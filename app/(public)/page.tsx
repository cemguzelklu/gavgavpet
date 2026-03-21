"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, ChevronRight, ChevronLeft, PawPrint, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import LocationFooterBox from "@/components/LocationFooterBox";
import { getAdminStats } from "../admin/actions"; 
import Footer from "@/components/Footer";
import HomeAbout from "@/components/HomeAbout";
import InstaCarousel from "@/components/scrollanimasyon/InstaCarousel";



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

const reviews = [
    {
        id: 1,
        name: "Zafer Ulaslı",
        date: "3 ay önce",
        text: "Paşa ve Maxy’i her getirişimizde güvenle teslim edebildiğimiz tek yer diyebilirim. Ortamın temizliği, sakinliği ve gösterilen özen gerçekten ayrı bir seviyede. Paşa da kendini evinde gibi hissediyor. Hamide Hanım’ın ilgisi, sakinliği ve profesyonelliği bize büyük rahatlık veriyor. Gönül rahatlığıyla tavsiye ederim."
    },
    {
        id: 2,
        name: "Nima Helmi",
        date: "2 hafta önce",
        text: "Açıkçası bu kadar ilgili olacaklarını beklemiyordum. Köpeğimin hassas bir cildi var ve özellikle belirttim, kullandıkları ürünlere kadar anlattılar. Gözüm arkada kalmadan bıraktım. Çıkışta mis gibi kokuyordu ve çok mutlu görünüyordu. Gerçekten işlerini severek yapıyorlar.🤍🤍"
    },
    {
        id: 3,
        name: "Neslişah Sevinç",
        date: "3 ay önce",
        text: "Gav Gav Pet Kuaför’e uzun zamandır geliyoruz ve her seferinde aynı memnuniyetle ayrılıyoruz. Köpeğime yaklaşımları gerçekten çok nazik ve sabırlı, bu da özellikle stresli olabilen patili dostlarımız için çok önemli. Tıraş öncesinde ihtiyaçlarını ve hassasiyetlerini detaylıca soruyorlar, asla acele etmeden tamamen köpeğin konforunu ön planda tutarak çalışıyorlar."
    },
    {
        id: 4,
        name: "Pınar Arslan",
        date: "2 hafta önce",
        text: "Evden alıp eve bırak hizmetini denedim ve gerçekten büyük kolaylık. Yoğun çalışan biri olarak benim için kurtarıcı oldu. Köpeğim tam saatinde getirildi ve tertemizdi. İletişimleri çok düzgün ve güven verici. Düzenli geleceğiz.☺️🩵"
    },
    {
        id: 5,
        name: "Sadaf Majid Pour",
        date: "1 hafta önce",
        text: "Sadece kuaför değil, gerçekten danışmanlık gibi hizmet veriyorlar. Mama seçimi konusunda yardımcı oldular, detaylı bilgi verdiler. Ticari kaygıdan çok doğru yönlendirme vardı. Bu yüzden gönül rahatlığıyla tavsiye ediyorum.🤎"
    }
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paws, setPaws] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const [heroVideo, setHeroVideo] = useState("/kopek1video.mp4");

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isAutoPlayingReviews, setIsAutoPlayingReviews] = useState(true);

  useEffect(() => {
    const generateNonOverlappingPaws = (count: number) => {
      const generated: { id: number; x: number; y: number; style: React.CSSProperties }[] = [];
      let attempts = 0;
      const maxAttempts = 1000; 
      const minDistance = 10; 

      while (generated.length < count && attempts < maxAttempts) {
        attempts++;
        const x = 2 + Math.random() * 96; 
        const y = 2 + Math.random() * 96;
        const isOverlapping = generated.some(paw => {
            const distance = Math.sqrt(Math.pow(paw.x - x, 2) + Math.pow(paw.y - y, 2));
            return distance < minDistance; 
        });

        if (!isOverlapping) {
            generated.push({
                id: attempts, 
                x, y,
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

    const loadData = async () => {
        const stats = await getAdminStats();
        if (stats.videoUrl) setHeroVideo(stats.videoUrl);
        setPaws(generateNonOverlappingPaws(30));
    };
    loadData();
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true); 
    setTimeout(() => {
        setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
        setIsAnimating(false); 
    }, 250); 
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true); 
    setTimeout(() => {
        setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
        setIsAnimating(false); 
    }, 250);
  };
  const currentService = services[currentIndex];

  const nextReview = useCallback(() => {
    setCurrentReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  }, []);

  const prevReview = useCallback(() => {
    setCurrentReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlayingReviews) {
      interval = setInterval(nextReview, 6000); 
    }
    return () => clearInterval(interval);
  }, [isAutoPlayingReviews, nextReview]);

  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-[150px] relative overflow-hidden font-sans selection:bg-stone-900 selection:text-white"> 

      <div className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden z-0">
        {paws.map((paw) => (
          <PawPrint key={paw.id} className="absolute text-[#C08282]" style={paw.style} />
        ))}
      </div>

      <section className="w-full px-4 md:px-8 pb-4 md:pb-8 min-h-screen md:h-[90vh] relative z-10 bg-[#FDFBF7]">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 shadow-2xl overflow-hidden rounded-sm">
            <div className="relative w-full h-[50vh] md:h-full bg-stone-200 overflow-hidden group">
                <video key={heroVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
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

{/* MARQUEE + STATS SECTION */}
<section className="relative z-10 bg-[#FDFBF7]">

  {/* ÜST: Kayan Marquee Şeridi */}
  <div className="border-y border-stone-200 overflow-hidden py-4 bg-[#FDFBF7]">
    <div className="flex animate-marquee whitespace-nowrap gap-0">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-center gap-0 flex-shrink-0">
          {[
            "2019'dan Beri",
            "500+ Mutlu Misafir",
            "Sarıyer & Maslak",
            "4.6★ Google",
            "Makas Tıraş Uzmanı",
            "Anestezisiz Kedi Bakımı",
            "Premium Ürünler",
            "7/7 Hizmet",
          ].map((item, j) => (
            <div key={j} className="flex items-center">
              <span className="font-sans text-[11px] font-bold tracking-[0.3em] uppercase text-stone-400 px-8">
                {item}
              </span>
              <span className="text-[#C08282] text-xs select-none">✦</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>

  {/* ALT: 2 Kolonlu Stats + Manifesto */}
  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-stone-200">

    {/* Sol — Büyük manifesto yazısı */}
    <div className="px-10 md:px-16 py-16 md:py-20 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col justify-between gap-10">
      <p className="font-serif text-2xl md:text-3xl text-stone-800 leading-[1.4] font-light">
        &ldquo;Sıradan bir kuaför değil —<br />
        <em className="text-[#C08282]">dostunuzun kendini güvende hissettiği</em><br />
        bir bakım ritüeli.&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-[1px] bg-stone-300" />
        <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">
          GAVGAVPET 
        </span>
      </div>
    </div>

    {/* Sağ — 4 stat */}
    <div className="grid grid-cols-2 divide-x divide-y divide-stone-200">

      <div className="px-8 py-10 flex flex-col gap-2">
        <span className="font-serif text-5xl text-black leading-none">500<span className="text-[#C08282]">+</span></span>
        <span className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-stone-400 mt-1">
          Mutlu Misafir
        </span>
      </div>

      <div className="px-8 py-10 flex flex-col gap-2">
        <span className="font-serif text-5xl text-black leading-none">4.6<span className="text-[#C08282]">★</span></span>
        <span className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-stone-400 mt-1">
          Google Puanı
        </span>
      </div>

      <div className="px-8 py-10 flex flex-col gap-2">
        <span className="font-serif text-5xl text-black leading-none">7<span className="text-[#C08282]">/7</span></span>
        <span className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-stone-400 mt-1">
          Hizmet Günleri
        </span>
      </div>

      <div className="px-8 py-10 flex flex-col gap-2">
        <span className="font-serif text-5xl text-black leading-none">&#x27;19<span className="text-[#C08282]"></span></span>
        <span className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-stone-400 mt-1">
          Kuruluş Yılı
        </span>
      </div>

    </div>
  </div>
  <HomeAbout />
</section>

      <section className="pb-24 border-b border-stone-200 relative z-10 bg-[#FDFBF7]">
        <div className="container mx-auto px-6 md:px-12 mb-10 text-center md:text-left pt-16 md:pt-24">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400 mb-3 block">
                Gavgav Collection
            </span>
            <h3 className="text-4xl md:text-6xl font-serif text-black font-light leading-none">
                Hizmetlerimiz
            </h3>
        </div>

        <div className="w-full px-4 md:px-12">
            <div className="relative w-full h-[60vh] md:h-[70vh] bg-stone-900 overflow-hidden shadow-2xl flex items-end md:items-center rounded-sm">
                
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70">
                  <source src="/anavideo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                <div className="relative z-10 w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center h-full">
                    <div className={`transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        <div className="text-white/30 text-6xl md:text-8xl font-serif mb-4">0{currentService.id}</div>
                        <span className="text-[#DCCFCF] text-xs font-bold tracking-[0.4em] uppercase mb-4 block">{currentService.subtitle}</span>
                        <h4 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">{currentService.title}</h4>
                        <p className="text-stone-300 font-sans text-sm md:text-lg leading-relaxed max-w-md mb-8">{currentService.desc}</p>
                        <Button asChild className="bg-transparent border border-white text-white hover:!bg-white hover:!text-black transition-all duration-300 rounded-none px-8 py-6 text-xs tracking-widest uppercase active:scale-95">
                            <Link href="/services">Detaylı İncele</Link>
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8 md:bottom-20 md:right-20 flex gap-4 z-20">
                    <button onClick={prevSlide} className="w-12 h-12 md:w-16 md:h-16 border border-white/30 text-white flex items-center justify-center hover:!bg-white hover:!text-black transition-all duration-300 backdrop-blur-sm active:scale-95">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextSlide} className="w-12 h-12 md:w-16 md:h-16 border border-white/30 text-white flex items-center justify-center hover:!bg-white hover:!text-black transition-all duration-300 backdrop-blur-sm active:scale-95">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
                    <div className="h-full bg-[#DCCFCF] transition-all duration-500" style={{ width: `${((currentIndex + 1) / services.length) * 100}%` }}></div>
                </div>

            </div>
        </div>
      </section>

   

      <section 
        className="py-16 md:py-24 bg-stone-900 text-stone-50 overflow-hidden relative z-10" 
        onMouseEnter={() => setIsAutoPlayingReviews(false)}
        onMouseLeave={() => setIsAutoPlayingReviews(true)}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C08282]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center mb-12 md:mb-16"> 
            <span className="text-xs font-light tracking-[0.3em] text-[#DCCFCF] uppercase mb-3 block">Gerçek Hikayeler</span>
            <h2 className="text-2xl md:text-4xl font-serif font-light tracking-[0.05em] text-white"> 
              Misafirlerimizin Gözünden
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto flex items-center justify-center min-h-[350px] md:min-h-[280px]"> 
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReviewIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center px-4 md:px-20 absolute inset-0 flex flex-col justify-center"
              >
                <Quote className="w-10 h-10 md:w-12 md:h-12 mx-auto text-stone-700 mb-5 opacity-40 transform rotate-180 flex-shrink-0" />
                
                <div className="flex justify-center gap-1 mb-6 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#DCCFCF] text-[#DCCFCF]" />
                  ))}
                </div>

                <p className="text-sm md:text-xl font-light leading-relaxed tracking-wide text-stone-200 mb-8 italic"> 
                  &ldquo;{reviews[currentReviewIndex].text}&rdquo;
                </p>

                <div className="flex flex-col items-center gap-1.5 mt-auto flex-shrink-0">
                  <span className="text-sm md:text-base font-serif font-medium tracking-widest uppercase text-white">
                    {reviews[currentReviewIndex].name}
                  </span>
                  <span className="text-[10px] font-light tracking-[0.2em] uppercase text-stone-500">
                    {reviews[currentReviewIndex].date}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <button 
              onClick={prevReview}
              className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 p-2 text-stone-500 hover:text-white transition-colors z-20"
              aria-label="Önceki Yorum"
            >
              <ChevronLeft strokeWidth={1} className="w-8 h-8 md:w-10 md:h-10" />
            </button>
            
            <button 
              onClick={nextReview}
              className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 p-2 text-stone-500 hover:text-white transition-colors z-20"
              aria-label="Sonraki Yorum"
            >
              <ChevronRight strokeWidth={1} className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-12 relative z-20"> 
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReviewIndex(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  currentReviewIndex === idx ? "w-8 bg-[#DCCFCF]" : "w-2 bg-stone-700 hover:bg-stone-500"
                }`}
                aria-label={`${idx + 1}. yoruma git`}
              />
            ))}
          </div>

        </div>
      </section>

      <InstaCarousel />
      <LocationFooterBox />
      <Footer />
    </main>
  );
}