"use client";

import { createContactMessage } from "../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Instagram, ArrowRight, Check, MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
        await createContactMessage(formData);
        formRef.current?.reset();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
        alert("Bir hata oluştu.");
    } finally {
        setLoading(false);
    }
  }

  return (
    // NAVBAR PAYI: pt-[100px]
    <main className="bg-[#FDFBF7] min-h-screen w-full pt-[100px] flex flex-col">
      
      {/* BAŞLIK ALANI (Border-b ile ayrılmış) */}
      <div className="w-full px-6 py-12 lg:px-12 border-b border-black">
          <h1 className="text-6xl lg:text-9xl font-serif text-black leading-none tracking-tighter">
              CONTACT
          </h1>
          <div className="flex justify-between items-end mt-4">
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-black block">
                  GavGavPet Atelier — Est. 2024
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-black hidden md:block">
                  Scroll Down
              </span>
          </div>
      </div>

      {/* ANA GRID: SOL (FORM) - SAĞ (BİLGİ & HARİTA) */}
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-[55%_45%]">
        
        {/* --- SOL PANEL: FORM --- */}
        <div className="border-r border-black p-6 lg:p-24 flex flex-col justify-center order-2 lg:order-1">
            
            <div className="mb-12">
                <p className="text-xl font-serif text-black max-w-md">
                    Bize ulaşın. Randevu talepleri, iş birlikleri veya sadece bir merhaba için formu doldurun.
                </p>
            </div>

            <form ref={formRef} action={handleSubmit} className="space-y-12">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">İsim Soyisim</label>
                        <Input 
                            name="name" 
                            required 
                            className="bg-transparent border-0 border-b border-black rounded-none px-0 py-2 h-auto text-lg font-serif placeholder:text-black/30 focus-visible:ring-0 focus-visible:border-black/50 transition-all" 
                        />
                    </div>
                    <div className="group relative">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">E-Posta</label>
                        <Input 
                            name="email" 
                            type="email" 
                            required 
                            className="bg-transparent border-0 border-b border-black rounded-none px-0 py-2 h-auto text-lg font-serif placeholder:text-black/30 focus-visible:ring-0 focus-visible:border-black/50 transition-all" 
                        />
                    </div>
                </div>

                <div className="group relative">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">Konu</label>
                    <Input 
                        name="subject" 
                        className="bg-transparent border-0 border-b border-black rounded-none px-0 py-2 h-auto text-lg font-serif placeholder:text-black/30 focus-visible:ring-0 focus-visible:border-black/50 transition-all" 
                    />
                </div>

                <div className="group relative">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">Mesajınız</label>
                    <Textarea 
                        name="message" 
                        required 
                        className="bg-transparent border-0 border-b border-black rounded-none px-0 py-2 min-h-[100px] resize-none text-lg font-serif placeholder:text-black/30 focus-visible:ring-0 focus-visible:border-black/50 transition-all shadow-none" 
                    />
                </div>

                {/* DÜZELTME BURADA: Buton Stili */}
                <Button 
                    type="submit" 
                    disabled={loading || success}
                    className={`w-full md:w-auto rounded-none h-16 px-12 text-xs tracking-[0.3em] uppercase transition-all duration-300 border border-black
                        ${success 
                            ? "bg-black text-white cursor-default" // Başarılıysa Siyah Zemin / Beyaz Yazı
                            : "bg-transparent text-black hover:!bg-black hover:!text-white" // Normalse Şeffaf Zemin / Siyah Yazı -> Hover: Siyah Zemin / Beyaz Yazı
                        }
                    `}
                >
                    {success ? (
                        <div className="flex items-center gap-4">
                            <span>GÖNDERİLDİ</span>
                            <Check className="w-4 h-4" />
                        </div>
                    ) : (
                        <>
                            {loading ? "GÖNDERİLİYOR..." : "MESAJI GÖNDER"} 
                        </>
                    )}
                </Button>

            </form>
        </div>


        {/* --- SAĞ PANEL: INFO BLOKLARI & HARİTA --- */}
        <div className="flex flex-col order-1 lg:order-2">
            
            {/* INFO GRID (4 Kare) */}
            <div className="grid grid-cols-2 border-b border-black">
                
                {/* Telefon */}
                <a href="tel:+905368994374" className="border-r border-black border-b border-black lg:border-b-0 p-8 lg:p-12 hover:bg-black hover:text-white transition-all duration-500 group flex flex-col justify-between h-48 lg:h-64">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Phone</span>
                        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="text-lg lg:text-2xl font-serif">+90 536 899 43 74</span>
                </a>

                {/* Mail */}
                <a href="mailto:gavgavpetkuafor@gmail.com" className="p-8 lg:p-12 border-b border-black lg:border-b-0 hover:bg-black hover:text-white transition-all duration-500 group flex flex-col justify-between h-48 lg:h-64">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Email</span>
                        <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="text-lg lg:text-xl font-serif break-all">gavgavpetkuafor@gmail.com</span>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/905368994374" target="_blank" className="border-r border-black p-8 lg:p-12 hover:bg-black hover:text-white transition-all duration-500 group flex flex-col justify-between h-48 lg:h-64">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">WhatsApp</span>
                        <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="text-lg lg:text-2xl font-serif">Chat With Us</span>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/gavgavpet_kuafor" target="_blank" className="p-8 lg:p-12 hover:bg-black hover:text-white transition-all duration-500 group flex flex-col justify-between h-48 lg:h-64">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Instagram</span>
                        <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="text-lg lg:text-2xl font-serif">@gavgavpet_kuafor</span>
                </a>
            </div>

            {/* HARİTA ALANI */}
            <div className="flex-1 relative min-h-[400px] border-b border-black lg:border-b-0">
                {/* Adres Barı */}
                <div className="absolute top-0 left-0 bg-[#FDFBF7] border-r border-b border-black p-4 z-10 max-w-[80%]">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-1" />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-1">Stüdyo Adresi</p>
                            <p className="text-sm font-serif leading-relaxed text-stone-600">
                                Maslak 1453 Sitesi, T4b Blok <br/>
                                -4. Kat, No: 213 <br/>
                                34398 Sarıyer / İstanbul
                            </p>
                        </div>
                    </div>
                </div>

                {/* Google Maps Embed */}
                <iframe 
                    src="https://maps.google.com/maps?q=41.11883153649000,29.00736706441791&z=15&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: "grayscale(100%)" }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                ></iframe>
            </div>

        </div>

      </div>
    </main>
  );
}