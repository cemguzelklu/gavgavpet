import Link from "next/link";
import { CalendarDays, MessageSquare, PlusCircle, Package, LayoutDashboard, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoutBtn from "./LogoutButton"; // Az önce oluşturduğumuz butonu import et

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      
      {/* SOL MENÜ (SIDEBAR) */}
      <aside className="w-72 bg-white border-r border-stone-200 flex flex-col min-h-screen flex-shrink-0 sticky top-0 h-screen overflow-y-auto z-50">
        
        {/* Logo / Başlık */}
        <div className="p-8 pb-8">
          <Link href="/admin" className="block group">
            <div className="flex items-center gap-2 mb-1">
                 <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight group-hover:opacity-80 transition-opacity">
                    Gavgav<span className="text-orange-600">.</span>
                 </h2>
            </div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Yönetim Paneli</p>
          </Link>
        </div>

        {/* Menü Linkleri */}
        <nav className="flex-1 px-6 space-y-8">
          {/* ... Diğer menü linklerin aynı kalıyor (Genel, İletişim, Mağaza vs.) ... */}
          {/* GRUP 0: GENEL */}
          <div>
             <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all group">
                <LayoutDashboard size={20} className="text-stone-400 group-hover:text-stone-900 transition-colors" />
                <span className="font-medium text-sm">Panel Özeti</span>
             </Link>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-stone-400 mb-3 px-4 tracking-widest">İletişim</div>
            <div className="space-y-1">
                <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all group">
                <CalendarDays size={20} className="text-stone-400 group-hover:text-orange-500 transition-colors" />
                <span className="font-medium text-sm">Randevular</span>
                </Link>
                <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all group">
                <MessageSquare size={20} className="text-stone-400 group-hover:text-blue-500 transition-colors" />
                <span className="font-medium text-sm">Mesajlar</span>
                </Link>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-stone-400 mb-3 px-4 tracking-widest">Mağaza</div>
            <div className="space-y-1">
                <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all group">
                <Package size={20} className="text-stone-400 group-hover:text-purple-500 transition-colors" />
                <span className="font-medium text-sm">Ürün Listesi</span>
                </Link>
                <Link href="/admin/products/new" className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-500 hover:text-white hover:bg-stone-900 transition-all group mt-2">
                <PlusCircle size={20} className="text-stone-400 group-hover:text-white transition-colors" />
                <span className="font-medium text-sm">Yeni Ürün Ekle</span>
                </Link>
            </div>
          </div>
        </nav>

        {/* --- ALT FOOTER ALANI (GÜNCELLENDİ) --- */}
        <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-2">
          
          <div className="mb-4 px-2">
             <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wider">
                <Sparkles size={12} className="text-yellow-500" />
                <span>Admin Yetkisi</span>
             </div>
          </div>

          {/* 1. BUTON: SİTEYE DÖN (Çıkış yapmaz, sadece yönlendirir) */}
          <Button variant="outline" asChild className="w-full justify-start border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-white gap-3 h-12 rounded-xl transition-all">
            <Link href="/">
               <ExternalLink size={18} /> <span className="text-xs font-bold uppercase tracking-wider">Siteyi Görüntüle</span>
            </Link>
          </Button>

          {/* 2. BUTON: GÜVENLİ ÇIKIŞ (Client Component) */}
          <LogoutBtn />

        </div>
      </aside>

      {/* İÇERİK ALANI */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#F5F5F0] relative">
        {children}
      </main>
    </div>
  );
}