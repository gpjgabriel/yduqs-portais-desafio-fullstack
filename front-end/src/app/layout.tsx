import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primereact/resources/primereact.min.css";         
import "primeicons/primeicons.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
