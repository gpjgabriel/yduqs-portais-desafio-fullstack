"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextInput,
  MaskedInput,
  CheckboxInput,
} from "@/components/common/FormInputs";

const enrollmentSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "O nome deve ser completo - Nome e Sobrenome)",
    }),
  cpf: z
    .string()
    .min(1, "O CPF é obrigatório")
    .refine((val) => val.replace(/\D/g, "").length === 11, {
      message: "CPF inválido",
    }),
  birthDate: z
    .string()
    .min(10, "A data de nascimento é obrigatória")
    .refine(
      (val) => {
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return false;

        const [day, month, year] = val.split("/").map(Number);
        const dateObj = new Date(year, month - 1, day);

        return (
          dateObj.getFullYear() === year &&
          dateObj.getMonth() === month - 1 &&
          dateObj.getDate() === day &&
          dateObj <= new Date()
        );
      },
      {
        message: "Data de nascimento inválida ou futura",
      }
    ),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("E-mail inválido"),
  phone: z
    .string()
    .min(1, "O celular é obrigatório")
    .refine((val) => val.replace(/\D/g, "").length === 11, {
      message: "Celular inválido",
    }),
  highSchoolYear: z
    .string()
    .min(4, "O ano é obrigatório")
    .refine((val) => parseInt(val, 10) <= new Date().getFullYear(), {
      message: "Ano de conclusão inválido",
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
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      cpf: "",
      birthDate: "",
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
    if (!offerId || !planId) {
      setServerError(
        "IDs da oferta ou plano não encontrados. Volte e tente novamente."
      );
      return;
    }
    setIsLoading(true);
    setServerError(null);

    const [day, month, year] = data.birthDate.split("/").map(Number);
    const isoDate = new Date(year, month - 1, day).toISOString();

    const enrollmentData = {
      courseOfferId: offerId,
      paymentPlanId: planId,
      student: {
        name: data.name,
        email: data.email,
        cpf: data.cpf.replace(/\D/g, ""),
        birthDate: isoDate,
        phone: data.phone.replace(/\D/g, ""),
        highSchoolGraduationYear: parseInt(data.highSchoolYear, 10),
      },
    };

    setIsLoading(true);
    setServerError(null);

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
      className="flex w-full max-w-2xl flex-col gap-8"
    >
      <div className="flex flex-col gap-6">
        <TextInput
          name="name"
          label="Nome completo"
          register={register}
          error={errors.name}
          helperText="Preencha seu nome completo, sem abreviações, igual ao seu documento..."
        />

        <MaskedInput
          name="cpf"
          label="CPF"
          control={control}
          error={errors.cpf}
          mask="000.000.000-00"
        />

        <MaskedInput
          name="birthDate"
          label="Data de nascimento"
          control={control}
          error={errors.birthDate}
          mask="00/00/0000"
        />

        <TextInput
          name="email"
          label="E-mail"
          type="email"
          register={register}
          error={errors.email}
        />

        <MaskedInput
          name="phone"
          label="Celular para contato"
          control={control}
          error={errors.phone}
          mask="(00) 00000-0000"
        />

        <MaskedInput
          name="highSchoolYear"
          label="Ano de conclusão do ensino médio"
          control={control}
          error={errors.highSchoolYear}
          mask="0000"
        />

        <div className="flex flex-col gap-6">
          <CheckboxInput
            name="termsAccepted"
            register={register}
            error={errors.termsAccepted}
            label={
              <>
                Li e concordo com os{" "}
                <a href="#" className="underline">
                  termos do edital
                </a>
                , bem como com o tratamento dos meus dados para fins de
                prospecção...
              </>
            }
          />
          <CheckboxInput
            name="updatesAccepted"
            register={register}
            error={errors.updatesAccepted}
            label="Aceito receber atualizações sobre minha inscrição pelo WhatsApp."
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="flex items-center justify-center h-12 w-28 rounded-lg px-6 py-4 text-base font-medium text-white bg-[#144BC8] hover:bg-blue-800 disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-70 cursor-pointer"
        >
          {isLoading ? "Enviando..." : "Avançar"}
        </button>
        {serverError && (
          <span className="text-sm text-red-500">{serverError}</span>
        )}
      </div>
    </form>
  );
};
