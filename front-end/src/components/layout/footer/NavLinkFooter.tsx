"use-clinet";

import { useState } from "react";

export const NavLinksFooter = () => {
  const navLinks = {
    "A Estácio": [
      "Sobre a Estácio",
      "Unidades",
      "Sustentabilidade",
      "Regulamentos",
      "Instituições de Ensino",
      "Trabalhe na Estácio",
      "Convênios com Empresas",
      "Seja Parceiro",
      "Seja Fornecedor",
      "Imprensa",
    ],
    "Estude na Estácio": [
      "Por que nossa graduação?",
      "Por que nossa pós?",
      "Bolsas e financiamentos",
      "Carreiras",
      "Modelos de Ensino",
      "Formas de ingresso",
      "DIS",
      "Internacionalização",
      "Clube do aluno",
      "Informações e-MEC",
    ],
    Cursos: ["Graduação", "Pós-graduação", "Cursos Livres"],
    "Inscreva-se": [
      "Vestibular",
      "Enem",
      "Transferência",
      "2ª Graduação",
      "Pós-Graduação",
      "Mestrado e Doutorado",
      "Cursos livres",
    ],
    "Área do Aluno": [
      "Acessar área do aluno",
      "Aplicativo na App Store",
      "Aplicativo na Google Play",
    ],
    "Para Começar": [
      "Dicas de Estudo",
      "Ensino Digital",
      "Mercado de Trabalho",
      "Sou calouro",
      "Por que Estácio?",
    ],
    "Redes Sociais": ["Facebook", "Instagram", "LinkedIn", "Youtube"],
    "Fale com a Gente": ["Atendimento", "Ouvidoria"],
  };

  const FooterLinkColumn = ({
    title,
    links,
  }: {
    title: string;
    links: string[];
  }) => (
    <div className="flex flex-col items-start gap-3">
      <h3 className="mb-2 font-bold text-white">{title.toUpperCase()}</h3>
      {links.map((link) => (
        <a
          key={link}
          href="#"
          className="text-sm text-white/80 hover:text-white"
        >
          {link}
        </a>
      ))}
    </div>
  );

  const FooterAccordion = ({
    title,
    links,
  }: {
    title: string;
    links: string[];
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-4"
        >
          <span className="text-base font-medium">{title.toUpperCase()}</span>
          <i
            className={`pi ${isOpen ? "pi-chevron-up" : "pi-chevron-down"}`}
          ></i>
        </button>
        {isOpen && (
          <div className="flex flex-col items-start gap-3 pb-4">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-white/80 hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/*>>>>>>>>>>>> Mobile <<<<<<<<<<<<<< */}
      <div className="w-full md:hidden py-6 pb-6">
        {Object.entries(navLinks).map(([title, links]) => (
          <FooterAccordion key={title} title={title} links={links} />
        ))}
      </div>
      {/*>>>>>>>>> Desktop <<<<<<<<<*/}
      <div className="hidden w-full md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-8 md:py-8 md:pb-8">
        {Object.entries(navLinks).map(([title, links]) => (
          <FooterLinkColumn key={title} title={title} links={links} />
        ))}
      </div>
    </>
  );
};
