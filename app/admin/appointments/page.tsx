import { prisma } from "@/lib/prisma";
import AppointmentList from "./AppointmentList"; 

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  });

  const pendingCount = appointments.filter(a => a.status === "Talep Bekliyor" || a.status === "Bekliyor").length;

  return (
    <div className="p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8 bg-[#F5F5F0] min-h-screen font-sans text-stone-800">
      
      {/* HEADER */}
      <div className="max-w-5xl flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-stone-300/50">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Randevular
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1">
            Müşteri rezervasyonlarını buradan yönetebilirsiniz.
          </p>
        </div>
        
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none bg-white px-3 sm:px-4 py-2 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center justify-center">
                <span className="text-[9px] sm:text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">Bekleyen</span>
                <span className="text-lg sm:text-xl font-serif font-bold text-orange-600">{pendingCount}</span>
            </div>
            <div className="flex-1 sm:flex-none bg-white px-3 sm:px-4 py-2 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center justify-center">
                <span className="text-[9px] sm:text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">Toplam</span>
                <span className="text-lg sm:text-xl font-serif font-bold text-stone-900">{appointments.length}</span>
            </div>
        </div>
      </div>

      {/* LİSTE */}
      <div className="max-w-5xl">
         <AppointmentList appointments={appointments} />
      </div>

    </div>
  );
}