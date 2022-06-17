import { REQUEST_INFO, GET_SCORE, GET_ASSERTION, RESET_GAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INFO:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case GET_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case GET_ASSERTION:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case RESET_GAME:
    return {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default player;
