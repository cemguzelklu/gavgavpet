"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  CalendarDays, 
  MessageSquare, 
  PlusCircle, 
  Package, 
  LayoutDashboard, 
  Sparkles, 
  ExternalLink, 
  Menu 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoutBtn from "./LogoutButton";
import {
  Sheet,
  SheetContent,
  SheetHeader, // Bunu ekledik
  SheetTitle,  // Bunu ekledik
  SheetTrigger,
} from "@/components/ui/sheet";

// Sidebar içeriği
const SidebarContent = ({ closeMenu }: { closeMenu: () => void }) => (
  <div className="flex flex-col h-full bg-white">
    <div className="p-8 pb-8">
      <Link href="/admin" onClick={closeMenu} className="block group">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
            Gavgav<span className="text-orange-600">.</span>
          </h2>
        </div>
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Yönetim Paneli</p>
      </Link>
    </div>

    <nav className="flex-1 px-6 space-y-8 overflow-y-auto">
      <div>
        <Link href="/admin" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all group">
          <LayoutDashboard size={20} className="text-stone-400 group-hover:text-stone-900 transition-colors" />
          <span className="font-medium text-sm">Panel Özeti</span>
        </Link>
      </div>

      <div>
        <div className="text-[10px] uppercase font-bold text-stone-400 mb-3 px-4 tracking-widest">İletişim</div>
        <div className="space-y-1">
          <Link href="/admin/appointments" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all group">
            <CalendarDays size={20} className="text-stone-400 group-hover:text-orange-500 transition-colors" />
            <span className="font-medium text-sm">Randevular</span>
          </Link>
          <Link href="/admin/messages" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all group">
            <MessageSquare size={20} className="text-stone-400 group-hover:text-blue-500 transition-colors" />
            <span className="font-medium text-sm">Mesajlar</span>
          </Link>
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase font-bold text-stone-400 mb-3 px-4 tracking-widest">Mağaza</div>
        <div className="space-y-1">
          <Link href="/admin/products" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all group">
            <Package size={20} className="text-stone-400 group-hover:text-purple-500 transition-colors" />
            <span className="font-medium text-sm">Ürün Listesi</span>
          </Link>
          <Link href="/admin/products/new" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-500 hover:text-white hover:bg-stone-900 transition-all group mt-2">
            <PlusCircle size={20} className="text-stone-400 group-hover:text-white transition-colors" />
            <span className="font-medium text-sm">Yeni Ürün Ekle</span>
          </Link>
        </div>
      </div>
    </nav>

    <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-2">
      <div className="mb-4 px-2">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wider">
          <Sparkles size={12} className="text-yellow-500" />
          <span>Admin Yetkisi</span>
        </div>
      </div>
      <Button variant="outline" asChild className="w-full justify-start border-stone-200 text-stone-600 bg-white gap-3 h-12 rounded-xl" onClick={closeMenu}>
        <Link href="/">
          <ExternalLink size={18} /> <span className="text-xs font-bold uppercase tracking-wider">Siteyi Görüntüle</span>
        </Link>
      </Button>
      <LogoutBtn />
    </div>
  </div>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      
      {/* --- MASAÜSTÜ SIDEBAR --- */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-stone-200 flex-col sticky top-0 h-screen overflow-y-auto z-50">
        <SidebarContent closeMenu={() => {}} />
      </aside>

      {/* --- MOBİL NAV --- */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b border-stone-200 z-[40] px-6 h-16 flex items-center justify-between flex-row-reverse">
        <Link href="/admin" className="flex items-center">
          <span className="font-serif font-bold text-xl tracking-tight">Gavgav<span className="text-orange-600">.</span></span>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-stone-600 outline-none">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-full border-none">
              {/* BURAYI EKLEDİK: Erişilebilirlik hatasını çözen başlık */}
              <SheetHeader className="sr-only">
                <SheetTitle>Admin Navigasyon Menüsü</SheetTitle>
              </SheetHeader>
              
              <SidebarContent closeMenu={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* İÇERİK ALANI */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F5F5F0]">
        <div className="lg:hidden h-16" /> 
        
        <div className="flex-1 p-4 md:p-10 overflow-y-auto relative">
          {children}
        </div>
      </main>
    </div>
  );
}