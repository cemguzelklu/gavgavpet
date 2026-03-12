"use client";

import { useState } from "react";
import { deleteMessage, toggleMessageReadStatus } from "@/app/admin/actions"; 
import { Button } from "@/components/ui/button";
import { 
  Mail, Trash2, Clock, ChevronDown, User, AtSign, MessageSquare, CheckCircle2, MailOpen 
} from "lucide-react";

type MessageProps = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

export default function MessageList({ messages }: { messages: MessageProps[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-white/50 rounded-3xl border border-dashed border-stone-300 text-center px-4">
        <div className="bg-stone-100 p-5 sm:p-6 rounded-full mb-4">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-stone-400" />
        </div>
        <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-700">Kutu Boş</h3>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">Henüz okunmamış veya yeni bir mesaj yok.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {messages.map((msg) => {
        const isOpen = openId === msg.id;
        
        const createdDate = new Date(msg.createdAt).toLocaleDateString("tr-TR", {
           day: "numeric", month: "long", hour: "2-digit", minute: "2-digit"
        });

        return (
          <div 
            key={msg.id}
            className={`
                group overflow-hidden rounded-2xl border transition-all duration-300
                ${isOpen 
                    ? "bg-white border-stone-300 shadow-md" 
                    : "bg-white border-stone-200 shadow-sm hover:border-stone-400"
                }
                ${!msg.isRead ? "border-l-4 border-l-orange-500" : "border-l-4 border-l-transparent pl-[calc(1.25rem+4px)]"} 
            `}
          >
            {/* --- ÜST KISIM --- */}
            <div 
                onClick={() => toggleItem(msg.id)}
                className="p-4 sm:p-5 pr-12 md:pr-5 flex flex-col md:flex-row md:items-center justify-start gap-3 sm:gap-4 md:gap-8 cursor-pointer select-none relative"
            >
                {/* OK İŞARETİ */}
                <div className={`absolute top-5 right-4 md:relative md:top-auto md:right-auto md:ml-auto text-stone-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>

                {/* 1. GRUP: İKON VE GÖNDEREN */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-2.5 sm:p-3 rounded-full flex-shrink-0 transition-colors ${!msg.isRead ? "bg-orange-100 text-orange-600" : "bg-stone-100 text-stone-400"}`}>
                        {!msg.isRead ? <Mail className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" /> : <MailOpen className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </div>

                    <div>
                        <h3 className={`font-serif text-base sm:text-lg font-bold ${!msg.isRead ? "text-stone-900" : "text-stone-500 line-through decoration-stone-300"}`}>
                            {msg.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-stone-400 mt-0.5">
                            {msg.subject || "Konusuz"}
                        </div>
                    </div>
                </div>

                {/* AYIRAÇ */}
                <div className="hidden md:block w-px h-8 bg-stone-200"></div>

                {/* 2. GRUP: TARİH */}
                <div className="flex items-center gap-2.5 sm:gap-3 pl-12 sm:pl-14 md:pl-0 mt-1 md:mt-0">
                     <div className="p-1.5 bg-stone-100 rounded text-stone-400 shrink-0">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                        <div className="text-[9px] sm:text-[10px] font-bold text-stone-400 uppercase tracking-wider">Tarih</div>
                        <div className="text-xs sm:text-sm font-medium text-stone-500">{createdDate}</div>
                    </div>
                </div>

            </div>

            {/* --- ALT KISIM (DETAY + BUTONLAR) --- */}
            {/* Uzun mesajları kapsayabilmesi için max-h-[1000px] yapıldı */}
            <div className={`
                bg-stone-50/50 border-t border-stone-100 px-4 sm:px-5 transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen ? "max-h-[1000px] py-5 sm:py-8 opacity-100" : "max-h-0 py-0 opacity-0"}
            `}>
                <div className="flex flex-col gap-4 sm:gap-6">
                    
                    {/* İletişim Bilgileri */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-stone-600">
                        <div className="flex items-center gap-2 bg-white px-3 py-2 sm:py-1.5 rounded-lg border border-stone-200">
                            <User className="w-4 h-4 text-stone-400 shrink-0" />
                            <span className="font-bold">{msg.name}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-3 py-2 sm:py-1.5 rounded-lg border border-stone-200 overflow-hidden">
                            <AtSign className="w-4 h-4 text-stone-400 shrink-0" />
                            {/* break-all: E-posta adresi uzunsa mobilde alt satıra geçsin */}
                            <a href={`mailto:${msg.email}`} className="hover:text-black hover:underline break-all">
                                {msg.email}
                            </a>
                        </div>
                    </div>

                    {/* Mesaj İçeriği */}
                    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 text-stone-700 leading-relaxed relative shadow-sm text-sm sm:text-base">
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 absolute top-4 sm:top-6 left-4 sm:left-6 text-stone-300" />
                        <p className="pl-6 sm:pl-8 whitespace-pre-wrap">{msg.message}</p>
                    </div>

                    {/* --- AKSİYON BUTONLARI --- */}
                    {/* Mobilde butonlar alt alta ve %100 genişlikte olsun */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-3 pt-2">
                        
                        <form action={toggleMessageReadStatus.bind(null, msg.id, msg.isRead)} className="w-full sm:w-auto">
                            <Button 
                                variant={msg.isRead ? "outline" : "default"}
                                className={`
                                    w-full sm:w-auto h-10 sm:h-12 px-6 gap-2 font-bold tracking-wider uppercase text-[10px] sm:text-xs rounded-xl transition-all
                                    ${!msg.isRead ? "bg-stone-900 hover:bg-black text-white shadow-lg shadow-stone-900/20" : "border-stone-300 text-stone-500 hover:bg-white hover:text-stone-800"}
                                `}
                            >
                                {msg.isRead ? (
                                    <>
                                        <Mail className="w-4 h-4 shrink-0" /> Okunmadı İşaretle
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-4 h-4 shrink-0" /> Okundu İşaretle
                                    </>
                                )}
                            </Button>
                        </form>

                        <form action={deleteMessage.bind(null, msg.id)} className="w-full sm:w-auto">
                             <Button 
                                variant="ghost"
                                className="w-full sm:w-auto h-10 sm:h-12 px-4 text-red-500 hover:text-red-700 hover:bg-red-50 font-bold tracking-wider uppercase text-[10px] sm:text-xs rounded-xl gap-2 border border-transparent hover:border-red-100"
                            >
                                <Trash2 className="w-4 h-4 shrink-0" />
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