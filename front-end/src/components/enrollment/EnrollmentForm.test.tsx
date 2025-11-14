import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { EnrollmentForm } from "./EnrollmentForm";
import { Controller } from "react-hook-form";

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

// MOCK dos inputs
jest.mock("@/components/common/FormInputs", () => ({
  MuiTextInput: ({ name, label, control, error }: any) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <label>{label}</label>
          <input
            data-testid={name}
            aria-label={label}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
          />
          {error && <span>{error.message}</span>}
        </div>
      )}
    />
  ),

  MuiMaskedInput: ({ name, label, control, error }: any) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <label>{label}</label>
          <input
            data-testid={name}
            aria-label={label}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
          />
          {error && <span>{error.message}</span>}
        </div>
      )}
    />
  ),

  MuiDateInput: ({ name, label, control, error }: any) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <label>{label}</label>
          <input
            type="date"
            data-testid={name}
            aria-label={label}
            value={
              field.value
                ? new Date(field.value).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => {
              const dateStr = e.target.value;
              const date = dateStr ? new Date(dateStr) : null;
              field.onChange(date);
            }}
          />
          {error && <span>{error.message}</span>}
        </div>
      )}
    />
  ),

  MuiCheckbox: ({ name, label, control, error }: any) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <label>{label}</label>
          <input
            type="checkbox"
            data-testid={name}
            aria-label={label}
            checked={field.value ?? false}
            onChange={(e) => field.onChange(e.target.checked)}
          />
          {error && <span>{error.message}</span>}
        </div>
      )}
    />
  ),
}));

describe("EnrollmentForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renderiza todos os campos corretamente", () => {
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

  it("Botão começa desabilitado e exibe erros ao tentar enviar vazio", async () => {
    render(<EnrollmentForm />);

    const form = screen.getByTestId("enrollment-form");
    const submitButton = screen.getByRole("button", { name: "Avançar" });

    expect(submitButton).toBeDisabled();

    await act(async () => {
      fireEvent.submit(form);
    });

    expect(await screen.findByText("O nome é obrigatório")).toBeInTheDocument();
    expect(await screen.findByText("O CPF é obrigatório")).toBeInTheDocument();
    expect(
      await screen.findByText("A data de nascimento é obrigatória")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("O e-mail é obrigatório")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("O celular é obrigatório")
    ).toBeInTheDocument();
  });

  it("Habilita o botão 'Avançar' após preencher todos os campos corretamente", async () => {
    render(<EnrollmentForm />);

    const nameInput = screen.getByTestId("name");
    const cpfInput = screen.getByTestId("cpf");
    const birthDateInput = screen.getByTestId("birthDate");
    const emailInput = screen.getByTestId("email");
    const phoneInput = screen.getByTestId("phone");
    const highSchoolYearInput = screen.getByTestId("highSchoolYear");
    const termsCheckbox = screen.getByTestId("termsAccepted");

    const submitButton = screen.getByRole("button", { name: "Avançar" });

    expect(submitButton).toBeDisabled();

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Gabriel Paiva" } });
      fireEvent.change(cpfInput, { target: { value: "123.456.789-09" } });
      fireEvent.change(birthDateInput, { target: { value: "1989-11-27" } });
      fireEvent.change(emailInput, {
        target: { value: "gpj_gabriel@hotmail.com" },
      });
      fireEvent.change(phoneInput, { target: { value: "(62) 98583-5123" } });
      fireEvent.change(highSchoolYearInput, { target: { value: "2012" } });
      fireEvent.click(termsCheckbox);
    });

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });
});
