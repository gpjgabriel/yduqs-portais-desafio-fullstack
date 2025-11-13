"use client";

import Link from "next/link";

export const PrivacyLinkFooter = () => {
  return (
    <div className="flex w-full flex-col items-start gap-1 md:w-auto md:flex-row md:items-center md:gap-4">
      <Link
        href="/politica-de-privacidade"
        className="text-base text-white opacity-90 transition-opacity hover:opacity-100"
      >
        Política de privacidade
      </Link>

      {/*>>>>> Cookies (mob) <<<<<<<<*/}
      <Link
        href="/preferencias-de-cookies"
        className="text-base text-white opacity-90 transition-opacity hover:opacity-100 md:hidden"
      >
        Preferências de cookies
      </Link>

      {/*>>>>>>>>> Direitos (mob) <<<<<<<<*/}
      <div className="h-px w-full bg-white/20 my-5 md:hidden" />
      <span className="text-base text-white opacity-90 md:hidden">
        Estácio Brasil - Todos os direitos reservados
      </span>
      {/*>>>> Direitos (desktop) <<<<<<<<<*/}
      <div className="hidden h-4 w-px bg-white opacity-80 md:block" />
      <span className="hidden text-sm text-white opacity-70 md:block">
        Estácio Brasil – Todos os direitos reservados
      </span>
    </div>
  );
};
