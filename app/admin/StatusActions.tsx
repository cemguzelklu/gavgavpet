"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
// HATA ÇÖZÜMÜ BURADA:
// "updateStatus" yerine "toggleAppointmentStatus" import ediyoruz.
import { toggleAppointmentStatus } from "./actions"; 

export default function StatusActions({ id, currentStatus }: { id: string, currentStatus: string }) {
  // Bind işlemi yaparak parametreleri gönderiyoruz
  const handleToggle = toggleAppointmentStatus.bind(null, id, currentStatus);

  return (
    <form action={handleToggle}>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
      >
        <CheckCircle size={16} className="mr-2" />
        {currentStatus === "Bekliyor" ? "Onayla" : "Beklemeye Al"}
      </Button>
    </form>
  );
}