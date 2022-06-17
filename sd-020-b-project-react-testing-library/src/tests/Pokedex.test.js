import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente Pokemon', () => {
  const pokemontestId = 'pokemon-name';

  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingH2 = screen.getByRole('heading',
      { level: 2, name: /encountered pokémons/i });
    expect(headingH2).toBeInTheDocument();
  });
  it('Se é exibido o próximo pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const allPokemons = pokemons.map((pokemon) => pokemon.name);
    const pokemonName = screen.getByTestId(pokemontestId);
    const getButton = screen.getByRole('button', { name: /próximo pokémon/i });
    allPokemons.forEach((pokemon) => {
      expect(pokemonName).toHaveTextContent(pokemon);
      if (pokemon === 'Dragonair') {
        userEvent.click(getButton);
        expect(pokemonName).toHaveTextContent(allPokemons[0]);
      }
      userEvent.click(getButton);
    });
  });
  it('Teste se é mostrado apenas um pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId(pokemontestId);
    expect(pokemonName).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const maxLength = 7;
    const pokeFilter = screen.getAllByTestId('pokemon-type-button');
    expect(pokeFilter).toHaveLength(maxLength);
  });
  it('Deve existir um botão de filtragem para cada tipo de pokémon', () => {
    renderWithRouter(<App />);
    const pokeElectric = screen.getByRole('button', { name: /electric/i });
    expect(pokeElectric).toBeInTheDocument();
    const pokeFire = screen.getByRole('button', { name: /fire/i });
    expect(pokeFire).toBeInTheDocument();
    const pokeBug = screen.getByRole('button', { name: /bug/i });
    expect(pokeBug).toBeInTheDocument();
    const pokePoison = screen.getByRole('button', { name: /poison/i });
    expect(pokePoison).toBeInTheDocument();
    const pokePsychic = screen.getByRole('button', { name: /psychic/i });
    expect(pokePsychic).toBeInTheDocument();
    const pokeNormal = screen.getByRole('button', { name: /normal/i });
    expect(pokeNormal).toBeInTheDocument();
    const pokeDragon = screen.getByRole('button', { name: /dragon/i });
    expect(pokeDragon).toBeInTheDocument();
    const pokeAll = screen.getByRole('button', { name: /all/i });
    expect(pokeAll).toBeInTheDocument();
  });
  it('a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    const pokeFilter = screen.getByRole('button', { name: /psychic/i });
    const pokeType = screen.getByTestId('pokemon-type');
    userEvent.click(pokeFilter);
    expect(pokeType).toHaveTextContent(/psychic/i);
  });
  it('mostrar os pokémons (sem filtros) quando o botão All for clicado', () => {
    renderWithRouter(<App />);
    const pokeFilter = screen.getByRole('button', { name: /all/i });
    const pokeAll = screen.getByTestId(pokemontestId);
    userEvent.click(pokeFilter);
    expect(pokeAll).toHaveTextContent(/pikachu/i);
  });
});
