import { HeroSection } from "@/components/hero/HeroSection";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main>
      <HeroSection
        title="Parabéns! Sua inscrição foi realizada."
        subtitle="Recebemos seus dados e em breve entraremos em contato."
      />
      <section className="flex w-full justify-center bg-gray-100 px-6 py-10 md:px-22 md:pb-10">
        <div className="flex w-full max-w-2xl flex-col items-center gap-8 rounded-lg bg-white p-8 shadow">
          <i
            className="pi pi-check-circle text-6xl text-green-500"
            aria-hidden="true"
          ></i>

          <h2 className="text-center text-2xl font-medium text-gray-900">
            Inscrição confirmada!
          </h2>

          <p className="text-center text-base text-gray-700">
            Seus dados foram enviados com sucesso. Aguarde o e-mail para seguir
            os próximos passos.
          </p>

          <Link
            href="/"
            className="h-12 justify-center rounded-lg bg-[#144BC8] px-6 text-base font-medium text-white flex items-center hover:bg-blue-800 transition-colors"
          >
            Voltar para o início
          </Link>
        </div>
      </section>
    </main>
  );
}
