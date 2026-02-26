"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {
  // Formdan gelen verileri alıyoruz
  const username = formData.get("username"); // <-- Yeni
  const password = formData.get("password");

  // .env dosyasındaki KULLANIÇI ADI ve ŞİFRE ile eşleşiyor mu?
  if (
    username === process.env.ADMIN_USERNAME && 
    password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies();
    
    // Giriş başarılıysa bileti (cookie) ver
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 gün
    });

    return { success: true };
  } else {
    return { error: "Kullanıcı adı veya şifre hatalı!" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  // Cookie'yi tamamen geçersiz kılıyoruz
  cookieStore.set("admin_session", "", { 
    path: "/", 
    maxAge: 0,
    expires: new Date(0) 
  });
}