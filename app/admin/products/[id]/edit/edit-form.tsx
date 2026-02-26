"use client";

import { useState } from "react";
import { updateProduct } from "@/app/admin/products/actions"; // Action yolunu kontrol et
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/lib/uploadthing";
import { X, ImagePlus, Save, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductData {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  images: string[];
}

export default function EditProductForm({ product }: { product: ProductData }) {
  const [images, setImages] = useState<string[]>(product.images);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    formData.append("images", JSON.stringify(images));
    await updateProduct(product.id, formData);
    // Router push yapmıyoruz çünkü action içinde redirect var, ama state'i yönetmek iyi olur.
  }

  const removeImage = (urlToRemove: string) => {
    setImages((prev) => prev.filter((url) => url !== urlToRemove));
  };

  return (
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/products">
                <Button variant="outline" size="icon" className="rounded-full border-stone-300 hover:bg-white hover:border-stone-400 text-stone-500">
                    <ChevronLeft size={20} />
                </Button>
            </Link>
            <div>
                <h1 className="text-3xl font-serif font-bold text-stone-900">Ürünü Düzenle</h1>
                <p className="text-stone-500 text-sm">&quot;{product.title}&quot;ürününü güncelliyorsunuz.</p>
            </div>
        </div>
        
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-stone-200">
            
            {/* --- GÖRSEL YÜKLEME ALANI --- */}
            <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-bold tracking-widest uppercase text-stone-500">Ürün Görselleri</Label>
                    <span className="text-xs text-stone-400">{images.length} Görsel</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative aspect-square group rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-50">
                            <img src={url} alt={`Ürün ${index}`} className="w-full h-full object-cover" />
                            <button 
                                type="button"
                                onClick={() => removeImage(url)}
                                className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}

                    <div className="aspect-square border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center bg-stone-50 hover:bg-stone-100 hover:border-stone-300 transition-colors group relative overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                             <ImagePlus className="w-8 h-8 text-stone-300 group-hover:text-stone-500 transition-colors mb-2" />
                             <span className="text-xs font-bold text-stone-400 uppercase">Yükle</span>
                        </div>
                        <div className="opacity-0 w-full h-full absolute inset-0 cursor-pointer z-20">
                             <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    if (res) {
                                        const newUrls = res.map((r) => r.url);
                                        setImages((prev) => [...prev, ...newUrls]);
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    alert(`Hata: ${error.message}`);
                                }}
                                appearance={{
                                    button: "w-full h-full",
                                    allowedContent: "hidden"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FORM ALANI --- */}
            <form action={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-3">
                        <Label htmlFor="title" className="text-stone-600 font-bold">Ürün Adı</Label>
                        <Input 
                            id="title" 
                            name="title" 
                            required 
                            defaultValue={product.title}
                            className="h-14 bg-stone-50 border-stone-200 focus:border-stone-400 focus:ring-0 rounded-xl text-lg font-serif placeholder:text-stone-300" 
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="price" className="text-stone-600 font-bold">Fiyat (TL)</Label>
                        <div className="relative">
                            <Input 
                                id="price" 
                                name="price" 
                                type="number" 
                                step="0.01" 
                                defaultValue={product.price || 0}
                                className="h-14 bg-stone-50 border-stone-200 focus:border-stone-400 focus:ring-0 rounded-xl text-lg font-bold pl-8 placeholder:text-stone-300" 
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">₺</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="description" className="text-stone-600 font-bold">Açıklama</Label>
                    <Textarea 
                        id="description" 
                        name="description" 
                        defaultValue={product.description || ""}
                        className="min-h-[150px] bg-stone-50 border-stone-200 focus:border-stone-400 focus:ring-0 rounded-xl resize-none text-stone-700 placeholder:text-stone-300" 
                    />
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-end">
                    <Button 
                        type="submit" 
                        size="lg" 
                        className={`
                            h-14 px-8 rounded-xl font-bold tracking-widest uppercase text-xs transition-all
                            ${images.length > 0 
                                ? "bg-stone-900 hover:bg-black text-white shadow-xl shadow-stone-900/20 hover:scale-[1.02]" 
                                : "bg-stone-200 text-stone-400 cursor-not-allowed"
                            }
                        `}
                        disabled={isSubmitting || images.length === 0}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {isSubmitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                </div>
            </form>

        </div>
      </div>
  );
}