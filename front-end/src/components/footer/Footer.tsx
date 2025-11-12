"use client";

import Image from "next/image";
import Link from "next/link";
import { FooterContacts } from "./FooterContacts";

// Logo
const LogoBlock = () => (
  <Link href="/">
    <Image
      src="/logo-estacio-branca.svg"
      alt="Logo Estácio"
      width={159}
      height={40}
      className="h-8 w-auto md:h-10"
    />
  </Link>
);

export const Footer = () => {
  return (
    <footer
      className={`
        relative w-full text-white bg-[#001F66]
        px-4 py-4 pb-6
        md:px-22 md:py-6
      `}
    >
      {/* Overlay Branco */}
      <div
        className={"absolute inset-0 bg-white opacity-10"}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        <div className="flex w-full flex-col items-start gap-6">
          {/* Header (Logo e Contato) */}
          <div className="flex w-full flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
            <LogoBlock />
            <FooterContacts />
          </div>
        </div>
      </div>
    </footer>
  );
};
