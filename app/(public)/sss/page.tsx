"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationFooterBox from "@/components/LocationFooterBox";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  label: string;
  numeral: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    id: "isletme",
    label: "İşletme & Randevu",
    numeral: "I",
    items: [
      {
        q: "GavgavPet nerede bulunuyor?",
        a: "Maslak 1453 Sitesi, T4b Blok, -4. Kat, No: 213, Sarıyer / İstanbul adresindeyiz. Maslak, Levent, Ayazağa ve İstinye'den kolayca ulaşabilirsiniz.",
      },
      {
        q: "Çalışma saatleriniz nedir?",
        a: "Haftanın 7 günü 09:00 – 19:00 saatleri arasında hizmet veriyoruz. Randevu almak için +90 536 899 43 74 numarasını arayabilir ya da WhatsApp'tan yazabilirsiniz.",
      },
      {
        q: "Bakım süresi ne kadar sürer?",
        a: "Süre dostunuzun ırkına, tüy yapısına ve alınan hizmetlere göre değişir. Ortalama bir tam bakım (banyo + tıraş + tırnak) 1–1.5 saat arasındadır. Randevu öncesinde size tahmini süreyi bildiriyoruz.",
      },
      {
        q: "Bakım sırasında yanında kalabilir miyim?",
        a: "Evet, stüdyomuz butik yapısı nedeniyle buna imkan tanıyor. Dilediğiniz takdirde seans boyunca dostunuzun yanında kalabilirsiniz.",
      },
      {
        q: "Sarıyer ve Maslak dışından da hizmet veriyor musunuz?",
        a: "Stüdyomuz Maslak 1453 Sitesi'nde. Levent, Ayazağa, İstinye, Tarabya, Büyükdere gibi çevre semtlerden gelen misafirlerimiz de memnuniyetle ağırlıyoruz.",
      },
      {
        q: "Randevu almak zorunlu mu?",
        a: "Evet, yalnızca randevulu çalışıyoruz. Bu sayede dostunuza birebir ve kesintisiz ilgi gösterebiliyoruz. WhatsApp, telefon veya site üzerinden kolayca randevu alabilirsiniz.",
      },
    ],
  },
  {
    id: "kopek",
    label: "Köpekler",
    numeral: "II",
    items: [
      {
        q: "Köpeğim ne sıklıkla bakıma gelmeli?",
        a: "Genel olarak 4–6 haftada bir bakım idealdir. Kıvırcık ya da uzun tüylü ırklar (Poodle, Cocker, Yorkshire vb.) daha sık bakım gerektirebilir. Tüy yapısına göre size özel öneri sunuyoruz.",
      },
      {
        q: "Makas tıraş mı, makine tıraş mı daha iyi?",
        a: "Makas tıraş daha doğal ve estetik bir görünüm sağlar; ırk standartlarına uygun stillerden show kalite kesimler için tercih edilir. Makine tıraş ise tüy dökümü sorunu yaşayan veya sıcak havalarda rahatlık arayan dostlar için uygundur. GavgavPet olarak ağırlıklı olarak makas tıraş uyguluyoruz.",
      },
      {
        q: "Köpeğim çok hareketli veya tedirgin. Bakım yapabilir misiniz?",
        a: "Evet. Deneyimli ekibimiz, stresli ve hareketli dostlarla çalışma konusunda sabır ve tecrübeye sahiptir. Seans boyunca sakinleştirici teknikler uygulayarak süreci mümkün olduğunca konforlu hale getiriyoruz. Kesinlikle anestezi veya sedasyon kullanmıyoruz.",
      },
      {
        q: "Köpeğimin tüyleri çok keçelendi, ne yapılır?",
        a: "Önce özel kıtık açıcı kremler ve tarama yöntemleriyle keçeleri çözmeye çalışıyoruz. Ancak keçelenme açılamayacak düzeydeyse, deri sağlığını korumak adına makine tıraş uygulanır. Bu konuyu randevu öncesinde sizinle paylaşarak birlikte karar veriyoruz.",
      },
      {
        q: "Köpeğimin tüyleri ne kadar kısa kesilecek?",
        a: "Tamamıyla sizin tercihinize ve köpeğinizin ırk özelliklerine göre şekilleniyor. Seans başında tıraş stilini birlikte belirliyoruz; isteklerinizi dinleyip en uygun kesimi öneriyoruz.",
      },
    ],
  },
  {
    id: "kedi",
    label: "Kediler",
    numeral: "III",
    items: [
      {
        q: "Kediler için anestezi kullanıyor musunuz?",
        a: "Hayır, kesinlikle kullanmıyoruz. Kedilerin tıraşını, deneyimli ekibimiz tutarak ve sakinleştirici tekniklerle gerçekleştiriyoruz. Sağlık sorunu olan ya da çok agresif kediler için bakım öncesinde durumu değerlendirip bilgi veriyoruz.",
      },
      {
        q: "Kedim banyoyu sevmiyor. Ne yapıyorsunuz?",
        a: "Kedilerin çoğu suyu sevmez — bu normaldir. Ekibimiz, kedilere özel nazik yaklaşım teknikleriyle bu süreci olabildiğince stressiz hale getirir. Gerekirse banyo yerine kuru temizleme yöntemleri de uygulanabilir.",
      },
      {
        q: "Kedim ne sıklıkla tıraş ettirilmeli?",
        a: "Uzun tüylü ırklarda (İran, Ankara kedisi, Maine Coon vb.) mevsim geçişlerinde, özellikle ilkbahar döneminde tıraş önerilir. Kısa tüylü ırklarda zorunlu olmamakla birlikte hijyen tıraşı yapılabilir. Tüy dökümü, kıtık sorunu veya deri sağlığı açısından daha sık bakım gerekebilir.",
      },
      {
        q: "Kedi tıraşı köpek tıraşından farklı mı?",
        a: "Evet, oldukça farklı. Kediler çok daha hassas ve stres eğilimli hayvanlardır. Bu nedenle seans planlaması, dokunuş teknikleri ve ekipman seçimi tamamen ayrıdır. GavgavPet'te kedi bakımı için ayrı zaman dilimi ve özel ortam ayrılıyor.",
      },
    ],
  },
  {
    id: "hizmet",
    label: "Hizmetler & Ürünler",
    numeral: "IV",
    items: [
      {
        q: "Hangi ürünleri kullanıyorsunuz?",
        a: "Yalnızca dermatolojik olarak test edilmiş, hayvan dostu ve vegan sertifikalı şampuan, krem ve bakım ürünleri kullanıyoruz. Her dostumuzun tüy ve deri yapısına göre ürün seçimi ayrı yapılır.",
      },
      {
        q: "Keratin uygulaması ne sağlar?",
        a: "Tüylere protein yüklemesi yaparak tüylerin daha parlak, yumuşak ve sağlıklı görünmesini sağlar. Özellikle mat, kırık ve donuk tüylü dostlarda fark yaratır.",
      },
      {
        q: "Yaratıcı renklendirme güvenli mi?",
        a: "Evet. Kullandığımız boyalar vegan formüllü, geçici ve hayvanlara zarar vermeyen özel pet boyalarıdır. Kuyruk, kulak veya pati uçlarına uygulanır; cilde temas etmez.",
      },
      {
        q: "Tırnak kesimi tek başına yaptırabilir miyim?",
        a: "Evet. Tırnak kesimi, kulak ve göz temizliği gibi hijyen hizmetleri tam bakım paketi olmadan da alınabilir. Randevu alırken ihtiyacınızı belirtmeniz yeterli.",
      },
    ],
  },
];

function FAQItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="font-serif text-base md:text-lg text-black group-hover:text-stone-500 transition-colors leading-snug">
          {item.q}
        </span>
        <span className="flex-shrink-0 mt-1">
          {open
            ? <Minus className="w-4 h-4 text-[#C08282]" />
            : <Plus className="w-4 h-4 text-stone-300 group-hover:text-[#C08282] transition-colors" />
          }
        </span>
      </button>
      {open && (
        <div className="pb-6 pr-10">
          <p className="font-sans text-stone-500 text-sm md:text-base leading-relaxed">
            {item.a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("isletme");
  const active = faqData.find((c) => c.id === activeCategory)!;

  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-[100px]">

      {/* BAŞLIK */}
      <section className="px-6 lg:px-12 py-16 border-b border-stone-200">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
            <span className="text-[10px] font-sans font-bold tracking-[0.4em] uppercase text-stone-400 block mb-6">
              Sıkça Sorulan Sorular
            </span>
            <h1 className="text-7xl md:text-9xl font-serif text-black font-light leading-none">
              SSS
            </h1>
          </div>
          <p className="font-sans text-stone-500 max-w-md leading-relaxed pb-2">
            Sarıyer ve Maslak&apos;taki pet kuaför stüdyomuz hakkında merak edilenleri derledik.
            Cevabını bulamazsan WhatsApp&apos;tan yazabilirsin.
          </p>
        </div>
      </section>

      {/* KATEGORİ + İÇERİK */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">

          {/* Sol: Kategori — Roman numeral + label */}
          <div className="flex flex-row lg:flex-col gap-0 overflow-x-auto lg:overflow-visible border border-stone-200 lg:h-fit">
            {faqData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-4 px-6 py-5 text-left w-full border-b border-stone-200 last:border-b-0 transition-all duration-200 group
                  ${activeCategory === cat.id
                    ? "bg-stone-900 text-white"
                    : "bg-white text-stone-500 hover:bg-stone-50 hover:text-black"
                  }`}
              >
                <span className={`font-serif text-2xl w-10 flex-shrink-0 transition-colors ${
                  activeCategory === cat.id ? "text-[#DCCFCF]" : "text-stone-200 group-hover:text-stone-300"
                }`}>
                  {cat.numeral}
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.15em] uppercase whitespace-nowrap">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          {/* Sağ: Sorular */}
          <div>
            <div className="flex items-baseline gap-4 mb-10 pb-6 border-b border-stone-200">
              <span className="font-serif text-6xl text-stone-100">{active.numeral}</span>
              <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">
                {active.label}
              </span>
            </div>
            <div>
              {active.items.map((item, i) => (
                <FAQItem key={i} item={item} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-16 border-t border-stone-200 text-center">
        <p className="font-serif text-stone-400 mb-8 text-lg font-light">
          Hâlâ sorun mu var?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-black text-white rounded-none h-14 px-10 text-xs tracking-[0.2em] uppercase hover:!bg-white hover:!text-black border border-black transition-colors">
            <Link href="/contact">İletişime Geç</Link>
          </Button>
          <a
            href="https://wa.me/905368994374"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-10 text-xs font-sans font-bold tracking-[0.2em] uppercase border border-stone-300 text-stone-600 hover:border-black hover:text-black transition-colors"
          >
            WhatsApp&apos;tan Yaz
          </a>
        </div>
      </section>

      {/* İLETİŞİM KUTUSU */}
      <LocationFooterBox />

    </main>
  );
}