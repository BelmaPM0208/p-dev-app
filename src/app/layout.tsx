import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/ui/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Personal Dev Tracker",
  description: "Track physical, mental, personal, and professional growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-[100dvh] flex flex-col mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-2xl relative overflow-hidden bg-black/50">
        {/* Background ambient glow effect */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
        
        <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide z-10 relative">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
