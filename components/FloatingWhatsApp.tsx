import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  // WhatsApp numarası (Başında + olmadan ülke kodu ile)
  const phoneNumber = "905368994374";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      // STİL AÇIKLAMASI:
      // fixed bottom-8 right-8: Ekranın sağ altına sabitler.
      // z-[999]: Her şeyin (diğer butonların, footer'ın) üstünde durmasını sağlar.
      // bg-black text-white: Siyah zemin, beyaz ikon.
      // w-16 h-16: Butonun boyutu.
      // rounded-full: Tam yuvarlak (Premium his için). İstersen 'rounded-none' yapıp kare yapabiliriz.
      // shadow-2xl: Derinlik katarak havada duruyormuş hissi verir.
      // hover:... : Üzerine gelince hafifçe büyür ve rengi koyu griye döner.
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999] w-14 h-14 md:w-16 md:h-16 bg-black text-white flex items-center justify-center rounded-full shadow-2xl hover:bg-stone-800 hover:scale-105 transition-all duration-300 ease-out"
    >
      <MessageCircle size={28} strokeWidth={1.5} className="md:w-8 md:h-8" />
      
      {/* Opsiyonel: Butonun etrafında hafif bir "yayılma" efekti (canlılık katar) */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-black opacity-10 animate-ping -z-10"></span>
    </a>
  );
}