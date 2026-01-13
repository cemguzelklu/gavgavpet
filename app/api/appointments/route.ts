import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const appointment = await prisma.appointment.create({
      data: {
        name: body.name,
        phone: body.phone,
        petName: body.petName,
        service: body.service,
        date: new Date(body.date),
      },
    });

    console.log("✅ DB'ye kaydedildi:", appointment);

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("❌ Randevu kaydı hatası:", error);
    return NextResponse.json(
      { error: "Randevu kaydedilemedi" },
      { status: 500 }
    );
  }
}
