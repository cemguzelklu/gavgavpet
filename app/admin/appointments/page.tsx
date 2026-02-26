import { prisma } from "@/lib/prisma";
import AppointmentList from "./AppointmentList"; 

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  });

  const pendingCount = appointments.filter(a => a.status === "Talep Bekliyor" || a.status === "Bekliyor").length;

  return (
    <div className="p-6 md:p-12 space-y-8 bg-[#F5F5F0] min-h-screen font-sans text-stone-800">
      
      {/* HEADER */}
      {/* max-w-5xl ekledik: Başlık da kutularla aynı hizada dursun */}
      <div className="max-w-5xl flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-300/50">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Randevular
          </h1>
          <p className="text-stone-500 text-sm font-medium mt-1">
            Müşteri rezervasyonlarını buradan yönetebilirsiniz.
          </p>
        </div>
        
        <div className="flex gap-3">
            <div className="bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center min-w-[80px]">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Bekleyen</span>
                <span className="text-xl font-serif font-bold text-orange-600">{pendingCount}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center min-w-[80px]">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Toplam</span>
                <span className="text-xl font-serif font-bold text-stone-900">{appointments.length}</span>
            </div>
        </div>
      </div>

      {/* LİSTE */}
      {/* BURAYA max-w-5xl EKLEDİK: Kutular çok uzamasın, derli toplu olsun */}
      <div className="max-w-5xl">
         <AppointmentList appointments={appointments} />
      </div>

    </div>
  );
}