"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. ÜRÜN EKLEME
export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  
  const imagesJSON = formData.get("images") as string;
  let images: string[] = [];
  try {
    images = imagesJSON ? JSON.parse(imagesJSON) : [];
  } catch (e) {
    images = [];
  }

  await prisma.product.create({
    data: {
      title,
      description,
      price: price ? parseFloat(price) : 0,
      images: images,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/products"); 
  redirect("/admin/products");
}

// 2. ÜRÜN GÜNCELLEME
export async function updateProduct(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  
  const imagesJSON = formData.get("images") as string;
  let images: string[] = [];
  try {
    images = imagesJSON ? JSON.parse(imagesJSON) : [];
  } catch (e) {
    images = [];
  }

  await prisma.product.update({
    where: { id },
    data: {
      title,
      description,
      price: price ? parseFloat(price) : 0,
      images: images,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// 3. ÜRÜN SİLME
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Silme hatası:", error);
  }
}