import { HeroSection } from "@/components/common/HeroSection";
import { CourseOfferSection } from "@/components/offers/CourseOfferSection";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection
          title="Vamos começar, escolha as opções do seu curso"
          subtitle="Use os filtros para saber o preço do seu curso e fazer sua inscrição."
        />
        <CourseOfferSection />
      </main>
    </div>
  );
}
