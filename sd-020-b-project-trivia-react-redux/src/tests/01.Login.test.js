import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Login from '../pages/Login'
import userEvent from '@testing-library/user-event';

describe('Testa os inputs da página de login', () => {
  it('Será validado se é possível escrever o nome da pessoa jogadora', () => {
    renderWithRouterAndRedux(<Login />);
    userEvent.type(screen.getByTestId('input-player-name'), 'Miles Edgeworth');
    expect(screen.getByTestId('input-player-name')).toHaveValue('Miles Edgeworth');
  })

  it('Será validado se é possível escrever o email da pessoa jogadora', () => {
    renderWithRouterAndRedux(<Login />);
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'edgeworth@prosecutor.com');
    expect(screen.getByTestId('input-gravatar-email')).toHaveValue('edgeworth@prosecutor.com');
  })

  it('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora não preencher nenhum campo', () => {
    renderWithRouterAndRedux(<Login />);
    expect(screen.getByTestId('btn-play')).toBeDisabled();
  })

  it('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora escrever apenas o nome', () => {
    renderWithRouterAndRedux(<Login />);
    userEvent.type(screen.getByTestId('input-player-name'), 'Miles Edgeworth');
    expect(screen.getByTestId('btn-play')).toBeDisabled();
  })

  it('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora escrever apenas o email', () => {
    renderWithRouterAndRedux(<Login />);
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'edgeworth@prosecutor.com');
    expect(screen.getByTestId('btn-play')).toBeDisabled();
  })

  it('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora escrever apenas o email', () => {
    renderWithRouterAndRedux(<Login />);
    userEvent.type(screen.getByTestId('input-player-name'), 'Miles Edgeworth');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'edgeworth@prosecutor.com');
    expect(screen.getByTestId('btn-play')).not.toBeDisabled();
  })
})

describe('Testa o botão de iniciar o jogo', () => {
  it('Será validado se ao clicar no botão "Play" o jogo é iniciado salvando um token de jogador', () => {
    const mockApi = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApi)
    })

    renderWithRouterAndRedux(<Login />, {player: '' })
    userEvent.type(screen.getByTestId('input-player-name'), 'Phoenix Wright');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'ace@attorney.com');
    userEvent.click(screen.getByTestId('btn-play'));

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toHaveBeenCalled();
  })
})

describe('Testa o botão de configuração', () => {
  it('Será validado se o botão existe na página', () => {
    renderWithRouterAndRedux(<Login />)
    expect(screen.getByTestId('btn-settings')).toBeInTheDocument();
  })

  it('Será validado se a tela de configurações possui um título', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    userEvent.click(screen.getByTestId('btn-settings'));
    const { pathname } = history.location;
    expect(pathname).toBe('/setting');
  })
})