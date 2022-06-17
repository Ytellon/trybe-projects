import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Ranking from '../pages/Ranking';
import userEvent from '@testing-library/user-event';

describe('Testa a tela de ranking', () => {
  beforeEach(() => {
    const localStorageItems = [
      {"name":"Phoenix Wright","score":300,"picture":"https://www.gravatar.com/avatar/25956f22a7cfa2785bb457d457ca1b79"},
      {"name":"Dick Gumshoe","score":47,"picture":"https://www.gravatar.com/avatar/836e19ea0e81a1a8ae5a8d360d876133"},
      {"name":"Miles Edgeworth","score":500,"picture":"https://www.gravatar.com/avatar/3a927ad2e3b98daee9cbd47a208e3349"},
      {"name":"Maya Fey","score":89,"picture":"https://www.gravatar.com/avatar/e28a0a02e6eb06aa52bb571bdfdfe6d6"}]

    localStorage.setItem('ranking', JSON.stringify(localStorageItems));
  })

  it('Testa se existe um botão para a tela inicial', () => {
    const INITIAL_STATE = { player: {name: 'Maya Fey'} };
    const { history } = renderWithRouterAndRedux(<Ranking />, INITIAL_STATE, '/ranking');
    const homeBtn = screen.getByTestId('btn-go-home');

    expect(history.location.pathname).toBe('/ranking');
    userEvent.click(homeBtn);
    expect(history.location.pathname).toBe('/');
  })

  it('Testa se o conteúdo de ranking é exibido na tela', () => {
    const INITIAL_STATE = { player: {name: 'Maya Fey'} };
    renderWithRouterAndRedux(<Ranking />, INITIAL_STATE, '/ranking');
    const firstPlayerName = screen.getByTestId('player-name-0');
    const firstPlayerScore = screen.getByTestId('player-score-0');

    expect(firstPlayerName).toBeInTheDocument();
    expect(firstPlayerName.innerHTML).toBe('Miles Edgeworth');
    expect(firstPlayerScore).toBeInTheDocument();
    expect(firstPlayerScore.innerHTML).toBe('500');
  })
})