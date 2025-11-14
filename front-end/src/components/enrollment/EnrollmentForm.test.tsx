import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EnrollmentForm } from "./EnrollmentForm";
import "@testing-library/jest-dom";

const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams({
  offerId: "1",
  planId: "10",
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => mockSearchParams,
}));

global.fetch = jest.fn();

jest.mock("@/components/common/FormInputs", () => ({
  MuiTextInput: (props: any) => {
    const { label, name, error } = props;
    return (
      <div>
        <label>{label}</label>
        <input data-testid={name} aria-label={label} />
        {error && <span>{error.message}</span>}
      </div>
    );
  },

  MuiMaskedInput: (props: any) => {
    const { label, name, error } = props;
    return (
      <div>
        <label>{label}</label>
        <input data-testid={name} aria-label={label} />
        {error && <span>{error.message}</span>}
      </div>
    );
  },

  MuiDateInput: (props: any) => {
    const { label, name, error } = props;
    return (
      <div>
        <label>{label}</label>
        <input type="date" data-testid={name} aria-label={label} />
        {error && <span>{error.message}</span>}
      </div>
    );
  },

  MuiCheckbox: (props: any) => {
    const { label, name, error } = props;
    return (
      <div>
        <label>{label}</label>
        <input type="checkbox" data-testid={name} aria-label={label} />
        {error && <span>{error.message}</span>}
      </div>
    );
  },
}));

describe("EnrollmentForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Verifica se o formulário foi renderizado
  it("Verifica se todos os campos do formulário foram renderizados", () => {
    render(<EnrollmentForm />);

    expect(screen.getByLabelText("Nome completo")).toBeInTheDocument();
    expect(screen.getByLabelText("CPF")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de nascimento")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Celular para contato")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ano de conclusão do ensino médio")
    ).toBeInTheDocument();
    expect(screen.getByText(/Li e concordo/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "Aceito receber atualizações sobre minha inscrição pelo WhatsApp."
      )
    ).toBeInTheDocument();
  });
});
