import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente NotFound', () => {
  it('Teste se a página contém um heading h2 com o texto Page request not found', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/ });
    expect(notFound).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const pokeImg = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    expect(pokeImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
