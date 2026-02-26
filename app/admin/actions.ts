"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache"; // Cache sorunu için şart!

// --- İSTATİSTİKLER (CANLI) ---
export async function getAdminStats() {
  noStore(); // <--- BU SATIR SAYESİNDE VERİLER ANLIK GELİR, 0 GÖZÜKMEZ.

  try {
    const [totalAppointments, pendingAppointments, totalMessages, unreadMessages, settings] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "Talep Bekliyor" } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.siteSetting.findUnique({ where: { id: 1 } })
    ]);

    return {
      totalAppointments,
      pendingAppointments,
      totalMessages,
      unreadMessages,
      videoUrl: settings?.heroVideoUrl || "/kopek1video.mp4"
    };

  } catch (error) {
    console.error("Stats Error:", error);
    return {
      totalAppointments: 0, pendingAppointments: 0, totalMessages: 0, unreadMessages: 0, videoUrl: "/kopek1video.mp4"
    };
  }
}

// --- RANDEVU OLUŞTURMA ---
export async function createAppointment(formData: FormData) {
  const rawFormData = {
    ownerName: formData.get("ownerName") as string,
    phone: formData.get("phone") as string,
    petName: formData.get("petName") as string,
    petBreed: formData.get("petBreed") as string,
    date: formData.get("date") as string,
    notes: formData.get("notes") as string,
    status: "Talep Bekliyor",
  };

  await prisma.appointment.create({ data: rawFormData });
  revalidatePath("/admin");
}

// --- VİDEO GÜNCELLEME ---
export async function updateSiteVideo(formData: FormData) {
  const newVideoUrl = formData.get("videoUrl") as string;
  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: { heroVideoUrl: newVideoUrl },
    create: { id: 1, heroVideoUrl: newVideoUrl }
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

// --- MESAJLARI TEMİZLEME ---
export async function markAllMessagesRead() {
  await prisma.contactMessage.updateMany({
    where: { isRead: false },
    data: { isRead: true }
  });
  revalidatePath("/admin");
}

// --- YÖNLENDİRME ---
export async function navigateToNewAppointment() {
    redirect("/appointment");
}

// --- SİLME VE GÜNCELLEME ---
export async function deleteAppointment(id: string) {
  await prisma.appointment.delete({ where: { id } });
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
}

export async function toggleAppointmentStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === "Talep İncelendi" ? "Talep Bekliyor" : "Talep İncelendi";
  await prisma.appointment.update({ where: { id }, data: { status: newStatus } });
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
export async function toggleMessageReadStatus(id: string, currentStatus: boolean) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: !currentStatus },
    });
    // Sadece admin panelini ve mesaj listesini etkile
    revalidatePath("/admin/messages");
    // revalidatePath("/"); <--- Bunu kaldır, ana sayfanın hızı etkilenmesin
  } catch (error) {
    console.error(error);
  }
}