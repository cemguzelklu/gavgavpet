"use client";

import { useState } from "react";
import { deleteAppointment, toggleAppointmentStatus } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Phone, PawPrint, FileText, CheckCircle2, 
  Trash2, Clock, ChevronDown, History 
} from "lucide-react";

type AppointmentProps = {
  id: string;
  ownerName: string;
  phone: string;
  petName: string;
  petBreed: string;
  date: string;
  notes: string | null;
  status: string;
  createdAt: Date;
};

export default function AppointmentList({ appointments }: { appointments: AppointmentProps[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-white/50 rounded-3xl border border-dashed border-stone-300 text-center px-4">
        <div className="bg-stone-100 p-5 sm:p-6 rounded-full mb-4">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-stone-400" />
        </div>
        <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-700">Liste Boş</h3>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">Henüz bir randevu talebi yok.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {appointments.map((app) => {
        const isOpen = openId === app.id;
        
        let displayStatus = app.status;
        if (app.status === "Bekliyor") displayStatus = "Talep Bekliyor";
        if (app.status === "Onaylandı") displayStatus = "Talep İncelendi";
        const isDone = displayStatus === "Talep İncelendi";

        const createdDate = new Date(app.createdAt).toLocaleDateString("tr-TR", {
           day: "numeric", month: "long", hour: "2-digit", minute: "2-digit"
        });

        let reqDateDisplay = app.date;
        try {
            const d = new Date(app.date);
            if(!isNaN(d.getTime())) {
                reqDateDisplay = d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
            }
        } catch (e) {}

        return (
          <div 
            key={app.id}
            className={`
                group overflow-hidden rounded-2xl border transition-all duration-300
                ${isDone 
                    ? "bg-stone-100 border-stone-200 opacity-75 hover:opacity-100" 
                    : "bg-white border-stone-200 shadow-sm hover:shadow-md hover:border-stone-400"
                }
            `}
          >
            {/* --- ÜST KISIM --- */}
            <div 
                onClick={() => toggleItem(app.id)}
                className="p-4 sm:p-5 pr-12 md:pr-5 flex flex-col md:flex-row md:items-center justify-start gap-3 sm:gap-4 md:gap-8 cursor-pointer select-none relative"
            >
                {/* OK İŞARETİ (Mobilde sağ üste sabit, md'de kendi akışında) */}
                <div className={`absolute top-5 right-4 md:relative md:top-auto md:right-auto md:ml-auto text-stone-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>

                {/* 1. GRUP: DURUM, İSİM ve PET */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-2.5 sm:p-3 rounded-full flex-shrink-0 transition-colors ${isDone ? "bg-stone-200 text-stone-500" : "bg-orange-100 text-orange-600"}`}>
                        {isDone ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />}
                    </div>

                    <div>
                        <h3 className={`font-serif text-base sm:text-lg font-bold ${isDone ? "text-stone-600" : "text-stone-900"}`}>
                            {app.ownerName}
                        </h3>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-stone-400">
                            <PawPrint className="w-3 h-3" />
                            <span>{app.petName}</span>
                        </div>
                    </div>
                </div>

                {/* AYIRAÇ */}
                <div className="hidden md:block w-px h-8 bg-stone-200"></div>

                {/* 2. GRUP: TARİHLER (SOLA HİZALI) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 pl-12 sm:pl-14 md:pl-0 mt-1 md:mt-0">
                    
                    {/* A) İSTENEN TARİH */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="p-1.5 bg-stone-100 rounded text-stone-400 shrink-0">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div>
                            <div className="text-[9px] sm:text-[10px] font-bold text-stone-400 uppercase tracking-wider">İstenen Tarih</div>
                            <div className="text-xs sm:text-sm font-bold text-stone-800">{reqDateDisplay}</div>
                        </div>
                    </div>

                    {/* B) OLUŞTURULMA TARİHİ */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                         <div className="p-1.5 bg-stone-100 rounded text-stone-400 shrink-0">
                            <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div>
                            <div className="text-[9px] sm:text-[10px] font-bold text-stone-400 uppercase tracking-wider">Oluşturuldu</div>
                            <div className="text-xs sm:text-sm font-medium text-stone-500">{createdDate}</div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- ALT KISIM (DETAYLAR) --- */}
            {/* İçerik mobilde uzayabileceği için max-h-[800px] yapıldı */}
            <div className={`
                bg-stone-50/50 border-t border-stone-100 px-4 sm:px-5 transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen ? "max-h-[800px] py-5 sm:py-6 opacity-100" : "max-h-0 py-0 opacity-0"}
            `}>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    
                    <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-stone-600 pl-1 sm:pl-2">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                            <a href={`tel:${app.phone}`} className="hover:text-black hover:underline font-bold">
                                {app.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                             <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider">Irk:</span>
                             <span>{app.petBreed}</span>
                        </div>
                        
                        {/* Notlar */}
                        {app.notes && (
                            <div className="bg-white p-3 rounded-lg border border-stone-200 italic text-stone-500 mt-2 flex gap-2 shadow-sm">
                                <FileText className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <p className="leading-relaxed">&quot;{app.notes}&quot;</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center gap-2 sm:gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-stone-200 md:pl-8">
                        <form action={toggleAppointmentStatus.bind(null, app.id, displayStatus)} className="w-full">
                            <Button 
                                variant={isDone ? "outline" : "default"}
                                className={`w-full justify-center gap-2 font-bold tracking-wider uppercase text-[10px] sm:text-xs h-10 sm:h-12 rounded-xl ${!isDone && "bg-black hover:bg-stone-800"}`}
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                {isDone ? "Beklemeye Al" : "Tamamlandı İşaretle"}
                            </Button>
                        </form>

                        <form action={deleteAppointment.bind(null, app.id)} className="w-full">
                             <Button 
                                variant="ghost"
                                className="w-full justify-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 font-bold tracking-wider uppercase text-[10px] sm:text-xs h-10 sm:h-12 rounded-xl"
                            >
                                <Trash2 className="w-4 h-4" />
                                Sil
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}