"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions"; // Action dosyanın yolu
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PawPrint, User, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError("");
    
    const res = await login(formData);
    
    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      router.push("/admin"); 
      // Router push sonrası loading state kalabilir, sayfa değişecek.
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F0] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Üst Dekoratif Alan */}
        <div className="bg-stone-900 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <PawPrint className="w-64 h-64 -translate-y-1/2 -translate-x-1/2 text-white" />
            </div>
            <div className="relative z-10">
                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                    <PawPrint className="text-white w-8 h-8" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-white tracking-wide">Gavgav<span className="text-orange-500">.</span></h1>
                <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mt-2">Yönetim Paneli Girişi</p>
            </div>
        </div>

        <div className="p-8 pt-10">
            {error && (
                <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium text-center animate-pulse">
                {error}
                </div>
            )}

            <form action={handleSubmit} className="space-y-6">
            
            {/* Kullanıcı Adı */}
            <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-bold uppercase text-stone-500 tracking-wider ml-1">Kullanıcı Adı</Label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-stone-800 transition-colors" />
                    <Input 
                        id="username" 
                        name="username" 
                        type="text" 
                        placeholder="Admin kullanıcısı..." 
                        required 
                        className="h-14 pl-12 bg-stone-50 border-stone-200 focus:border-stone-800 focus:ring-0 rounded-xl font-medium text-stone-800 transition-all placeholder:text-stone-300" 
                    />
                </div>
            </div>

            {/* Şifre */}
            <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase text-stone-500 tracking-wider ml-1">Şifre</Label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-stone-800 transition-colors" />
                    <Input 
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        className="h-14 pl-12 bg-stone-50 border-stone-200 focus:border-stone-800 focus:ring-0 rounded-xl font-medium text-stone-800 transition-all placeholder:text-stone-300" 
                    />
                </div>
            </div>

            <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-stone-900 hover:bg-black text-white rounded-xl font-bold tracking-wider uppercase text-xs shadow-lg shadow-stone-900/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-4"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Giriş Yapılıyor...
                    </>
                ) : (
                    <>
                        Giriş Yap <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </Button>
            </form>
        </div>
        
        <div className="bg-stone-50 p-4 text-center border-t border-stone-100">
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                Gavgav Pet Spa © 2026
            </p>
        </div>

      </div>
    </div>
  );
}