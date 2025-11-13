import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CourseOfferSection } from "./CourseOfferSection";
import { CourseOffer } from "./CourseOfferCard";

jest.mock("./CourseOfferCardSkeleton", () => ({
  CourseOfferCardSkeleton: () => <div data-testid="skeleton" />,
}));

jest.mock("./OfferDetailsModal", () => ({
  OfferDetailsModal: ({
    offer,
    onClose,
  }: {
    offer: CourseOffer | null;
    onClose: () => void;
  }) => {
    if (!offer) return null;
    return (
      <div data-testid="mock-modal">
        Modal para a oferta: {offer.course.name}
        <button aria-label="Fechar" onClick={onClose} />
      </div>
    );
  },
}));

global.fetch = jest.fn();

// >>>>>>>>>>>> MOCKS DOS DADOS <<<<<<<<<<<<<<<<<<

const MOCK_DATA: CourseOffer[] = [
  {
    id: 1,
    modality: "PRESENCIAL",
    listPrice: "4752.00",
    featuredFullPrice: "2613.60",
    course: { id: 1, name: "Administração" },
    campus: {
      id: 1,
      name: "VILA INDUSTRIAL",
      city: "CAMPINAS",
      address: "AV. DAS AMÉRICAS, TOM 200",
    },
    paymentPlans: [
      {
        id: 1,
        installments: 18,
        installmentValue: "169.95",
        total: "3059.10",
        description: "18x R$ 169,95",
      },
      {
        id: 2,
        installments: 1,
        installmentValue: "2613.60",
        total: "2613.60",
        description: "1x R$ 2.613,60",
      },
    ],
  },
  {
    id: 2,
    modality: "DIGITAL",
    listPrice: "1500.00",
    featuredFullPrice: null,
    course: { id: 1, name: "Engenharia de Software" },
    campus: {
      id: 2,
      name: "BARRA DA TIJUCA",
      city: "RIO DE JANEIRO",
      address: "AV...",
    },
    paymentPlans: [],
  },
];

// >>>>>>>>>>>> MOCKS DOS DADOS <<<<<<<<<<<<<<<<<<

describe("CourseOfferSection", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    jest.clearAllMocks();
  });

  it("Verifica se os skeletons dos cards estão na tela durante o loading", async () => {
    // Simula uma chamada não respondida da API
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    render(<CourseOfferSection />);

    // Verifica se os skeletons estão na tela
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);

    // Verifica se o contador de ofertas NÃO está na tela
    expect(screen.queryByText(/opção encontrada/)).not.toBeInTheDocument();

    // Depois de carregar o contador deve aparecer com nenhuma oferta
    await waitFor(() => {
      expect(
        screen.getByText(/Nenhuma oferta encontrada/i)
      ).toBeInTheDocument();
    });
  });

  it("Verifica se os cards são carregados corretamente após o loading", async () => {
    // Simula uma resposta bem-sucedida da API com 2 ofertas
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => MOCK_DATA,
    });

    render(<CourseOfferSection />);

    // Verifica se o texto do contador está correto
    const countText = await screen.findByText("2 opções encontradas");
    expect(countText).toBeInTheDocument();

    // Verifica se a quantidade de cards renderizados está correta
    const cards = screen.getAllByRole("button", { name: "Avançar" });
    expect(cards).toHaveLength(2);

    // Verifica se os skeletons sumiram
    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
  });

  it('Verifica se o modal Sidebar abre corretamente após clicar no botão "Avançar" dos cards', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => MOCK_DATA,
    });

    render(<CourseOfferSection />);

    await screen.findByText("2 opções encontradas");

    // Verifica se o modal está fechado
    expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();

    const avançarButtons = screen.getAllByRole("button", { name: "Avançar" });

    // Clica no card PRESENCIAL
    fireEvent.click(avançarButtons[0]);

    // Espera o modal aparecer
    const modal = await screen.findByTestId("mock-modal");

    // Verifica se o modal abriu com os dados do card PRESENCIAL
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent("Modal para a oferta: Administração");

    // Clica no card DIGITAL
    fireEvent.click(avançarButtons[1]);

    // Espera o conteúdo do modal ser atualizado
    await waitFor(() => {
      expect(screen.getByTestId("mock-modal")).toHaveTextContent(
        "Modal para a oferta: Engenharia de Software"
      );
    });
  });

  it("Verifica se o modal Sidebar fecha ao clicar no botão (X) pra fechar", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => MOCK_DATA,
    });

    render(<CourseOfferSection />);
    await screen.findByText("2 opções encontradas");

    const avançarButtons = screen.getAllByRole("button", { name: "Avançar" });
    fireEvent.click(avançarButtons[0]);

    // Verifica se o modal abriu
    const modal = await screen.findByTestId("mock-modal");
    expect(modal).toBeInTheDocument();

    // Verifica se o botão "Fechar" existe
    const fecharButton = screen.getByRole("button", { name: "Fechar" });

    // Clica no botão "Fechar"
    fireEvent.click(fecharButton);

    // Verifica se o modal fechou
    await waitFor(() => {
      expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
    });
  });
});
