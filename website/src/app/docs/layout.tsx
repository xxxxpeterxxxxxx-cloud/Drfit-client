import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="container-max py-12">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
