'use client';

import { useState, useEffect } from 'react';
import {
  CourseOfferCard,
  type CourseOffer,
} from './CourseOfferCard';
import { OfferDetailsModal } from './OfferDetailsModal';
import { CourseOfferCardSkeleton } from './CourseOfferCardSkeleton';

async function getCourseOffers(): Promise<CourseOffer[]> {
  try {
    const res = await fetch('http://localhost:3000/course-offers');
    if (!res.ok) throw new Error('Dados inexistentes!');
    return res.json();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
}

export const CourseOfferSection = () => {
  const [offers, setOffers] = useState<CourseOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<CourseOffer | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getCourseOffers()
      .then((data) => {
        setOffers(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAvançarClick = (offer: CourseOffer) => setSelectedOffer(offer);
  const handleCloseModal = () => setSelectedOffer(null);

  return (
    <section className="w-full flex-1 bg-gray-100">

      <div className="hidden md:block w-full px-4 pt-6 pb-6 md:px-22 md:pt-8 md:pb-4">
        {isLoading ? (
          <p className="text-sm font-normal text-gray-700">Carregando...</p>
        ) : (
          <p className="text-sm font-normal text-gray-900">
            {offers.length} {offers.length === 1 ? 'opção encontrada' : 'opções encontradas'}
          </p>
        )}
      </div>

      {/* >>>>>>>>>> Cards <<<<<<<<<<*/}
      <div className="w-full px-4 p-6 md:px-22 md:pb-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              <CourseOfferCardSkeleton />
              <CourseOfferCardSkeleton />
            </>
          ) : (
            offers.map((offer) => (
              <CourseOfferCard
                key={offer.id}
                offer={offer}
                onAvançarClick={handleAvançarClick}
              />
            ))
          )}
        </div>
        
        {!isLoading && offers.length === 0 && (
          <p className="text-center text-red-500">
            Nenhuma oferta encontrada.
          </p>
        )}
      </div>

      {/*>>>>>>>>>>>>> Sidebar <<<<<<<<<<<<*/}
      <OfferDetailsModal
        offer={selectedOffer}
        onClose={handleCloseModal}
      />
    </section>
  );
};