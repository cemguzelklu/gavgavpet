"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// YENİ KÜTÜPHANEMİZİ İÇERİ AKTARIYORUZ
import { toCanvas } from "html-to-image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ThanosAnimasyon() {
  const sectionRef = useRef<HTMLElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false); // Çift çalışmayı önleyen kilit
  
  const [isReady, setIsReady] = useState(false);

  useGSAP(() => {
    if (!captureRef.current || !canvasContainerRef.current || !sectionRef.current) return;
    if (hasRun.current) return; // Zaten çalıştıysa tekrar etme
    hasRun.current = true;

    const captureEl = captureRef.current;
    const containerEl = canvasContainerRef.current;
    const COUNT = 75; 
    const REPEAT_COUNT = 3;

    // html-to-image ile elementi doğrudan kanvasa çeviriyoruz
    toCanvas(captureEl, {
      backgroundColor: 'transparent',
      pixelRatio: 1 // Performans için birebir çözünürlük
    }).then((canvas) => {
      const width = canvas.width;
      const height = canvas.height;
      
      const ctx2d = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx2d) return;

      const imageData = ctx2d.getImageData(0, 0, width, height);
      const dataList: ImageData[] = [];

      for (let i = 0; i < COUNT; i++) {
        dataList.push(ctx2d.createImageData(width, height));
      }

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          for (let l = 0; l < REPEAT_COUNT; l++) {
            const index = (x + y * width) * 4;
            const dataIndex = Math.floor((COUNT * (Math.random() + (2 * x) / width)) / 3);
            const safeIndex = Math.max(0, Math.min(dataIndex, COUNT - 1));

            for (let p = 0; p < 4; p++) {
              dataList[safeIndex].data[index + p] = imageData.data[index + p];
            }
          }
        }
      }

      // Orijinal kartı gizle
      captureEl.style.display = "none";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, 
          start: "top top",
          end: "+=150%", 
        }
      });

      dataList.forEach((data, i) => {
        const clonedCanvas = document.createElement("canvas");
        clonedCanvas.width = width;
        clonedCanvas.height = height;
        clonedCanvas.getContext("2d")?.putImageData(data, 0, 0);
        clonedCanvas.className = "absolute top-0 left-0 w-full h-full pointer-events-none";

        containerEl.appendChild(clonedCanvas);

        const randomAngle = (Math.random() - 0.5) * 2 * Math.PI;
        const randomRotationAngle = 45 * (Math.random() - 0.5);

        tl.to(clonedCanvas, {
          duration: 1,
          rotation: randomRotationAngle,
          x: 150 * Math.sin(randomAngle),
          y: 150 * Math.cos(randomAngle),
          opacity: 0,
          ease: "power1.out"
        }, (i / COUNT) * 1.5); 
      });

      setIsReady(true);
      ScrollTrigger.refresh(); 
      
    }).catch(err => {
      console.error("Parçalanma Efekti Hatası:", err);
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#FDFBF7] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="text-center mb-10 z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Sihirli Dokunuşlar</h2>
        <p className="text-stone-500 font-light mb-2">Aşağı kaydırarak tozlardan arınmayı izleyin.</p>
        
        {!isReady && (
          <p className="text-xs font-bold tracking-widest text-[#C08282] uppercase animate-pulse">
            Büyü Hazırlanıyor...
          </p>
        )}
      </div>

      <div ref={canvasContainerRef} className="relative w-[90%] max-w-[400px] aspect-[4/5]">
        
        <div 
          ref={captureRef} 
          className="w-full h-full bg-[#DCCFCF] rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 text-center border-4 border-white"
        >
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 shadow-inner">
             <span className="text-4xl">🐾</span>
          </div>
          <h3 className="text-3xl font-serif text-stone-900 mb-4">Gavgav Spa</h3>
          <p className="text-stone-600 font-medium">Bu kart birazdan yüzlerce parçaya ayrılıp toza dönüşecek!</p>
        </div>

      </div>

    </section>
  );
}