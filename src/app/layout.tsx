import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joy IT Solutions",
  description: "Joy IT Solutions is a leading technology solutions provider, delivering innovative software, IT services, and consulting to businesses worldwide. We help organizations navigate digital transformation, optimize operations, and achieve sustainable growth through cutting-edge technology solutions.",
};


import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-black text-white dark font-sans">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
