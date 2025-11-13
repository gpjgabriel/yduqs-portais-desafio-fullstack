import React from 'react';
import { render, screen } from '@testing-library/react';
import { CourseOfferCard, type CourseOffer } from './CourseOfferCard';

// >>>>>>>>>>>> MOCKS DOS DADOS <<<<<<<<<<<<<<<<<<

const MOCK_OFFER_PRESENCIAL: CourseOffer = {
  id: 1,
  modality: 'PRESENCIAL',
  listPrice: '4752.00',
  featuredFullPrice: '2613.60',
  course: { id: 1, name: 'Administração' },
  campus: { id: 1, name: 'VILA INDUSTRIAL', city: 'CAMPINAS', address: 'RUA DR. SALES DE OLIVEIRA, Nº1661' },
  paymentPlans: [
    { id: 1, installments: 18, installmentValue: '169.95', total: '3059.10', description: '18x R$ 169,95' },
    { id: 2, installments: 1, installmentValue: '2613.60', total: '2613.60', description: '1x R$ 2.613,60' },
  ],
};

const MOCK_OFFER_DIGITAL: CourseOffer = {
  ...MOCK_OFFER_PRESENCIAL,
  id: 2,
  modality: 'DIGITAL',
  paymentPlans: [],
};

const mockOnAvançarClick = jest.fn();

// >>>>>>>>>>>> MOCKS DOS DADOS <<<<<<<<<<<<<<<<<<

describe('CourseOfferCard', () => {

  beforeEach(() => {
    mockOnAvançarClick.mockClear();
  });

  // Teste 1: O card Presencial (com preços)
  it('Verifica se o card "Presencial" foi renderizado', () => {
    render(<CourseOfferCard offer={MOCK_OFFER_PRESENCIAL} onAvançarClick={mockOnAvançarClick} />);

    // Verifica se os textos do header estão presentes
    expect(screen.getByText('Presencial')).toBeInTheDocument();
    expect(screen.getByText('Manhã')).toBeInTheDocument();
    
    // Verifica se os valores presente no card estão corretos
    expect(screen.getByText(/De R\$ 4\.752,00/)).toBeInTheDocument();
    expect(screen.getByText('18x')).toBeInTheDocument();
    expect(screen.getByText(/169,95/)).toBeInTheDocument();
    expect(screen.getByText(/à vista R\$ 2\.613,60/)).toBeInTheDocument();
      
    // Verifica se parte do texto do footer está no card
    expect(screen.getByText('CAMPINAS - VILA INDUSTRIAL')).toBeInTheDocument();
  });
});