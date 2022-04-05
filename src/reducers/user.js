import { GUARDAR_EMAIL } from '../actions';

const INITIAL_STATE = {

  email: '',

};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GUARDAR_EMAIL:
    return {
      ...state,
      email: action.email,

    };

  default:
    return state;
  }
}

export default loginReducer;
