import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2, ImageIcon, Package, Tag } from "lucide-react";
import { deleteProduct } from "./actions"; 

// Silme Butonu (Form Action ile)
function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteProduct.bind(null, id)}>
      <Button variant="ghost" size="icon" type="submit" className="text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors">
        <Trash2 size={18} />
      </Button>
    </form>
  );
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-12 space-y-8 bg-[#F5F5F0] min-h-screen font-sans text-stone-800">
      
      {/* --- HEADER --- */}
      <div className="max-w-5xl flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-300/50">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Ürünler
          </h1>
          <p className="text-stone-500 text-sm font-medium mt-1">
            Mağaza envanteri ve fiyat yönetimi.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
            {/* İstatistik */}
            <div className="hidden md:flex bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-sm flex-col items-center min-w-[80px]">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Çeşit</span>
                <span className="text-xl font-serif font-bold text-stone-900">{products.length}</span>
            </div>

            {/* Yeni Ekle Butonu */}
            <Link href="/admin/products/new">
                <Button className="bg-stone-900 hover:bg-black text-white h-12 px-6 rounded-xl font-bold tracking-wide uppercase text-xs gap-2 shadow-lg shadow-stone-900/20">
                    <PlusCircle size={18} />
                    Yeni Ürün
                </Button>
            </Link>
        </div>
      </div>

      {/* --- ÜRÜN LİSTESİ --- */}
      <div className="max-w-5xl grid gap-4">
        {products.map((product) => {
          const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;

          return (
            <div 
                key={product.id} 
                className="group bg-white p-4 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-stone-300 transition-all flex flex-col md:flex-row items-start md:items-center gap-6"
            >
                {/* 1. GÖRSEL */}
                <div className="relative w-full md:w-24 h-24 flex-shrink-0 bg-stone-100 rounded-xl overflow-hidden border border-stone-100">
                    {firstImage ? (
                        <img src={firstImage} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                            <ImageIcon size={24} />
                        </div>
                    )}
                </div>

                {/* 2. BİLGİLER */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-serif font-bold text-stone-900">
                            {product.title}
                        </h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-stone-500 bg-stone-50 px-2 py-1 rounded-md border border-stone-100">
                            <Tag size={14} />
                            <span className="font-bold text-stone-700">{product.price ? `${product.price} ₺` : "Fiyat Yok"}</span>
                        </div>
                        {/* Stok kodu vs. eklenebilir */}
                        <div className="flex items-center gap-1 text-stone-400 text-xs uppercase tracking-wider font-bold">
                            <Package size={14} />
                            <span>Stokta</span>
                        </div>
                    </div>
                </div>

                {/* 3. İŞLEMLER */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-stone-100 pt-4 md:pt-0">
                     <Link href={`/admin/products/${product.id}/edit`}>
                        <Button variant="outline" size="icon" className="border-stone-200 text-stone-600 hover:text-black hover:border-black hover:bg-white transition-all">
                            <Pencil size={18} />
                        </Button>
                     </Link>
                     
                     <DeleteButton id={product.id} />
                </div>

            </div>
          );
        })}

        {/* BOŞ LİSTE DURUMU */}
        {products.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-stone-300">
             <div className="bg-stone-100 p-6 rounded-full inline-block mb-4">
                <Package className="w-8 h-8 text-stone-400" />
             </div>
             <h3 className="text-xl font-serif font-bold text-stone-700">Depo Boş</h3>
             <p className="text-stone-500 text-sm mt-1">Henüz mağazaya ürün eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
}