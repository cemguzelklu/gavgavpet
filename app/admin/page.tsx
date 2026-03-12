import { getAdminStats, updateSiteVideo, markAllMessagesRead, navigateToNewAppointment } from "@/app/admin/actions";
import NotificationListener from "@/components/admin/NotificationListener";
import { 
  CalendarDays, MessageSquare, Users, Video, ArrowUpRight, Clock, CheckCircle2, Save, Activity, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 space-y-8 md:space-y-12 bg-[#FDFBF7] min-h-screen font-sans text-stone-800">
      
      <NotificationListener />

      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-stone-200">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-stone-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-stone-500 font-medium tracking-wide text-xs sm:text-sm uppercase">
            GavgavPet Yönetim Merkezi
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white border border-stone-200 px-4 py-2 sm:px-5 sm:py-3 rounded-full shadow-sm w-fit">
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-stone-600 tracking-wider uppercase">Sistem Online</span>
        </div>
      </div>

      {/* --- KPI KARTLARI (GRID) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* KART 1: Toplam Randevu */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-stone-50 rounded-xl group-hover:bg-stone-900 group-hover:text-white transition-colors duration-300">
               <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" /> 
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-stone-400">Genel</span>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 mb-1">{stats.totalAppointments}</h3>
            <p className="text-[10px] sm:text-xs font-bold text-stone-500 tracking-widest uppercase">Toplam Randevu</p>
          </div>
        </div>

        {/* KART 2: Bekleyenler */}
        <div className={`p-6 sm:p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden
            ${stats.pendingAppointments > 0 ? "bg-orange-50 border-orange-100" : "bg-white border-stone-100"}
        `}>
          <div className="flex justify-between items-start mb-4 sm:mb-6 relative z-10">
            <div className={`p-3 sm:p-4 rounded-xl transition-colors duration-300 ${stats.pendingAppointments > 0 ? "bg-white text-orange-600" : "bg-stone-50 text-stone-600 group-hover:bg-orange-500 group-hover:text-white"}`}>
               <Clock className="w-5 h-5 sm:w-6 sm:h-6" /> 
            </div>
            {stats.pendingAppointments > 0 && (
                <span className="animate-pulse w-2 h-2 bg-orange-500 rounded-full"></span>
            )}
          </div>
          <div className="relative z-10">
            <h3 className={`text-3xl sm:text-4xl font-serif font-medium mb-1 ${stats.pendingAppointments > 0 ? "text-orange-900" : "text-stone-900"}`}>
                {stats.pendingAppointments}
            </h3>
            <p className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase ${stats.pendingAppointments > 0 ? "text-orange-700/60" : "text-stone-500"}`}>
                Bekleyen Talep
            </p>
          </div>
          {stats.pendingAppointments > 0 && (
              <Clock className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 text-orange-100/50 -rotate-12 pointer-events-none" />
          )}
        </div>

        {/* KART 3: Mesajlar */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-stone-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 relative">
               <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" /> 
               {stats.unreadMessages > 0 && (
                 <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3 sm:h-4 sm:w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-red-500"></span>
                 </span>
               )}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 mb-1">{stats.unreadMessages}</h3>
            <span className="text-xs sm:text-sm text-stone-400 font-serif">/ {stats.totalMessages}</span>
          </div>
          <p className="text-[10px] sm:text-xs font-bold text-stone-500 tracking-widest uppercase">Okunmamış Mesaj</p>
        </div>

        {/* KART 4: Site Durumu */}
        <div className="bg-stone-900 p-6 sm:p-8 rounded-2xl border border-stone-900 shadow-sm hover:shadow-xl transition-all duration-300 text-white group">
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-white/10 rounded-xl text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
               <Activity className="w-5 h-5 sm:w-6 sm:h-6" /> 
            </div>
            <Sparkles className="w-4 h-4 text-yellow-400 opacity-50" />
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-serif font-medium mb-1">Aktif</h3>
            <p className="text-[10px] sm:text-xs font-bold text-white/40 tracking-widest uppercase">Site Durumu</p>
          </div>
        </div>
      </div>

      {/* --- ALT BÖLÜM: YÖNETİM & AKSİYONLAR --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* SOL: Video Yönetimi */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-stone-100 rounded-full shrink-0">
                        <Video className="w-5 h-5 text-stone-600" />
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900">Vitrin Videosu</h3>
                        <p className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider font-bold">Anasayfa Arkaplan Medyası</p>
                    </div>
                </div>
            </div>

            <div className="p-6 sm:p-8">
                <form action={updateSiteVideo} className="flex flex-col gap-5 sm:gap-6">
                    <div className="space-y-2 sm:space-y-3">
                        <label className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest pl-1">Mevcut Dosya Yolu</label>
                        <div className="w-full bg-stone-50 border border-stone-200 p-3 sm:p-4 rounded-xl text-xs sm:text-sm text-stone-600 font-mono flex items-center gap-2 sm:gap-3 break-all">
                            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
                            {stats.videoUrl}
                        </div>
                    </div>

                     <div className="space-y-2 sm:space-y-3">
                        <label className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest pl-1">Yeni Dosya Adı</label>
                        <div className="relative group">
                            <input 
                                name="videoUrl"
                                type="text" 
                                placeholder="/yeni-video.mp4" 
                                defaultValue={stats.videoUrl}
                                required
                                className="w-full bg-white border border-stone-200 p-4 sm:p-5 pr-20 rounded-xl text-sm sm:text-base text-stone-800 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all font-mono placeholder:text-stone-300"
                            />
                            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] text-stone-400 font-bold bg-stone-100 px-2 py-1 rounded">
                                PUBLIC
                            </div>
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-stone-400 pl-1 leading-relaxed">
                            *Video dosyasının projenin <span className="font-bold text-stone-600">public</span> klasöründe olduğundan emin olun.
                        </p>
                    </div>
                    
                    <div className="flex justify-start sm:justify-end pt-2 sm:pt-4">
                        <Button type="submit" className="w-full sm:w-auto bg-stone-900 text-white px-8 sm:px-10 py-5 sm:py-6 rounded-xl font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-black transition-all shadow-lg hover:shadow-stone-900/20 active:scale-95">
                            <Save className="w-4 h-4 mr-2" />
                            Kaydet
                        </Button>
                    </div>
                </form>
            </div>
        </div>

        {/* SAĞ: Hızlı İşlemler */}
        <div className="flex flex-col gap-4 sm:gap-6">
            
            {/* Yeni Randevu Kartı */}
            <form action={navigateToNewAppointment} className="h-full min-h-[160px] sm:min-h-0">
                <button className="w-full h-full bg-gradient-to-br from-stone-900 to-stone-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300 border border-stone-700">
                    <div className="w-full flex justify-between items-start">
                        <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white group-hover:text-black transition-colors duration-300">
                             <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                    </div>
                    <div className="text-left mt-6 sm:mt-8">
                        <h3 className="text-xl sm:text-2xl font-serif font-medium mb-1">Yeni Randevu</h3>
                        <p className="text-[10px] sm:text-xs text-white/50 font-bold tracking-widest uppercase">Manuel Ekleme</p>
                    </div>
                </button>
            </form>

            {/* Mesajları Temizle Kartı */}
            <form action={markAllMessagesRead}>
                <button className="w-full bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-row items-center justify-between group hover:border-stone-400 transition-colors duration-300 gap-4">
                    <div className="text-left flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900">Mesajları Okundu Say</h3>
                            {stats.unreadMessages > 0 && (
                                <span className="bg-red-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                    {stats.unreadMessages} Yeni
                                </span>
                            )}
                        </div>
                        <p className="text-[10px] sm:text-xs text-stone-400 font-bold tracking-widest uppercase">Tümünü Temizle</p>
                    </div>
                    <div className="p-3 bg-stone-100 rounded-full text-stone-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300 shrink-0">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                </button>
            </form>

        </div>

      </div>
    </div>
  );
}