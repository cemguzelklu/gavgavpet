"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react"; 
import { toast } from "sonner"; 
import { getAdminStats } from "@/app/admin/actions"; 

export default function NotificationListener() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // State tanımları
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  // 1. BAŞLANGIÇ AYARLARI (Initial Setup)
  useEffect(() => {
    // Ses dosyasını hafızaya al
    audioRef.current = new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3");
    audioRef.current.load();

    // İZİN KONTROLÜ
    // setTimeout kullanarak işlemi bir sonraki döngüye atıyoruz.
    // Bu sayede "Synchronous setState" hatası çözülüyor.
    const timer = setTimeout(() => {
      const storedPermission = localStorage.getItem("GavgavAdminSound");
      const browserPermission = typeof Notification !== "undefined" && Notification.permission === "granted";

      if (storedPermission === "true" || browserPermission) {
        setHasPermission(true);
        setAudioReady(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // 2. PERİYODİK KONTROL (Her 10 saniyede bir)
  useEffect(() => {
    // İzin yoksa kontrol etme
    if (!hasPermission) return;

    const checkNewData = async () => {
      try {
        const stats = await getAdminStats();
        
        // Mevcut toplam (Okunmamış + Bekleyen)
        const currentTotal = stats.unreadMessages + stats.pendingAppointments;
        
        // Eğer yeni bir artış varsa (Bildiğimizden daha fazlaysa)
        if (currentTotal > lastMessageCount) {
          
          // A) SES ÇAL
          if (audioReady && audioRef.current) {
            audioRef.current.currentTime = 0; 
            // Kullanıcı etkileşimi yoksa tarayıcı engelleyebilir, hatayı yutuyoruz
            audioRef.current.play().catch(() => {});
          }
          
          // B) GÖRSEL BİLDİRİM
          toast("🔔 Yeni Talep Var!", {
            description: "Admin panelini kontrol edin.",
            duration: 5000,
            action: {
              label: "Tamam",
              onClick: () => console.log("Görüldü"),
            },
          });
        }

        // Sayacı güncelle
        // Sayfa ilk açıldığında (0 iken) bildirim ötmesin diye sadece sayıyı eşitliyoruz
        setLastMessageCount(currentTotal);

      } catch (error) {
        console.error("Kontrol hatası:", error);
      }
    };

    // İlk kontrol
    checkNewData();

    // Döngü
    const interval = setInterval(checkNewData, 10000); 
    return () => clearInterval(interval);
  }, [hasPermission, audioReady, lastMessageCount]); // lastMessageCount bağımlılığını ekledik

  // 3. KULLANICI İZNİ AÇMA FONKSİYONU
  const enableAudio = () => {
    setHasPermission(true);
    setAudioReady(true);
    localStorage.setItem("GavgavAdminSound", "true"); 
    
    // Tarayıcı bildirimi izni
    if (typeof Notification !== "undefined" && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    // Kilidi açmak için boş bir çalma yap
    audioRef.current?.play().catch(() => {});
    toast.success("Bildirimler Açıldı", { description: "Sipariş gelince sesli uyarı alacaksınız." });
  };

  // İzin varsa hiçbir şey gösterme (Arkada çalışsın)
  if (hasPermission) return null;

  // İzin yoksa sağ altta butonu göster
  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-stone-900 text-white p-4 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-4 max-w-xs">
        <div className="bg-stone-800 p-2 rounded-full animate-pulse">
             <Volume2 className="w-5 h-5 text-green-400" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm">Sesli Uyarı</p>
          <p className="text-[10px] text-stone-400 leading-tight mt-1">Sipariş gelince haber verelim mi?</p>
        </div>
        <button 
          onClick={enableAudio}
          className="bg-white text-black px-4 py-2 text-xs font-bold rounded-lg hover:bg-stone-200 transition-colors shadow-sm whitespace-nowrap"
        >
          AÇ
        </button>
      </div>
    </div>
  );
}