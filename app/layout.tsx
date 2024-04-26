import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/SessionProvider";
import "./globals.css";
import Sidenav from '@/components/Sidenav';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DBMS Project",
  description: "Online MySQL workbench",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-white`}>
        <SessionProvider>
          <div className="h-screen flex overflow-auto">
            <Sidenav />
            {children}
          </div>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
