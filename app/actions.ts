"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- 1. RANDEVU OLUŞTURMA ---
export async function createAppointment(formData: FormData) {
  const ownerName = formData.get("ownerName") as string;
  const phone = formData.get("phone") as string;
  const petName = formData.get("petName") as string;
  const petBreed = formData.get("petBreed") as string;
  const date = formData.get("date") as string;
  const notes = formData.get("notes") as string;

  // Veritabanı kaydı
  await prisma.appointment.create({
    data: {
      ownerName,
      phone,
      petName,
      petBreed,
      date,
      // timeRange ARTIK YOK
      notes,
    },
  });

  revalidatePath("/admin/appointments");
}

// --- 2. İLETİŞİM MESAJI KAYDETME ---
export async function createContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const subject = formData.get("subject") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  await prisma.contactMessage.create({
    data: {
      name,
      subject,
      email,
      message,
    },
  });
  
  revalidatePath("/admin/messages");
}