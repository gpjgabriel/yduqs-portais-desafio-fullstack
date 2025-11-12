"use client";

import Image from "next/image";

export const SubLinksFooter = () => {
  const cssLink = "text-sm text-white/80 hover:text-white";

  return (
    <div className="flex w-full flex-col-reverse items-start py-6 gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-start gap-2">
        <a href="#" className={cssLink}>
          Política de privacidade
        </a>
        <a href="#" className={cssLink}>
          Código de Ética
        </a>
        <a href="#" className={cssLink}>
          Preferências de cookies
        </a>
        <a href="#" className={cssLink}>
          Mapa do site
        </a>
      </div>

      <div className="flex w-full max-w-sm flex-row items-center gap-4 rounded-3xl bg-white p-4 md:w-66 md:bg-white/10 md:p-4">
        <p className="flex-1 text-sm font-semibold leading-normal text-gray-900 md:text-base md:font-bold md:text-white">
          Consulte aqui o cadastro da Instituição no Sistema e-MEC
        </p>

        <div className="flex flex-col items-center">
          <Image
            src="qrCode.svg"
            alt="QR Code e-MEC"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
