import React from 'react';
import { render, screen } from '@testing-library/react';
import { OfferDetailsModal } from './OfferDetailsModal';
import { type CourseOffer } from './CourseOfferCard';


const mockOnClose = jest.fn();

// >>>>>>>>>>>> MOCKS DOS DADOS <<<<<<<<<<<<<<<<<<

const MOCK_OFFER_PRESENCIAL: CourseOffer = {
  id: 1,
  modality: 'PRESENCIAL',
  listPrice: '4752.00',
  featuredFullPrice: '2613.60',
  course: { id: 1, name: 'Administração' },
  campus: { id: 1, name: 'VILA INDUSTRIAL', city: 'CAMPINAS', address: 'AV. DAS AMÉRICAS, TOM 200' },
  paymentPlans: [
    { id: 1, installments: 18, installmentValue: '169.95', total: '3059.10', description: '18x R$ 169,95' },
    { id: 2, installments: 1, installmentValue: '2613.60', total: '2613.60', description: '1x R$ 2.613,60' },
  ],
};

const MOCK_OFFER_DIGITAL: CourseOffer = {
  ...MOCK_OFFER_PRESENCIAL,
  id: 2,
  modality: 'DIGITAL',
  course: { id: 1, name: 'Administração' },
  campus: { id: 1, name: 'BARRA DA TIJUCA', city: 'RIO DE JANEIRO', address: 'AV. DAS AMÉRICAS, TOM 300' },
  paymentPlans: [],
};

// >>>>>>>>>>>> MOCKS DOS DADOS <<<<<<<<<<<<<<<<<<


describe('OfferDetailsModal', () => {
  beforeEach(() => {
    mockOnClose.mockClear();
    document.body.classList.remove('modal-open');
  });

  // Conteúdo do card Presencial (Botão desabilitado)
  it('Verifica se mostra a tabela de preços (Presencial) e o botão "Avançar" desabilitado', () => {
    render(<OfferDetailsModal offer={MOCK_OFFER_PRESENCIAL} onClose={mockOnClose} />);
    
    // Verifica se a tabela está lá
    expect(screen.getByText('Qual dessas opções de parcelas você prefere?')).toBeInTheDocument();
    expect(screen.getByText('18x R$ 169,95')).toBeInTheDocument();
       
    // O botão deve estar desabilitado
    const avançarButton = screen.getByRole('button', { name: 'Avançar' });
    expect(avançarButton).toBeDisabled();
  });

  it('Verifica se mostra a tabela de preços (Digital) e o botão "Avançar" desabilitado', () => {
    render(<OfferDetailsModal offer={MOCK_OFFER_DIGITAL} onClose={mockOnClose} />);
    
    // Verifica se o hero digital está lá
    expect(screen.getByText(/Inscreva-se para saber/)).toBeInTheDocument();
    
    // Verifica se a tabela NÃO está lá
    expect(screen.queryByText('Qual dessas opções de parcelas você prefere?')).not.toBeInTheDocument();

    // O botão deve estar habilitado
    const avançarButton = screen.getByRole('button', { name: 'Avançar' });
    expect(avançarButton).toBeEnabled();
  });
});