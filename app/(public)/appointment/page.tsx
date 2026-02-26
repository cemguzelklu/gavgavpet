"use client";

// DÜZELTME: Yol hatasını önlemek için '@' kullanıyoruz
import { createAppointment } from "@/app/actions"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Star, ChevronLeft, ChevronRight, Calendar as CalendarIcon, PawPrint } from "lucide-react";
import { useRef, useState, useEffect } from "react";

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

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

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
    days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected = selectedDate && parseInt(selectedDate.split('-')[2]) === d && 
                       parseInt(selectedDate.split('-')[1]) === currentDate.getMonth() + 1 &&
                       parseInt(selectedDate.split('-')[0]) === currentDate.getFullYear();

    days.push(
      <button
        key={d}
        type="button"
        onClick={() => handleDayClick(d)}
        className={`h-10 w-10 text-sm font-serif flex items-center justify-center transition-all duration-200 border border-transparent
          ${isSelected 
            ? "bg-black text-white" 
            : "text-stone-600 hover:border-black hover:text-black"}
        `}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="relative w-full group">
      <input type="hidden" name="date" value={selectedDate || ""} required />
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer bg-transparent border-0 border-b border-stone-300 py-4 flex items-center justify-between group-hover:border-black transition-colors"
      >
        <span className={`text-lg font-serif ${selectedDate ? "text-black" : "text-stone-400 text-xs tracking-[0.2em] font-bold uppercase"}`}>
          {selectedDate ? selectedDate.split('-').reverse().join('.') : "TERCİH EDİLEN TARİH"}
        </span>
        <CalendarIcon className={`w-4 h-4 transition-colors ${selectedDate ? "text-black" : "text-stone-400 group-hover:text-black"}`} />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-[#FDFBF7] border border-black z-50 p-6 shadow-2xl min-w-[320px] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-serif font-light text-black">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <div className="flex gap-2">
              <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 mb-2">
            {["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pa"].map(day => (
              <div key={day} className="h-10 w-10 flex items-center justify-center text-[10px] font-bold tracking-widest text-stone-400 uppercase">
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

// --- ANA SAYFA ---
export default function AppointmentPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [paws, setPaws] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  // --- RASTGELE PATİ ÜRETİMİ ---
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

    const timer = setTimeout(() => {
      setPaws(generateNonOverlappingPaws(25)); 
    }, 0);

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
      
      {/* --- ARKA PLAN PATİ DESENİ --- */}
      <div className="absolute inset-0 pointer-events-none -z-0 w-full h-full overflow-hidden">
        {paws.map((paw) => (
          <PawPrint
            key={paw.id}
            className="absolute text-[#C08282]" 
            style={paw.style}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-start w-full relative z-10">
        
        {/* --- SOL PANEL: VİDEO --- */}
        <div className="relative w-full h-[40vh] lg:h-screen lg:sticky lg:top-0 bg-stone-900 overflow-hidden order-1 shadow-2xl z-0">
          
            <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    poster="/kopekvideooo.png" // 👈 Burayı ekledik
    className="absolute inset-0 w-full h-full object-cover opacity-80"
>
    <source src="/kopekvideooo.mp4" type="video/mp4" />
</video>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 p-8 lg:p-16 lg:pt-40 flex flex-col justify-between z-10 pointer-events-none">
                <div className="text-white/80 text-[10px] font-bold tracking-[0.4em] uppercase">
                    GavgavPet Reservation
                </div>
                <div className="text-white">
                    <h2 className="text-3xl lg:text-6xl font-serif leading-none mb-3">Time for <br/> a Treat.</h2>
                    <p className="text-white/70 text-xs tracking-widest uppercase font-bold">Exclusive Care</p>
                </div>
            </div>
        </div>

        {/* --- SAĞ PANEL: RANDEVU FORMU --- */}
        <div className="bg-transparent w-full flex flex-col justify-center order-2 relative z-10 lg:pt-32 lg:pb-32">
            <div className="px-6 py-16 lg:p-24 w-full max-w-xl mx-auto">
                
                <div className="mb-16 border-b border-black/10 pb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-3 h-3 text-black fill-black animate-pulse" />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">
                            Booking
                        </span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-serif text-black leading-tight">
                        Make a <br/> Reservation.
                    </h1>
                </div>

                <form ref={formRef} action={handleSubmit} className="space-y-16 mb-20">
                    
                    <div className="space-y-8">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 block border-b border-stone-200 pb-2">
                            01 / Personal Details
                        </span>
                        <div className="grid grid-cols-1 gap-8">
                            <div className="group">
                                <Input name="ownerName" required placeholder="İSİM SOYİSİM" className="bg-transparent border-0 border-b border-stone-300 rounded-none px-0 py-4 h-auto text-lg font-serif placeholder:text-stone-400 placeholder:text-xs placeholder:tracking-[0.2em] focus-visible:ring-0 focus-visible:border-black transition-all" />
                            </div>
                            <div className="group">
                                <Input name="phone" required type="tel" placeholder="TELEFON NUMARASI" className="bg-transparent border-0 border-b border-stone-300 rounded-none px-0 py-4 h-auto text-lg font-serif placeholder:text-stone-400 placeholder:text-xs placeholder:tracking-[0.2em] focus-visible:ring-0 focus-visible:border-black transition-all" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 block border-b border-stone-200 pb-2">
                            02 / The Guest (Pet)
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <Input name="petName" required placeholder="DOSTUMUZUN ADI" className="bg-transparent border-0 border-b border-stone-300 rounded-none px-0 py-4 h-auto text-lg font-serif placeholder:text-stone-400 placeholder:text-xs placeholder:tracking-[0.2em] focus-visible:ring-0 focus-visible:border-black transition-all" />
                            </div>
                            <div className="group">
                                <Input name="petBreed" required placeholder="IRKI / CİNSİ" className="bg-transparent border-0 border-b border-stone-300 rounded-none px-0 py-4 h-auto text-lg font-serif placeholder:text-stone-400 placeholder:text-xs placeholder:tracking-[0.2em] focus-visible:ring-0 focus-visible:border-black transition-all" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 block border-b border-stone-200 pb-2">
                            03 / Date & Details
                        </span>
                        
                        <div className="group relative">
                            <CustomDatePicker onSelect={(date) => console.log(date)} />
                        </div>

                        <div className="group">
                            <Textarea name="notes" placeholder="EKLEMEK İSTEDİKLERİNİZ (OPSİYONEL)..." className="bg-transparent border-0 border-b border-stone-300 rounded-none px-0 py-4 min-h-[80px] resize-none text-lg font-serif placeholder:text-stone-400 placeholder:text-xs placeholder:tracking-[0.2em] focus-visible:ring-0 focus-visible:border-black transition-all shadow-none" />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button 
                            type="submit" 
                            disabled={loading || success}
                            className={`w-full rounded-none h-16 text-xs tracking-[0.3em] uppercase transition-all duration-500 ease-out flex items-center justify-between px-8 group
                                ${success ? "bg-stone-900 text-white cursor-default" : "bg-black text-white hover:bg-stone-800"}
                            `}
                        >
                            {success ? (
                                <div className="flex items-center justify-between w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <span>RANDEVU TALEBİ ALINDI</span>
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                            ) : (
                                <>
                                    {loading ? "İŞLENİYOR..." : "RANDEVU OLUŞTUR"} 
                                    {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                </>
                            )}
                        </Button>
                    </div>

                </form>

            </div>
        </div>

      </div>
    </main>
  );
}