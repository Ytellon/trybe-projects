import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Game from '../pages/Game';
import userEvent from '@testing-library/user-event';

describe('Testa a tela de jogo', () => {
  const INITIAL_STATE = { player: { name: 'Dick Gumshoe', gravatarEmail: '836e19ea0e81a1a8ae5a8d360d876133', score: 0 } };
  const mockApi = {
    "response_code":0,
    "results":
      [
        {
          "category":"Entertainment: Video Games",
          "type":"multiple",
          "difficulty":"easy",
          "question":"What is the first weapon you acquire in Half-Life?",
          "correct_answer":"A crowbar",
          "incorrect_answers":
          [
            "A pistol",
            "The H.E.V suit",
            "Your fists"
          ]
        },
        {
          "category":"Entertainment: Anime and Manga",
          "type":"multiple",
          "difficulty":"medium",
          "question":"In JoJo's Bizarre Adventure, which of the following Stands does NOT have a time-based ability?",
          "correct_answer":"20th Century Boy",
          "incorrect_answers":
          [
            "Made in Heaven",
            "Star Platinum",
            "The World"
          ]
        },
        {
          "category":"Animals",
          "type":"multiple",
          "difficulty":"medium",
          "question":"What type of animal is a natterjack?",
          "correct_answer":"Toad",
          "incorrect_answers":
          [
            "Bird",
            "Fish",
            "Insect"
          ]
        },
        {
          "category":"Entertainment: Video Games",
          "type":"multiple",
          "difficulty":"hard",
          "question":"The Internet Meme 'All your base are belong to us' is based on the poorly translated English Version of which Video Game?",
          "correct_answer":"Zero Wing",
          "incorrect_answers":
          [
            "F-Zero",
            "Wing Commander",
            "Star Wars: X-Wing"
          ]
        },
        {
          "category":"Entertainment: Video Games",
          "type":"boolean",
          "difficulty":"hard",
          "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
          "correct_answer":"False",
          "incorrect_answers":
          [
            "True"
          ]
        }
      ]
  };

  // const mockFail = {
  //   "response_code":3,
  //   "results":[]
  // }

  it('Testa se o header exibe as informações da pessoa jogadora', () => {
    renderWithRouterAndRedux(<Game />, INITIAL_STATE, '/play');
    const playerName = screen.queryByTestId('header-player-name');
    const playerScore = screen.queryByTestId('header-score')
    const playerPicture = screen.queryByTestId('header-profile-picture');

    expect(playerName.innerHTML).toBe('Dick Gumshoe');
    expect(playerScore.innerHTML).toBe('0');
    expect(playerPicture.src).toBe('https://www.gravatar.com/avatar/836e19ea0e81a1a8ae5a8d360d876133');
  })

  it('Testa se a api de perguntas é chamada e as informações são colocadas na tela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApi)
    })

    renderWithRouterAndRedux(<Game />, INITIAL_STATE, '/play');
    const category = await screen.findByTestId('question-category');
    const correctAnswer = await screen.findByTestId('correct-answer');
    const wrongAnswer = await screen.findByTestId('wrong-answer-1');

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toHaveBeenCalled();
    expect(category).toBeInTheDocument();
    expect(category.innerHTML).toBe('Entertainment: Video Games');
    expect(correctAnswer).toBeInTheDocument();
    expect(correctAnswer.innerHTML).toBe('A crowbar');
    expect(wrongAnswer).toBeInTheDocument();
  })

  it('Testa se o botão para a próxima pergunta aparece depois de um botão ser clicado', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApi)
    })

    renderWithRouterAndRedux(<Game />, INITIAL_STATE, '/play');
    const correctAnswer = await screen.findByTestId('correct-answer');

    userEvent.click(correctAnswer);
    expect(screen.getByTestId('btn-next')).toBeInTheDocument();
  })

  it('Testa a funcionalidade do timer', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApi)
    })

    jest.useFakeTimers();
    const time = jest.spyOn(global, 'setTimeout');

    renderWithRouterAndRedux(<Game />, INITIAL_STATE, '/play');
    const correctAnswer = await screen.findByTestId('correct-answer');
    
    expect(screen.getByRole('heading', {level: 2, name: '30'})).toBeInTheDocument();
    jest.advanceTimersByTime(35000);
    expect(await screen.findByRole('heading', {level: 2, name: '0'})).toBeInTheDocument();
    expect(correctAnswer).toBeDisabled();
  })

  it('Testa a funcionalidade do score', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApi)
    })

    renderWithRouterAndRedux(<Game />, INITIAL_STATE, '/play');
    const correctAnswer = await screen.findByTestId('correct-answer');
    const playerScore = screen.queryByTestId('header-score');
    
    expect(playerScore.innerHTML).toBe('0');
    userEvent.click(correctAnswer);
    userEvent.click(screen.getByTestId('btn-next'));
    expect(playerScore.innerHTML).toBe('40');
  })

  it('Testa se 5 perguntas são mostradas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApi)
    })

    const { history } = renderWithRouterAndRedux(<Game />, INITIAL_STATE, '/play');

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));

    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    expect(history.location.pathname).toBe('/feedback')
  })
})