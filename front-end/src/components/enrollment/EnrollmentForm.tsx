"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@mui/material";
import { Dayjs } from "dayjs";

import {
  MuiTextInput,
  MuiMaskedInput,
  MuiDateInput,
  MuiCheckbox,
} from "@/components/common/FormInputs";

const enrollmentSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "O nome deve ser completo (nome e sobrenome)",
    }),
  cpf: z
    .string()
    .min(1, "O CPF é obrigatório")
    .refine((val) => val.replace(/\D/g, "").length === 11, {
      message: "CPF inválido (deve ter 11 dígitos)",
    }),
  birthDate: z.preprocess(
    (val) => {
      if (val instanceof Date && !isNaN(val.getTime())) return val;
      return undefined;
    },
    z
      .date({ message: "A data de nascimento é obrigatória" })
      .refine((val) => val <= new Date(), {
        message: "A data de nascimento não pode ser futura",
      })
  ),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  phone: z
    .string()
    .min(1, "O celular é obrigatório")
    .refine((val) => val.replace(/\D/g, "").length === 11, {
      message: "Celular inválido (deve ter 11 dígitos)",
    }),
  highSchoolYear: z
    .string()
    .min(4, "O ano é obrigatório")
    .refine((val) => parseInt(val, 10) <= new Date().getFullYear(), {
      message: "O ano de conclusão não pode ser futuro",
    }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos",
  }),
  updatesAccepted: z.boolean().optional(),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

export const EnrollmentForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [offerId, setOfferId] = useState<number | null>(null);
  const [planId, setPlanId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(enrollmentSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      cpf: "",
      birthDate: null,
      email: "",
      phone: "",
      highSchoolYear: "",
      termsAccepted: false,
      updatesAccepted: false,
    },
  });

  useEffect(() => {
    setOfferId(Number(searchParams.get("offerId")));
    setPlanId(Number(searchParams.get("planId")));
  }, [searchParams]);

  const onSubmit = async (data: EnrollmentFormData) => {
    console.log("Birthdate enviada:", data.birthDate);
    if (!offerId || !planId) {
      setServerError("IDs da oferta ou plano não encontrados.");
      return;
    }
    setIsLoading(true);
    setServerError(null);

    const enrollmentData = {
      courseOfferId: offerId,
      paymentPlanId: planId,
      student: {
        name: data.name,
        email: data.email,
        cpf: data.cpf.replace(/\D/g, ""),
        birthDate: data.birthDate?.toISOString(),
        phone: data.phone.replace(/\D/g, ""),
        highSchoolGraduationYear: parseInt(data.highSchoolYear, 10),
      },
    };

    try {
      const response = await fetch("http://localhost:3000/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrollmentData),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Falha ao criar matrícula.");
      }
      router.push("/sucesso");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-2xl flex-col gap-6"
    >
      <div className="flex flex-col gap-8">
        <MuiTextInput
          name="name"
          label="Nome completo"
          control={control}
          error={errors.name}
          helperText={
            <span>
              Preencha seu nome completo, sem abreviações, igual ao seu
              documento de identificação.{" "}
              <a className="underline cursor-pointer">Confira o exemplo.</a>
            </span>
          }
        />

        <MuiMaskedInput
          name="cpf"
          label="CPF"
          control={control}
          error={errors.cpf}
          mask="000.000.000-00"
        />

        <MuiDateInput
          name="birthDate"
          label="Data de nascimento"
          control={control}
          error={errors.birthDate}
        />

        <MuiTextInput
          name="email"
          label="E-mail"
          control={control}
          error={errors.email}
        />

        <MuiMaskedInput
          name="phone"
          label="Celular para contato"
          control={control}
          error={errors.phone}
          mask="(00) 00000-0000"
        />

        <MuiMaskedInput
          name="highSchoolYear"
          label="Ano de conclusão do ensino médio"
          control={control}
          error={errors.highSchoolYear}
          mask="0000"
        />

        <div className="flex flex-col gap-4">
          <MuiCheckbox
            name="termsAccepted"
            control={control}
            error={errors.termsAccepted}
            label={
              <span>
                Li e concordo com os{" "}
                <a href="#" className="underline">
                  termos do edital
                </a>
                , bem como com o tratamento dos meus dados...
              </span>
            }
          />
          <MuiCheckbox
            name="updatesAccepted"
            control={control}
            error={errors.updatesAccepted}
            label="Aceito receber atualizações sobre minha inscrição pelo WhatsApp."
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isLoading}
          sx={{
            height: "48px",
            width: "110px",
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 500,
            backgroundColor: "#144BC8",
            "&:hover": {
              backgroundColor: "#103a9f",
            },
            "&:disabled": {
              backgroundColor: "#E0E0E0",
              color: "#121212",
              opacity: 0.7,
            },
          }}
        >
          {isLoading ? "Enviando..." : "Avançar"}
        </Button>
        {serverError && (
          <span className="text-sm text-red-500">{serverError}</span>
        )}
      </div>
    </form>
  );
};
