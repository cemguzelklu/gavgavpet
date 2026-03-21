"use client";

import { createAppointment } from "@/app/actions"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Star, ChevronLeft, ChevronRight, Calendar as CalendarIcon, PawPrint } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Footer from "@/components/Footer";
import LocationFooterBox from "@/components/LocationFooterBox";

// --- ÖZEL TAKVİM BİLEŞENİ ---
const CustomDatePicker = ({ onSelect }: { onSelect: (date: string) => void }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDayClick = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setSelectedDate(formattedDate);
    onSelect(formattedDate);
    setIsOpen(false);
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected = selectedDate &&
      parseInt(selectedDate.split('-')[2]) === d &&
      parseInt(selectedDate.split('-')[1]) === currentDate.getMonth() + 1 &&
      parseInt(selectedDate.split('-')[0]) === currentDate.getFullYear();

    days.push(
      <button
        key={d}
        type="button"
        onClick={() => handleDayClick(d)}
        className={`h-9 w-9 text-sm font-sans flex items-center justify-center transition-all duration-150
          ${isSelected
            ? "bg-black text-white"
            : "text-stone-600 hover:text-black hover:bg-stone-100"
          }`}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="relative w-full">
      <input type="hidden" name="date" value={selectedDate || ""} required />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer w-full bg-transparent border-0 border-b px-0 py-4 flex items-center justify-between transition-all duration-300
          ${isOpen ? "border-black" : "border-stone-200 hover:border-stone-500"}`}
      >
        <span className={`font-serif text-base ${selectedDate ? "text-black" : "text-stone-400 font-sans text-xs tracking-[0.2em] uppercase"}`}>
          {selectedDate ? selectedDate.split('-').reverse().join('.') : "Tarih Seçin"}
        </span>
        <CalendarIcon className={`w-4 h-4 transition-colors ${selectedDate ? "text-black" : "text-stone-400"}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-[#FDFBF7] border border-black z-50 p-6 shadow-2xl w-full min-w-[300px] animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between mb-6">
            <span className="font-serif text-lg text-black">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <div className="flex gap-1">
              <button type="button" onClick={handlePrevMonth} className="p-1.5 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" onClick={handleNextMonth} className="p-1.5 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 mb-2">
            {["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pa"].map(day => (
              <div key={day} className="h-9 w-9 flex items-center justify-center font-sans text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {days}
          </div>
        </div>
      )}
    </div>
  );
};

// --- FORM ALAN BİLEŞENİ ---
const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <label className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">
      {label}
    </label>
    {children}
  </div>
);

const inputClass = "bg-transparent border-0 border-b border-stone-200 rounded-none px-0 py-4 h-auto font-serif text-base text-black placeholder:font-sans placeholder:text-xs placeholder:tracking-[0.2em] placeholder:uppercase placeholder:text-stone-400 focus-visible:ring-0 focus-visible:border-black transition-all duration-300 shadow-none";

// --- ANA SAYFA ---
export default function AppointmentPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paws, setPaws] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const generateNonOverlappingPaws = (count: number) => {
      const generated: { id: number; x: number; y: number; style: React.CSSProperties }[] = [];
      let attempts = 0;
      while (generated.length < count && attempts < 1000) {
        attempts++;
        const x = 2 + Math.random() * 96;
        const y = 2 + Math.random() * 96;
        const isOverlapping = generated.some(p => Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2)) < 10);
        if (!isOverlapping) {
          generated.push({
            id: attempts, x, y,
            style: {
              top: `${y}%`, left: `${x}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.03 + Math.random() * 0.05,
              width: `${20 + Math.random() * 40}px`, height: "auto",
            }
          });
        }
      }
      return generated;
    };
    const timer = setTimeout(() => setPaws(generateNonOverlappingPaws(25)), 0);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await createAppointment(formData);
      formRef.current?.reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#FDFBF7] min-h-screen w-full relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none -z-0 w-full h-full overflow-hidden">
        {paws.map((paw) => (
          <PawPrint key={paw.id} className="absolute text-[#C08282]" style={paw.style} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-start w-full relative z-10">

        {/* SOL — Video */}
        <div className="relative w-full h-[40vh] lg:h-screen lg:sticky lg:top-0 bg-[#FDFBF7] overflow-hidden order-1 shadow-2xl z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80">
            <source src="/kopekvideooo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 p-8 lg:p-16 lg:pt-40 flex flex-col justify-between z-10 pointer-events-none">
            <div className="text-white/80 text-[10px] font-bold tracking-[0.4em] uppercase">
              GavgavPet Reservation
            </div>
            <div className="text-white">
              <h2 className="text-3xl lg:text-6xl font-serif leading-none mb-3">Time for <br /> a Treat.</h2>
              <p className="text-white/70 text-xs tracking-widest uppercase font-bold">Exclusive Care</p>
            </div>
          </div>
        </div>

        {/* SAĞ — Form */}
        <div className="bg-transparent w-full order-2 relative z-10">
          <div className="px-6 py-12 lg:px-16 lg:py-20 w-full max-w-lg mx-auto">

            {/* Başlık */}
            <div className="mb-12 pb-8 border-b border-stone-200">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-3 h-3 text-[#C08282] fill-[#C08282]" />
                <span className="font-sans text-[10px] font-bold tracking-[0.35em] uppercase text-stone-400">
                  Online Rezervasyon
                </span>
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl text-black leading-tight mb-3">
                Randevu<br />Oluştur.
              </h1>
              <p className="font-sans text-sm text-stone-400 leading-relaxed">
                Formu doldurun, en kısa sürede sizi arayalım.
              </p>
            </div>

            <form ref={formRef} action={handleSubmit} className="flex flex-col gap-10">

              {/* Bölüm 1 */}
              <div className="flex flex-col gap-6">
                <span className="font-sans text-[10px] font-bold tracking-[0.35em] uppercase text-stone-400 flex items-center gap-3">
                  <span className="text-black">01</span> Kişisel Bilgiler
                </span>
                <FormField label="İsim Soyisim">
                  <Input name="ownerName" required placeholder="Adınız Soyadınız" className={inputClass} />
                </FormField>
                <FormField label="Telefon Numarası">
                  <Input name="phone" required type="tel" placeholder="+90 5xx xxx xx xx" className={inputClass} />
                </FormField>
              </div>

              {/* Bölüm 2 */}
              <div className="flex flex-col gap-6">
                <span className="font-sans text-[10px] font-bold tracking-[0.35em] uppercase text-stone-400 flex items-center gap-3">
                  <span className="text-black">02</span> Dostunuz Hakkında
                </span>
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Adı">
                    <Input name="petName" required placeholder="Örn: Paşa" className={inputClass} />
                  </FormField>
                  <FormField label="Irkı / Cinsi">
                    <Input name="petBreed" required placeholder="Örn: Poodle" className={inputClass} />
                  </FormField>
                </div>
              </div>

              {/* Bölüm 3 */}
              <div className="flex flex-col gap-6">
                <span className="font-sans text-[10px] font-bold tracking-[0.35em] uppercase text-stone-400 flex items-center gap-3">
                  <span className="text-black">03</span> Tarih & Notlar
                </span>
                <FormField label="Tercih Edilen Tarih">
                  <CustomDatePicker onSelect={(date) => console.log(date)} />
                </FormField>
                <FormField label="Eklemek İstedikleriniz (Opsiyonel)">
                  <Textarea
                    name="notes"
                    placeholder="Özel istekleriniz veya dostunuz hakkında notlar..."
                    className={`${inputClass} min-h-[100px] resize-none`}
                  />
                </FormField>
              </div>

              {/* Gönder */}
              <div className="flex flex-col gap-4 pt-2">
                <Button
                  type="submit"
                  disabled={loading || success}
                  className={`w-full rounded-none h-14 font-sans text-xs tracking-[0.3em] uppercase transition-all duration-500 flex items-center justify-between px-8 group
                    ${success ? "bg-stone-800 text-white cursor-default" : "bg-black text-white hover:bg-stone-800"}`}
                >
                  {success ? (
                    <div className="flex items-center justify-between w-full">
                      <span>Randevu Talebiniz Alındı</span>
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <>
                      <span>{loading ? "Gönderiliyor..." : "Randevu Oluştur"}</span>
                      {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </>
                  )}
                </Button>
                <p className="font-sans text-xs text-stone-400 text-center leading-relaxed">
                  Talebiniz alındıktan sonra sizi telefonla arayarak onaylayacağız.
                </p>
              </div>

            </form>
          </div>
        </div>

      </div>

      <LocationFooterBox />
      <Footer />
    </main>
  );
}