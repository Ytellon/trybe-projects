import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente PokemonsDetails', () => {
  it('Teste se as informações detalhadas do pokémon são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const pokemonName = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonName).toBeInTheDocument();
    const pokemonLink = screen.queryByRole('link', { name: /more details/i });
    expect(pokemonLink).not.toBeInTheDocument();
    const pokemonHeading = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(pokemonHeading).toBeInTheDocument();
    const pokemonSummary = screen.getByText(/berries with electricity /i);
    expect(pokemonSummary).toBeInTheDocument();
  });
  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const pokemonsHeading = screen.getByRole(
      'heading', { level: 2, name: /game locations of pikachu/i },
    );
    expect(pokemonsHeading).toBeInTheDocument();
    const pokemonsMaps = screen.getByText(/kanto Viridian Forest/i);
    expect(pokemonsMaps).toBeInTheDocument();
    const pokemonLocations = screen.getAllByAltText(/pikachu location/i);
    expect(pokemonLocations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonLocations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsLink);
    const favoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);
    expect(favoritePokemon).toBeChecked();
  });
});
