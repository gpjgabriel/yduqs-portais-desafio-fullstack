import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { OfferDetailsModal } from './OfferDetailsModal';
import { type CourseOffer } from './CourseOfferCard';


const mockOnClose = jest.fn();

const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

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
    mockRouterPush.mockClear();
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

  it('Verifica seo botão "Avançar" é habilitado após selecionar um plano', () => {
    render(<OfferDetailsModal offer={MOCK_OFFER_PRESENCIAL} onClose={mockOnClose} />);
    
    const avançarButton = screen.getByRole('button', { name: 'Avançar' });
    expect(avançarButton).toBeDisabled(); // Verifica se está desabilitado

    // Seleciona um plano
    const radioLabel = screen.getByText('18x R$ 169,95');
    fireEvent.click(radioLabel);

    // Verifica se o botão foi habilitado
    expect(avançarButton).toBeEnabled();
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

  it('Verifica se o accordion abre e fecha ao clicar', () => {
    render(<OfferDetailsModal offer={MOCK_OFFER_PRESENCIAL} onClose={mockOnClose} />);
    
    const accordionHeader = screen.getByText('Sobre a Bolsa Incentivo');
    
    // Verifica se o conteúdo do accordion não está na tela
    expect(screen.queryByText('Aqui vai o conteúdo...')).not.toBeInTheDocument();

    // Clica para abrir
    fireEvent.click(accordionHeader);
    // Verifica se o conteúdo aparece
    expect(screen.getByText('Aqui vai o conteúdo...')).toBeInTheDocument();
    
    // Clica para fechar
    fireEvent.click(accordionHeader);
    expect(screen.queryByText('Aqui vai o conteúdo...')).not.toBeInTheDocument();
  });

  it('Verifica se, ao clicar em "Avançar", chama o router.push com os query params corretos', () => {
    render(<OfferDetailsModal offer={MOCK_OFFER_PRESENCIAL} onClose={mockOnClose} />);

    // Seleciona o plano 
    const radioLabel = screen.getByText('1x R$ 2.613,60');
    fireEvent.click(radioLabel);
    
    // Clica em Avançar
    const avançarButton = screen.getByRole('button', { name: 'Avançar' });
    fireEvent.click(avançarButton);
    
    // Verifica se o router.push foi chamado corretamente
    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/inscricao?offerId=1&planId=2');
  });
});