import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-neutral-100">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Gavgav Pet Kuaför
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Patili dostlarınız için profesyonel bakım, sevgi dolu dokunuşlar
            ve hijyenik hizmetler.
          </p>

          <div className="flex justify-center gap-4">
  <Link href="/appointment">
    <Button size="lg">Randevu Al</Button>
  </Link>

  <Link href="/services">
    <Button variant="outline" size="lg">
      Hizmetlerimiz
    </Button>
  </Link>
</div>

        </div>
      </section>
      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Hizmetlerimiz
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-2xl border p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <h3 className="mb-2 text-xl font-semibold">Yıkama & Bakım</h3>
            <p className="text-gray-600">
              Cilt dostu ürünlerle hijyenik temizlik.
            </p>
          </div>

          <div className="rounded-2xl border p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <h3 className="mb-2 text-xl font-semibold">Tıraş</h3>
            <p className="text-gray-600">
              Irkına ve isteğinize uygun profesyonel tıraş.
            </p>
          </div>

          <div className="rounded-2xl border p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <h3 className="mb-2 text-xl font-semibold">Tırnak & Kulak</h3>
            <p className="text-gray-600">
              Sağlık ve konfor odaklı bakım.
            </p>
          </div>
        </div>
      </section>
      </main>
  );
}
