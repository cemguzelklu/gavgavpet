"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./ScrollAnimasyon.css";

// Next.js tarafında GSAP eklentisini kaydediyoruz
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ScrollAnimasyon() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Tüm DOM elementlerini seçiyoruz
    const sections = gsap.utils.toArray(".slide") as HTMLElement[];
    const images = gsap.utils.toArray(".overlay-image") as HTMLImageElement[];
    const slideImages = gsap.utils.toArray(".slide__img") as HTMLImageElement[];
    const outerWrappers = gsap.utils.toArray(".slide__outer") as HTMLElement[];
    const innerWrappers = gsap.utils.toArray(".slide__inner") as HTMLElement[];
    const countElement = document.querySelector(".count");

    // BAŞLANGIÇ AYARLARI
    // İlk slayt ve resim hariç hepsini sağa (+%125 ve +%100) sakla
    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(images, { xPercent: 125, scaleX: 1.5, scaleY: 1.3 });

    // Sadece ilk sıradakileri ekranda göster
    gsap.set(outerWrappers[0], { xPercent: 0 });
    gsap.set(innerWrappers[0], { xPercent: 0 });
    gsap.set(images[0], { xPercent: 0, scaleX: 1, scaleY: 1 });

    // CSS Z-Index Sıralaması (Yeni slayt her zaman eskisinin üstüne binsin diye)
    sections.forEach((sec, i) => {
      gsap.set(sec, { zIndex: i + 1 });
      gsap.set(images[i], { zIndex: i + 1 });
    });

    // SCROLLTRIGGER TIMELINE OLUŞTURMA
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true, // Ekranda bölümü iğnele
        scrub: 1, // Fare kaydırmasına akıcı şekilde bağla
        start: "top top",
        end: `+=${sections.length * 100}%`, // 4 slayt = %400 kaydırma mesafesi
      }
    });

    // Her slayt için kaydırma animasyonunu ekle
    for (let i = 1; i < sections.length; i++) {
      const prevHeading = sections[i - 1].querySelector(".slide__heading");
      const curHeading = sections[i].querySelector(".slide__heading");

      tl.addLabel(`wipe${i}`)
        // 1. Dış ve iç kutuyu aynı anda hareket ettirerek "Maske/Wipe" efekti yap
        .to(outerWrappers[i], { xPercent: 0, ease: "none" }, `wipe${i}`)
        .to(innerWrappers[i], { xPercent: 0, ease: "none" }, `wipe${i}`)
        
        // 2. Yazıların genişlikleri ve kaymaları
        .to(prevHeading, { "--width": 800, xPercent: -30, ease: "none" }, `wipe${i}`)
        .fromTo(curHeading, { "--width": 800, xPercent: 30 }, { "--width": 200, xPercent: 0, ease: "none" }, `wipe${i}`)
        
        // 3. Sağ alttaki büyük resim geçişleri
        .fromTo(images[i], { xPercent: 125, scaleX: 1.5, scaleY: 1.3 }, { xPercent: 0, scaleX: 1, scaleY: 1, ease: "none" }, `wipe${i}`)
        .to(images[i - 1], { xPercent: -125, scaleX: 1.5, scaleY: 1.3, ease: "none" }, `wipe${i}`)
        
        // 4. Soldaki küçük resim efekti
        .fromTo(slideImages[i], { scale: 2 }, { scale: 1, ease: "none" }, `wipe${i}`);
    }

    // Scroll esnasında sayacı güncelle
    tl.eventCallback("onUpdate", () => {
      const progress = tl.progress();
      const currentIdx = Math.round(progress * (sections.length - 1));
      if (countElement) {
        countElement.innerHTML = (currentIdx + 1).toString();
      }
    });

  }, { scope: containerRef }); // GSAP sadece bu container içindeki elemanları seçsin

  return (
    <div ref={containerRef} className="scroll-animasyon-wrapper">
      {/* SLIDE 1 */}
      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">SCROLL</h2>
                <figure className="slide__img-cont">
                  <img className="slide__img" src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=80&w=400" alt="Pet Grooming 1" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 2 */}
      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">SWIPE</h2>
                <figure className="slide__img-cont">
                  <img className="slide__img" src="https://images.unsplash.com/photo-1558603668-6570496b66f8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=85&w=400" alt="Pet Grooming 2" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 3 */}
      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">SCROLL</h2>
                <figure className="slide__img-cont">
                  <img className="slide__img" src="https://images.unsplash.com/photo-1537165924986-cc3568f5d454?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=85&w=400" alt="Pet Grooming 3" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 4 */}
      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">SWIPE</h2>
                <figure className="slide__img-cont">
                  <img className="slide__img" src="https://images.unsplash.com/photo-1589271243958-d61e12b61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=80&w=400" alt="Pet Grooming 4" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERLAY - SABİT DURAN BÜYÜK RESİMLER VE SAYAÇ */}
      <section className="overlay">
        <div className="overlay__content">
          <p className="overlay__count">0<span className="count">1</span></p>
          <figure className="overlay__img-cont">
            {/* Sınıf adını overlay-image olarak değiştirdik, karışmasın diye */}
            <img className="overlay-image" src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTU4Mw&ixlib=rb-1.2.1&q=80&w=800" alt="Gavgav Pet 1" />
            <img className="overlay-image" src="https://images.unsplash.com/photo-1594666757003-3ee20de41568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTcwOA&ixlib=rb-1.2.1&q=80&w=800" alt="Gavgav Pet 2" />
            <img className="overlay-image" src="https://images.unsplash.com/photo-1579830341096-05f2f31b8259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTQ5Ng&ixlib=rb-1.2.1&q=80&w=800" alt="Gavgav Pet 3" />
            <img className="overlay-image" src="https://images.unsplash.com/photo-1603771628302-c32c88e568e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTUxNg&ixlib=rb-1.2.1&q=80&w=800" alt="Gavgav Pet 4" />
          </figure>
        </div>
      </section>

    </div>
  );
}