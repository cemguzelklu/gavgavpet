"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions"; 
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
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F0] p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden transition-all">
        
        {/* Üst Dekoratif Alan */}
        <div className="bg-stone-900 p-6 sm:p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <PawPrint className="w-48 h-48 md:w-64 md:h-64 -translate-y-1/2 -translate-x-1/2 text-white" />
            </div>
            <div className="relative z-10">
                <div className="bg-white/10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                    <PawPrint className="text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">Gavgav<span className="text-orange-500">.</span></h1>
                <p className="text-stone-400 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">Yönetim Paneli</p>
            </div>
        </div>

        {/* Form Alanı */}
        <div className="p-5 sm:p-6 md:p-8 pt-6 sm:pt-8 md:pt-10">
            {error && (
                <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-3 sm:p-4 rounded-xl text-xs sm:text-sm font-medium text-center animate-in fade-in zoom-in duration-300">
                {error}
                </div>
            )}

            <form action={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            
            {/* Kullanıcı Adı */}
            <div className="space-y-2">
                <Label htmlFor="username" className="text-[10px] md:text-xs font-bold uppercase text-stone-500 tracking-wider ml-1">Kullanıcı Adı</Label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-stone-400 group-focus-within:text-stone-800 transition-colors" />
                    <Input 
                        id="username" 
                        name="username" 
                        type="text" 
                        autoComplete="username"
                        placeholder="Admin kullanıcısı..." 
                        required 
                        className="h-12 sm:h-14 pl-10 sm:pl-12 bg-stone-50 border-stone-200 focus:border-stone-800 focus:ring-0 rounded-xl font-medium text-stone-800 transition-all placeholder:text-stone-300 text-base" 
                    />
                </div>
            </div>

            {/* Şifre */}
            <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] md:text-xs font-bold uppercase text-stone-500 tracking-wider ml-1">Şifre</Label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-stone-400 group-focus-within:text-stone-800 transition-colors" />
                    <Input 
                        id="password" 
                        name="password" 
                        type="password" 
                        autoComplete="current-password"
                        placeholder="••••••••" 
                        required 
                        className="h-12 sm:h-14 pl-10 sm:pl-12 bg-stone-50 border-stone-200 focus:border-stone-800 focus:ring-0 rounded-xl font-medium text-stone-800 transition-all placeholder:text-stone-300 text-base" 
                    />
                </div>
            </div>

            <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 sm:h-14 bg-stone-900 hover:bg-black text-white rounded-xl font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs shadow-lg shadow-stone-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 sm:mt-4"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Giriş Yapılıyor...
                    </>
                ) : (
                    <>
                        Giriş Yap <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </>
                )}
            </Button>
            </form>
        </div>
        
        <div className="bg-stone-50 p-4 sm:p-6 text-center border-t border-stone-100">
            <p className="text-[9px] md:text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                Gavgav Pet Spa © 2026
            </p>
        </div>

      </div>
    </div>
  );
}