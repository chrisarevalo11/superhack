import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { WagmiProvider } from "wagmi";
import { celoAlfajores, celo } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Providers } from "@/lib/Providers";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

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
            <Footer />
          </>
        </Providers>
      </body>
    </html>
  );
}
