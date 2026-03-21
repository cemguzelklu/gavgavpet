"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./ScrollAnimasyon2.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// İçeriklerimiz (Gavgavpet konseptine uygun)
const slideData = [
  {
    title: "Premium Bakım",
    img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Makas & Stil",
    img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Spa & Terapi",
    img: "https://images.unsplash.com/photo-1527526029430-319f10814151?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Mutlu Patiler",
    img: "https://images.unsplash.com/photo-1537151608804-ea6fac25d478?q=80&w=2000&auto=format&fit=crop"
  }
];

// ÜCRETSİZ SPLIT TEXT FONKSİYONU
// Metni alır, kelimelere ve harflere bölerek span içine alır
const splitTextToChars = (text: string) => {
  return text.split(" ").map((word, wordIndex) => (
    <span key={wordIndex} className="sa2-word">
      {word.split("").map((char, charIndex) => (
        <span key={charIndex} className="sa2-char">
          {char}
        </span>
      ))}
    </span>
  ));
};

export default function ScrollAnimasyon2() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray(".sa2-section") as HTMLElement[];
    const outerWrappers = gsap.utils.toArray(".sa2-outer") as HTMLElement[];
    const innerWrappers = gsap.utils.toArray(".sa2-inner") as HTMLElement[];
    const backgrounds = gsap.utils.toArray(".sa2-bg") as HTMLElement[];

    // BAŞLANGIÇ AYARLARI
    // İlk slayt hariç diğerlerini aşağıya (yPercent: 100) sakla
    gsap.set(outerWrappers.slice(1), { yPercent: 100 });
    gsap.set(innerWrappers.slice(1), { yPercent: -100 });
    gsap.set(backgrounds.slice(1), { yPercent: 15 }); // Resimlere hafif parallax payı

    // Z-index sıralaması
    sections.forEach((sec, i) => gsap.set(sec, { zIndex: i }));

    // SCROLLTRIGGER OLUŞTURMA
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1, // Scroll akıcılığı
        start: "top top",
        end: `+=${sections.length * 100}%`, // Slayt sayısı kadar kaydırma mesafesi
      }
    });

    // Animsayon Adımları
    sections.forEach((sec, i) => {
      if (i === 0) return; // İlk slaytı atla (zaten ekranda)

      const chars = sec.querySelectorAll(".sa2-char"); // Harfleri seç

      tl.addLabel(`step${i}`)
        // Dış ve iç kutuyu zıt yönlerde hareket ettirerek "perde" efekti yarat
        .to(outerWrappers[i], { yPercent: 0, ease: "none" }, `step${i}`)
        .to(innerWrappers[i], { yPercent: 0, ease: "none" }, `step${i}`)
        
        // Önceki resmi hafif yukarı kaydır, yenisini normal konumuna getir
        .to(backgrounds[i - 1], { yPercent: -15, ease: "none" }, `step${i}`)
        .to(backgrounds[i], { yPercent: 0, ease: "none" }, `step${i}`)
        
        // Harfleri aşağıdan yukarı doğru sırayla (stagger) çıkar
        .fromTo(
          chars,
          { autoAlpha: 0, yPercent: 150 },
          { autoAlpha: 1, yPercent: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          `step${i}` // Kutular gelirken yazılar da gelsin
        );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="sa2-wrapper">
      {slideData.map((slide, index) => (
        <section key={index} className="sa2-section">
          <div className="sa2-outer">
            <div className="sa2-inner">
              <div
                className="sa2-bg"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <h2 className="sa2-heading text-white font-serif">
                  {splitTextToChars(slide.title)}
                </h2>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}