export const REQUEST_INFO = 'REQUEST_INFO';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const GET_SCORE = 'GET_SCORE';
export const GET_ASSERTION = 'GET_ASSERTION';
export const RESET_GAME = 'RESET_GAME';

export const requestInfo = (name, email) => ({
  type: REQUEST_INFO,
  name,
  email,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

export const getAssertion = () => ({
  type: GET_ASSERTION,
});

export const resetGame = () => ({
  type: RESET_GAME,
});
