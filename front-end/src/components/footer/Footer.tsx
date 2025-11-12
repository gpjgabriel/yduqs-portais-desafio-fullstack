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

// import Image from "next/image";
// import Link from "next/link";

// export const Footer = () => {
//   return (
//     <footer className="w-full bg-blue-900 text-white md:px-22 py-6">
//       <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-center">
//         <Link href="/">
//           <Image
//             src="/logo-estacio-branca.svg"
//             alt="Logo Estácio"
//             width={159}
//             height={40}
//             className="h-8 w-auto md:h-10"
//           />
//         </Link>

//         <div
//           className="
//             flex flex-col items-start gap-6
//             md:flex-row md:items-center
//           "
//         >
//           <a
//             href="tel:08007715055"
//             className="
//               flex items-center gap-4
//               transition-opacity hover:opacity-80
//             "
//           >
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
//               <i
//                 className="pi pi-phone text-blue-900"
//                 style={{ fontSize: "1.25rem" }}
//               ></i>
//             </div>
//             <span className="font-semibold">0800 771 5055</span>
//           </a>

//           <a
//             href="https://wa.me/..."
//             target="_blank"
//             rel="noopener noreferrer"
//             className="
//               flex items-center gap-4 // Gap entre o círculo e o texto
//               transition-opacity hover:opacity-80
//             "
//           >
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3BCE57]">
//               <i
//                 className="pi pi-whatsapp text-white"
//                 style={{ fontSize: "1.25rem" }}
//               ></i>
//             </div>
//             <span className="font-semibold">Precisa de ajuda?</span>
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };
