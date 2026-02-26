"use client";

import { useState } from "react";
import { Product } from "@prisma/client";
import { Search, Filter, ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// TİP TANIMI GÜNCELLEMESİ:
// 'price' Decimal -> number
// 'images' String array (schema.prisma'yı güncellediğini varsayıyoruz)
// Eğer schema'yı henüz güncellemediysen 'imageUrl' hatası alabilirsin, 
// o yüzden önce schema güncellemesi şart.
type SerializedProduct = Omit<Product, "price" | "createdAt" | "updatedAt"> & {
  price: number | null;
  images: string[]; // Artık array!
};

interface ProductListingProps {
  initialProducts: SerializedProduct[];
}

export default function ProductListing({ initialProducts }: ProductListingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const filteredProducts = initialProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-10">
      {/* --- FİLTRE BAR --- */}
      <div className="bg-white p-2 md:p-4 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between max-w-6xl mx-auto sticky top-24 z-30 backdrop-blur-md bg-white/90">
        
        <div className="w-full md:w-56">
          <Select onValueChange={setCategory} defaultValue="all">
            <SelectTrigger className="rounded-full border-slate-200 bg-slate-50 h-12 px-6 font-medium text-slate-600 focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              <SelectItem value="kopek">Köpek</SelectItem>
              <SelectItem value="kedi">Kedi</SelectItem>
              <SelectItem value="aksesuar">Aksesuar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 w-full relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
          <Input 
            placeholder="Ürün ara..." 
            className="w-full h-12 pl-12 rounded-full border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button className="w-full md:w-auto rounded-full h-12 px-8 bg-slate-900 hover:bg-orange-600 text-white font-semibold shadow-md transition-all duration-300">
          Filtrele
        </Button>
      </div>

      {/* --- ÜRÜN GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 text-lg font-medium">Aradığınız kriterlere uygun ürün bulunamadı. 🐶</p>
        </div>
      )}
    </div>
  );
}

// --- AKILLI ÜRÜN KARTI ---
function ProductCard({ product }: { product: SerializedProduct }) {
  // Veritabanından gelen images array'ini kullanıyoruz
  // Eğer boşsa boş array döner
  const images = product.images && product.images.length > 0 
    ? product.images 
    : []; 

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (images.length > 1) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (images.length > 1) {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const fakeOldPrice = product.price ? product.price * 1.25 : 0;
  // Sadece 1'den fazla resim varsa okları göster
  const showArrows = images.length > 1;

  return (
    <div className="group flex flex-col gap-3">
      
      {/* GÖRSEL ALANI */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
        {images.length > 0 ? (
          <>
            <img 
              src={images[currentImage]} 
              alt={product.title} 
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* OKLAR: Sadece birden fazla resim varsa ve hover durumunda görünür */}
            {showArrows && (
              <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={prevImage}
                  className="bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-transform active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={nextImage}
                  className="bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-transform active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* NOKTALAR: Sadece birden fazla resim varsa görünür */}
            {showArrows && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 p-1 px-2 rounded-full bg-black/20 backdrop-blur-sm">
                {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentImage === idx ? "bg-white w-3" : "bg-white/50"}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-400 bg-slate-50">
            Resim Yok
          </div>
        )}

        {/* İndirim Rozeti */}
        <div className="absolute top-3 left-3">
           <Badge className="bg-red-500 hover:bg-red-600 text-white border-none px-2.5 py-1 text-xs font-bold shadow-sm">
             %20
           </Badge>
        </div>
      </div>

      {/* BİLGİ ALANI */}
      <div className="space-y-1">
        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
           <Star size={12} className="text-orange-400 fill-orange-400" />
           <span className="text-xs text-slate-500 font-medium">4.8 (124)</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 line-through font-medium">
              {fakeOldPrice.toFixed(0)} ₺
            </span>
            <span className="text-lg font-black text-slate-900">
              {product.price ? `${product.price} ₺` : "Bilgi Alınız"}
            </span>
          </div>
          
          <Button size="icon" className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-900 hover:text-white transition-all shadow-sm">
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}