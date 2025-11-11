import React from "react";

export type Campus = {
  id: number;
  name: string;
  city: string;
  address: string;
};
export type Course = { id: number; name: string };

export type PaymentPlan = {
  id: number;
  installments: number;
  installmentValue: string;
  total: string;
  description: string;
};

export type CourseOffer = {
  id: number;
  modality: "PRESENCIAL" | "DIGITAL";
  listPrice: string;
  featuredFullPrice: string | null;
  course: Course;
  campus: Campus;
  paymentPlans: PaymentPlan[];
};

interface CourseOfferCardProps {
  offer: CourseOffer;
  onAvançarClick: (offer: CourseOffer) => void;
}

const formatCurrency = (value: string | number) => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const CourseOfferCard = ({
  offer,
  onAvançarClick,
}: CourseOfferCardProps) => {
  const mainPlan = offer.paymentPlans.find((p) => p.installments === 18);

  const isDigitalCard = offer.modality === "DIGITAL";

  return (
    <div className="flex flex-col rounded-lg border border-[#144BC8] bg-white shadow-lg">
      <div className="flex flex-row items-center gap-2 rounded-t-lg bg-[#001F66] px-6 py-2">
        <span className="text-base font-medium text-white">
          {offer.modality === "PRESENCIAL" ? "Presencial" : "Digital (EaD)"}
        </span>

        {offer.modality === "PRESENCIAL" && (
          <>
            <div className="h-4 w-px bg-white/50"></div>
            <span className="text-base font-medium text-white">Manhã</span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col bg-[#144BC8] p-6">
        {/* CARD DIGITAL */}
        {isDigitalCard ? (
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-start gap-2">
              <i
                className="pi pi-info-circle text-white"
                style={{ fontSize: "1.5rem" }}
              ></i>
              <p className="font-normal text-sm leading-tight text-white">
                Inscreva-se para saber tudo sobre os valores e garantir a sua
                vaga!
              </p>
            </div>
            <div className="flex-1"></div>
          </div>
        ) : (
          // CARD PRESENCIAL
          <div className="flex flex-1 flex-col">
            <div className="flex flex-col">
              <p className="text-base font-medium text-white/90">
                <span className="line-through">
                  De {formatCurrency(offer.listPrice)}
                </span>{" "}
                por até
              </p>
              <div className="mt-1 flex items-end">
                <span className="align-text-bottom text-base font-medium text-white">
                  {mainPlan?.installments}x
                </span>
                <span className="mx-1 text-4xl font-semibold leading-none text-white md:text-5xl">
                  {mainPlan
                    ? formatCurrency(mainPlan.installmentValue).replace(
                        "R$",
                        ""
                      )
                    : "N/D"}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-white/90">
                à vista{" "}
                {offer.featuredFullPrice
                  ? formatCurrency(offer.featuredFullPrice)
                  : "N/D"}
              </p>
            </div>
            <div className="flex-1"></div>
          </div>
        )}

        <button
          onClick={() => onAvançarClick(offer)}
          className="
            mt-6 flex h-12 w-full items-center justify-center rounded-lg 
            bg-[#EE325D] px-6 font-medium text-white
            transition-colors hover:bg-red-600
          "
        >
          Avançar
        </button>
      </div>

      <div className="flex flex-col gap-1 rounded-b-lg bg-white p-6">
        <p className="text-sm font-medium text-gray-900">
          {offer.campus.city} - {offer.campus.name}
        </p>
        <p className="truncate text-sm font-normal leading-tight text-gray-700">
          {offer.campus.address}
        </p>
      </div>
    </div>
  );
};
