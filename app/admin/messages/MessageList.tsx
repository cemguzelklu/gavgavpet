"use client";

import { useState } from "react";
import { deleteMessage, toggleMessageReadStatus } from "@/app/admin/actions"; // Yeni fonksiyonu import ettik
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
      <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-dashed border-stone-300 text-center">
        <div className="bg-stone-100 p-6 rounded-full mb-4">
            <Mail className="w-8 h-8 text-stone-400" />
        </div>
        <h3 className="text-xl font-serif font-bold text-stone-700">Kutu Boş</h3>
        <p className="text-stone-500 text-sm">Henüz okunmamış veya yeni bir mesaj yok.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
                /* Okunmuşsa soldaki turuncu çizgi gider ama hizası bozulmasın diye padding eklenir */
            `}
          >
            {/* --- ÜST KISIM --- */}
            <div 
                onClick={() => toggleItem(msg.id)}
                className="p-5 flex flex-col md:flex-row md:items-center justify-start gap-4 md:gap-8 cursor-pointer select-none relative"
            >
                {/* 1. GRUP: İKON VE GÖNDEREN */}
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full flex-shrink-0 transition-colors ${!msg.isRead ? "bg-orange-100 text-orange-600" : "bg-stone-100 text-stone-400"}`}>
                        {!msg.isRead ? <Mail className="w-5 h-5 animate-pulse" /> : <MailOpen className="w-5 h-5" />}
                    </div>

                    <div>
                        <h3 className={`font-serif text-lg font-bold ${!msg.isRead ? "text-stone-900" : "text-stone-500 line-through decoration-stone-300"}`}>
                            {msg.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-stone-400">
                            {msg.subject || "Konusuz"}
                        </div>
                    </div>
                </div>

                {/* AYIRAÇ */}
                <div className="hidden md:block w-px h-8 bg-stone-200"></div>

                {/* 2. GRUP: TARİH */}
                <div className="flex items-center gap-3 pl-14 md:pl-0">
                     <div className="p-1.5 bg-stone-100 rounded text-stone-400">
                        <Clock className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Tarih</div>
                        <div className="text-sm font-medium text-stone-500">{createdDate}</div>
                    </div>
                </div>

                {/* OK İŞARETİ */}
                <div className={`ml-auto text-stone-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </div>

            {/* --- ALT KISIM (DETAY + BUTONLAR) --- */}
            <div className={`
                bg-stone-50/50 border-t border-stone-100 px-5 transition-all duration-300 ease-in-out
                ${isOpen ? "max-h-[600px] py-8 opacity-100" : "max-h-0 py-0 opacity-0"}
            `}>
                <div className="flex flex-col gap-6">
                    
                    {/* İletişim Bilgileri */}
                    <div className="flex flex-wrap gap-6 text-sm text-stone-600">
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                            <User className="w-4 h-4 text-stone-400" />
                            <span className="font-bold">{msg.name}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                            <AtSign className="w-4 h-4 text-stone-400" />
                            <a href={`mailto:${msg.email}`} className="hover:text-black hover:underline">
                                {msg.email}
                            </a>
                        </div>
                    </div>

                    {/* Mesaj İçeriği */}
                    <div className="bg-white p-6 rounded-2xl border border-stone-200 text-stone-700 leading-relaxed relative shadow-sm">
                        <MessageSquare className="w-5 h-5 absolute top-6 left-6 text-stone-300" />
                        <p className="pl-8 whitespace-pre-wrap">{msg.message}</p>
                    </div>

                    {/* --- AKSİYON BUTONLARI --- */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        
                        {/* 1. OKUNDU / OKUNMADI BUTONU */}
                        <form action={toggleMessageReadStatus.bind(null, msg.id, msg.isRead)}>
                            <Button 
                                variant={msg.isRead ? "outline" : "default"}
                                className={`
                                    h-10 px-6 gap-2 font-bold tracking-wider uppercase text-xs rounded-xl transition-all
                                    ${!msg.isRead ? "bg-stone-900 hover:bg-black text-white shadow-lg shadow-stone-900/20" : "border-stone-300 text-stone-500 hover:bg-white hover:text-stone-800"}
                                `}
                            >
                                {msg.isRead ? (
                                    <>
                                        <Mail className="w-4 h-4" /> Okunmadı İşaretle
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" /> Okundu İşaretle
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* 2. SİL BUTONU */}
                        <form action={deleteMessage.bind(null, msg.id)}>
                             <Button 
                                variant="ghost"
                                className="h-10 px-4 text-red-400 hover:text-red-600 hover:bg-red-50 font-bold tracking-wider uppercase text-xs rounded-xl gap-2"
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