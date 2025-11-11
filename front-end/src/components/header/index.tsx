import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
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
