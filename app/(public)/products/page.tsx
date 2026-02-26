import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProductListing from "@/components/ProductListing"; 

async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // --- HATA ÇÖZÜMÜ BURADA ---
  // Prisma'dan gelen veriyi map'leyip, "Decimal" olan fiyatı "number"a çeviriyoruz.
  // Bu sayede Client Component'e düzgün bir JSON objesi gidiyor.
  const formattedProducts = products.map((product) => ({
    ...product,
    price: product.price ? Number(product.price) : 0, // Decimal -> Number dönüşümü
  }));

  return formattedProducts;
}

export default async function ProductsPage() {
  const products = await getProducts();
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("admin_session");

  return (
    <main className="bg-slate-50 min-h-screen pb-24">
      
      {/* HERO (BAŞLIK) */}
      <div className="bg-white border-b border-slate-100 py-12 mb-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
            Ürünlerimiz
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Minik dostlarınızın tüm ihtiyaçları için özenle seçilmiş en kaliteli ürünler.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        
        {/* Admin Butonu */}
        {isAdmin && (
          <div className="flex justify-end mb-6">
            <Link href="/admin/products/new">
              <Button className="bg-green-600 hover:bg-green-700 gap-2 shadow-sm">
                <PlusCircle size={18} />
                Yeni Ürün Ekle
              </Button>
            </Link>
          </div>
        )}

        {/* LİSTELEME BİLEŞENİ */}
        <ProductListing initialProducts={products} />

      </div>
    </main>
  );
}