import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex h-16 items-center justify-between px-6 md:h-20 md:px-22 md:p-6">
        <Link href="/">
          <Image
            src="/logo-estacio-azul.svg"
            alt="Logo Estácio"
            width={159}
            height={40}
            className="h-8 w-auto md:h-10"
            priority
          />
        </Link>
      </div>
    </header>
  );
};
