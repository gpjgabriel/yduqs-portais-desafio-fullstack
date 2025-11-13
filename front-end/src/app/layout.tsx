import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";      
import "primeicons/primeicons.css";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import ThemeRegistry from "@/components/theme/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teste YDUQS",
  description: "Teste Técnico YDUQS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter} antialiased`}
      >
        <ThemeRegistry>
          <Header />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
