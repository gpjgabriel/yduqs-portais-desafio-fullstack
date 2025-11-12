import { EnrollmentForm } from "@/components/enrollment/EnrollmentForm";
import { HeroSection } from "@/components/hero/HeroSection";
import { Suspense } from "react";

const FormLoading = () => {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div className="h-14 w-full animate-pulse rounded bg-gray-200"></div>
      <div className="h-14 w-full animate-pulse rounded bg-gray-200"></div>
      <div className="h-14 w-full animate-pulse rounded bg-gray-200"></div>
    </div>
  );
};

export default function EnrollmentPage() {
  return (
    <main>
      <HeroSection
        title="Queremos saber mais um pouco sobre você"
        subtitle="Preencha seu nome completo, sem abreviações, igual ao seu documento de identificação. Confira o exemplo."
      />
      <section className="flex w-full justify-center bg-gray-100 px-6 py-10 md:px-22 md:pb-10">
        <Suspense fallback={<FormLoading />}>
          <EnrollmentForm />
        </Suspense>
      </section>
    </main>
  );
}
