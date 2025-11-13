'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type CourseOffer } from './CourseOfferCard';

const formatCurrency = (value: string | number) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

interface OfferDetailsModalProps {
  offer: CourseOffer | null;
  onClose: () => void;
}

export const OfferDetailsModal = ({ offer, onClose }: OfferDetailsModalProps) => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (offer) {
      setSelectedPlanId(null);
      setOpenAccordion(null);

      document.body.classList.add('modal-open'); //Esconde o footer

    } else document.body.classList.remove('modal-open');

    return () => document.body.classList.remove('modal-open');
  }, [offer]);

  const handleToggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const isDigitalModal = offer?.modality === 'DIGITAL';

  const modalHeaderTemplate = (
    <div
      className="flex items-start justify-between shrink-0 border-b border-gray-300 h-18 py-4 pl-4 pr-2 md:h-24 md:py-6 md:pl-8 md:pr-4"
    >
      <h2
        className="font-medium text-gray-900 text-2xl md:text-3xl md:pt-2 w-full pr-6 md:pr-6"
      >
        Mais detalhes
      </h2>
      <button
        onClick={onClose}
        aria-label="Fechar"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white md:h-12 md:w-12 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <i className="pi pi-times text-xl text-gray-900"></i>
      </button>
    </div>
  );

  if (!isMounted || !offer) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-40 ${offer ? 'visible' : 'invisible'}`}
    >
      {/*>>>>>> Overlay <<<<<<<*/}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${offer ? 'opacity-50' : 'opacity-0'}`}
      />

      {/* >>>>>>>>> Sidebar <<<<<<<<<*/}
      <div
        className={`absolute right-0 top-0 bottom-0 z-50 h-full flex flex-col bg-white shadow-xl w-full md:w-[600px]!  transition-transform duration-300 ease-in-out ${offer ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/*>>>>>>>> Header <<<<<<<<*/}
        {modalHeaderTemplate}

        <div className="flex-1 overflow-y-auto">

          {isDigitalModal && (
            <div className="bg-[#144BC8] px-4 pb-4 text-white md:px-8 md:pb-6">
              <div className="flex flex-col items-start gap-2 pt-4 pb-2 md:pt-6 md:pb-4">
                <i
                  className="pi pi-info-circle shrink-0"
                  style={{ fontSize: '1.5rem' }}
                ></i>
                <p className="text-base font-normal leading-6">
                  Inscreva-se para saber tudo sobre os valores e garantir a sua
                  vaga!
                </p>
              </div>
            </div>
          )}

          {/* Tabela de Preços */}
          {!isDigitalModal && (
            <div className="px-4 md:px-8">
              <h3 className="text-base font-medium text-gray-900 py-4 md:pt-6 md:pb-4">
                Qual dessas opções de parcelas você prefere?
              </h3>
              <div className="rounded-lg border border-[#144BC8]">
                <div className="flex rounded-t-lg bg-[#144BC8] text-white">
                  <div className="w-2/3 px-4 py-2 text-base font-normal">
                    Parcelas
                  </div>
                  <div className="w-1/border-b-0-1/3 px-4 py-2 text-base font-normal">
                    Total
                  </div>
                </div>
                <div className="flex flex-col">
                  {offer.paymentPlans.map((plan, index, arr) => (
                    <label
                      key={plan.id}
                      htmlFor={plan.id.toString()}
                      className={`flex cursor-pointer items-center ${index < arr.length - 1 ? 'border-b border-[#144BC8]' : ''}`}
                    >
                      <div className="flex w-2/3 items-center gap-2 px-4 py-4 md:gap-4">
                        <input
                          type="radio"
                          id={plan.id.toString()}
                          name="payment-plan"
                          value={plan.id}
                          checked={selectedPlanId === plan.id}
                          onChange={() => setSelectedPlanId(plan.id)}
                          className="h-5 w-5 appearance-none rounded-full border-2 border-gray-700 checked:border-[6px] checked:border-gray-900 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {plan.description}
                        </span>
                      </div>
                      <div className="flex w-1/3 items-center px-4 py-4 text-sm font-normal text-gray-700/75">
                        {formatCurrency(plan.total)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

           {/*>>>>>>>>>>> Accordion <<<<<<<<<<<,*/}
          <div className="space-y-4 px-4 py-6 md:p-8">
            <div className="rounded-lg border border-gray-300">
              <button
                onClick={() => handleToggleAccordion('bolsa')}
                className="flex w-full items-center justify-between p-4 md:p-6 cursor-pointer"
              >
                <span className="text-base font-medium text-gray-900">
                  Sobre a Bolsa Incentivo
                </span>
                <i
                  className={`pi ${
                    openAccordion === 'bolsa' ? 'pi-minus' : 'pi-plus'
                  } text-gray-700`}
                ></i>
              </button>
              {openAccordion === 'bolsa' && (
                <div className="p-4 pt-0 md:px-6 md:pb-6">
                  <p>Aqui vai o conteúdo...</p>
                </div>
              )}
            </div>
            <div className="rounded-lg border border-gray-300">
              <button
                onClick={() => handleToggleAccordion('resumo')}
                className="flex w-full items-center justify-between p-4 md:p-6 cursor-pointer"
              >
                <span className="text-base font-medium text-gray-900">
                  Resumo das suas escolhas
                </span>
                <i
                  className={`pi ${
                    openAccordion === 'resumo' ? 'pi-minus' : 'pi-plus'
                  } text-gray-700`}
                ></i>
              </button>
              {openAccordion === 'resumo' && (
                <div className="p-4 pt-0 md:px-6 md:pb-6">
                  <p>Aqui vai o conteúdo...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*>>>>>>>>>>> Footer <<<<<<<<<<<,*/}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex flex-col gap-2 bg-white px-4 py-6 shadow-[0px_2px_10px_rgba(0,0,0,0.12)] md:px-8 md:py-6"
        >
          <button
            onClick={() => {
              router.push(
                `/inscricao?offerId=${offer.id}&planId=${selectedPlanId}`,
              );
            }}
            disabled={!isDigitalModal && !selectedPlanId}
            className="w-full rounded-lg bg-[#EE325D] p-3 text-base font-medium text-white disabled:opacity-50 disabled:bg-gray-300 cursor-pointer"
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
};