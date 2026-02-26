import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "./edit-form"; // Az önce oluşturduğumuz formu çağırıyoruz

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  // Next.js 15'te params promise olduğu için await ile çözüyoruz
  const { id } = await params;

  // Veriyi sunucu tarafında çekiyoruz (useEffect gerekmez!)
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  // Decimal tipini Number'a çevirip Client Component'e gönderiyoruz
  const serializedProduct = {
    ...product,
    price: product.price ? Number(product.price) : 0,
  };

  return <EditProductForm product={serializedProduct} />;
}