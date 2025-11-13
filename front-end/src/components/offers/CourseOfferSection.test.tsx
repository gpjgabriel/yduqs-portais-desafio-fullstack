import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { CourseOfferSection } from "./CourseOfferSection";

jest.mock("./CourseOfferCardSkeleton", () => ({
  CourseOfferCardSkeleton: () => <div data-testid="skeleton" />,
}));

global.fetch = jest.fn();

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
});
