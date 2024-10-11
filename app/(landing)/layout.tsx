import Footer from "@/components/shared/landing/footer";
import Navbar from "@/components/shared/landing/navbar";
import { Toaster } from "@/components/ui/toaster";
import { Roboto } from "next/font/google";

const recursive = Roboto({ subsets: ["latin"], weight: "400" });

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={recursive.className}>
      <Navbar />

      <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
        <div className="flex-1 flex flex-col h-full">{children}</div>
        <Footer />
      </main>

      <Toaster />
    </div>
  );
}
