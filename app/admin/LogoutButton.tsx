"use client";

import { Button } from "@/components/ui/button";
import { logout } from "./login/actions"; //
import { LogOut } from "lucide-react";

export default function LogoutBtn() {
  const handleLogout = async () => {
    await logout();
    // router.push yerine bunu kullanmak tüm cache'i temizler
    window.location.replace("/admin/login"); 
  };

  return (
    <Button 
        variant="ghost" 
        onClick={handleLogout}
        className="w-full justify-start text-red-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 gap-3 h-12 rounded-xl transition-all"
    >
        <LogOut size={18} /> 
        <span className="text-xs font-bold uppercase tracking-wider">Güvenli Çıkış</span>
    </Button>
  );
}