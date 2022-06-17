import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const buttonLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(buttonLink);
    const pokemon = pokemons[0];
    const { averageWeight } = pokemon;
    const pokemonDetail = screen.getByTestId('pokemon-name');
    expect(pokemonDetail).toHaveTextContent(pokemon.name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemon.type);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    const pokeImg = screen.getByRole('img', { name: `${pokemon.name} sprite` });
    expect(pokeImg).toHaveAttribute('src', pokemon.image);
  });
  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const buttonLink = screen.getByRole('link', { name: /more details/i });
    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });
  it('ao clicar no link de navegação do pokémon, é feito o redirect da aplicação', () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const buttonLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(buttonLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
    const titlePokemon = screen.getByRole(
      'heading', { level: 2, name: `${pokemon.name} Details` },
    );
    expect(titlePokemon).toBeInTheDocument();
  });
  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const buttonLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(buttonLink);
    const favCheck = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favCheck);
    const starImg = screen.getByRole(
      'img', { name: `${pokemon.name} is marked as favorite` },
    );
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
