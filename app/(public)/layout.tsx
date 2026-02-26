import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      
      <main className="flex-grow w-full">
        {children}
      </main>

      <FloatingWhatsApp />
      <Footer />
    </>
  );
}