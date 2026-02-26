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
      <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-dashed border-stone-300 text-center">
        <div className="bg-stone-100 p-6 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-stone-400" />
        </div>
        <h3 className="text-xl font-serif font-bold text-stone-700">Liste Boş</h3>
        <p className="text-stone-500 text-sm">Henüz bir randevu talebi yok.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((app) => {
        const isOpen = openId === app.id;
        
        let displayStatus = app.status;
        if (app.status === "Bekliyor") displayStatus = "Talep Bekliyor";
        if (app.status === "Onaylandı") displayStatus = "Talep İncelendi";
        const isDone = displayStatus === "Talep İncelendi";

        // Oluşturulma Tarihi (Talep Ne Zaman Geldi?)
        const createdDate = new Date(app.createdAt).toLocaleDateString("tr-TR", {
           day: "numeric", month: "long", hour: "2-digit", minute: "2-digit"
        });

        // İstenen Tarih (Randevu Ne Zaman?)
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
                className="p-5 flex flex-col md:flex-row md:items-center justify-start gap-4 md:gap-8 cursor-pointer select-none relative"
            >
                {/* 1. GRUP: DURUM, İSİM ve PET */}
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full flex-shrink-0 transition-colors ${isDone ? "bg-stone-200 text-stone-500" : "bg-orange-100 text-orange-600"}`}>
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5 animate-pulse" />}
                    </div>

                    <div>
                        <h3 className={`font-serif text-lg font-bold ${isDone ? "text-stone-600" : "text-stone-900"}`}>
                            {app.ownerName}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-stone-400">
                            <PawPrint className="w-3 h-3" />
                            <span>{app.petName}</span>
                        </div>
                    </div>
                </div>

                {/* AYIRAÇ */}
                <div className="hidden md:block w-px h-8 bg-stone-200"></div>

                {/* 2. GRUP: TARİHLER (SOLA HİZALI) */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 pl-14 md:pl-0">
                    
                    {/* A) İSTENEN TARİH */}
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-stone-100 rounded text-stone-400">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">İstenen Tarih</div>
                            <div className="text-sm font-bold text-stone-800">{reqDateDisplay}</div>
                        </div>
                    </div>

                    {/* B) OLUŞTURULMA TARİHİ (Buraya ekledik) */}
                    <div className="flex items-center gap-3">
                         <div className="p-1.5 bg-stone-100 rounded text-stone-400">
                            <History className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Oluşturuldu</div>
                            <div className="text-sm font-medium text-stone-500">{createdDate}</div>
                        </div>
                    </div>

                </div>

                {/* 3. GRUP: OK İŞARETİ (EN SAĞDA) */}
                <div className={`ml-auto text-stone-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </div>

            {/* --- ALT KISIM (DETAYLAR) --- */}
            <div className={`
                bg-stone-50/50 border-t border-stone-100 px-5 transition-all duration-300 ease-in-out
                ${isOpen ? "max-h-[500px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"}
            `}>
                <div className="grid md:grid-cols-2 gap-8">
                    
                    <div className="space-y-4 text-sm text-stone-600 pl-2">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-stone-400" />
                            <a href={`tel:${app.phone}`} className="hover:text-black hover:underline font-bold">
                                {app.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                             <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Irk:</span>
                             <span>{app.petBreed}</span>
                        </div>
                        
                        {/* Notlar */}
                        {app.notes && (
                            <div className="bg-white p-3 rounded-lg border border-stone-200 italic text-stone-500 mt-2 flex gap-2">
                                <FileText className="w-4 h-4 flex-shrink-0 mt-1" />
                                <p>&quot;{app.notes}&quot;</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center gap-3 md:border-l border-stone-200 md:pl-8">
                        <form action={toggleAppointmentStatus.bind(null, app.id, displayStatus)}>
                            <Button 
                                variant={isDone ? "outline" : "default"}
                                className={`w-full justify-center gap-2 font-bold tracking-wider uppercase text-xs h-10 ${!isDone && "bg-black hover:bg-stone-800"}`}
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                {isDone ? "Beklemeye Al" : "Tamamlandı İşaretle"}
                            </Button>
                        </form>

                        <form action={deleteAppointment.bind(null, app.id)}>
                             <Button 
                                variant="ghost"
                                className="w-full justify-center gap-2 text-red-400 hover:text-red-600 hover:bg-red-50 font-bold tracking-wider uppercase text-xs h-10"
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