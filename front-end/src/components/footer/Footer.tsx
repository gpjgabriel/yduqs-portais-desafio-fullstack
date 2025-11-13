"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FooterContacts } from "./FooterContacts";
import { SubLinksFooter } from "./SubLinkesFooter";
import { NavLinksFooter } from "./NavLinkFooter";

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
  const pathname = usePathname();
  const isEnrollmentPage = pathname.startsWith("/inscricao");

  return (
    <footer
      className={`relative w-full text-white bg-[#001F66] p-4 md:px-22 md:py-6`}
    >
      {/* Overlay Branco */}
      <div
        className={`
          absolute max-h-16 md:max-h-22 inset-0 bg-white opacity-10
          ${isEnrollmentPage ? "md:hidden" : ""}
        `}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        {isEnrollmentPage ? (
          // PÁGINA DE INSCRIÇÃO
          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
              <div className="md:hidden">
                {/*  Sem logo no Desktop */}
                <LogoBlock />
              </div>
              <FooterContacts />
            </div>
          </div>
        ) : (
          // HOME (COMPLETO)
          <div className="flex w-full flex-col items-start gap-6">
            {/* Header (Logo + Contato) */}
            <div className="flex w-full flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
              <LogoBlock />
              <FooterContacts />
            </div>
            <NavLinksFooter />
            <div className="h-px w-full bg-white/90" /> {/*  divider */}
            <SubLinksFooter />
            {/* Direitos Reservados */}
            <div className="h-px w-full bg-white/90" /> {/*  divider */}
            <span className="text-base font-normal text-white">
              Estácio Brasil - Todos os direitos reservados
            </span>
          </div>
        )}
      </div>
    </footer>
  );
};
