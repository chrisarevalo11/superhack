import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

import "./globals.css";
import Providers from "@/lib/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyFarm",
  description:
    "Empowering Farmers with Transparent and Milestone-Based Funding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </>
        </Providers>
      </body>
    </html>
  );
}
