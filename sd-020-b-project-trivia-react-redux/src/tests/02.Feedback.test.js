import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Feedback from '../pages/Feedback';
import userEvent from '@testing-library/user-event';

describe('Testa a tela de Feedback', () => {
  it('Testa se os detalhes do jogador aparecem no Feedback', () => {
    const INITIAL_STATE = {
      player: {
        name: 'Dick Gumshoe',
        gravatarEmail: '836e19ea0e81a1a8ae5a8d360d876133',
      },
    };

    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/feedback');
    const playerName = screen.queryByTestId('header-player-name');
    const playerPicture = screen.queryByTestId('header-profile-picture');

    expect(playerName.innerHTML).toBe('Dick Gumshoe');
    expect(playerPicture.src).toBe('https://www.gravatar.com/avatar/836e19ea0e81a1a8ae5a8d360d876133');
  })

  it('Testa a mensagem de feedback caso o jogador acerte menos de três perguntas', () => {
    const INITIAL_STATE = { player: { assertions: 2 } };
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/feedback');

    expect(screen.queryByText(/could be better.../i)).toBeInTheDocument();
    expect(screen.queryByText(/well done!/i)).not.toBeInTheDocument();
  })

  it('Testa a mensagem de feedback caso o jogador acerte três perguntas', () => {
    const INITIAL_STATE = { player: { assertions: 3 } };
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/feedback');

    expect(screen.queryByText(/could be better.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/well done!/i)).toBeInTheDocument();
  })

  it('Testa a mensagem de feedback caso o jogador acerte mais de três perguntas', () => {
    const INITIAL_STATE = { player: { assertions: 5 } };
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/feedback');

    expect(screen.queryByText(/could be better.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/well done!/i)).toBeInTheDocument();
  })

  it('Testa se a tela exibe informações sobre o desempenho do player', () => {
    const INITIAL_STATE = {
      player: {
        score: 47,
        assertions: 2,
      },
    };
    const { store } = renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/feedback');
    const playerScore = screen.queryByTestId('feedback-total-score');
    const playerAssertions = screen.queryByTestId('feedback-total-question');

    expect(playerScore.innerHTML).toBe('47');
    expect(playerAssertions.innerHTML).toBe('2');
    expect(typeof store.getState().player.assertions).toBe('number');
    expect(typeof store.getState().player.score).toBe('number');
  })

  it('Testa se existe o botão para jogar novamente', () => {
    const INITIAL_STATE = { player: {name: 'Dick Gumshoe'} };
    const {history} = renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/feedback');
    const playBtn = screen.queryByTestId('btn-play-again');

    expect(history.location.pathname).toBe('/feedback');
    expect(playBtn).toBeInTheDocument();
    userEvent.click(playBtn);
    expect(history.location.pathname).toBe('/');
  })

  it('Testa se existe o botão para a tela de ranking', () => {
    const INITIAL_STATE = { player: {name: 'Dick Gumshoe'} };
    const {history} = renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/feedback');
    const rankingBtn = screen.queryByTestId('btn-ranking');

    expect(history.location.pathname).toBe('/feedback');
    expect(rankingBtn).toBeInTheDocument();
    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');
  })
})