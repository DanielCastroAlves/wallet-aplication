import {
  ADICIONAR_DESPESAS,
  DELETAR_DESPESAS,
  EDITAR_DESPESAS,
  CAPTURA_DESPESAS_EDIT,
  GUARDAR_MOEDAS,
} from '../actions/index';

const INITIAL_STATE = {

  currencies: [],
  expenses: [],
  edit: [],
  formEditVisibled: false,

};

function carteiraReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADICIONAR_DESPESAS:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.despesas }],
    };

  case DELETAR_DESPESAS:
    return {
      ...state,
      expenses: [...state.expenses.filter((despesa) => despesa.id !== action.payload)],
    };

  case CAPTURA_DESPESAS_EDIT:
    return {
      ...state,
      /* expenses: [...state.expenses.filter((despesa) => despesa.id !== action.payload)], */
      edit: [...state.expenses.filter((despesa) => despesa.id === action.payload)],
      formEditVisibled: true,
    };
  case EDITAR_DESPESAS:

    return {
      ...state,
      formEditVisibled: false,
      expenses: state.expenses.map((despesa) => {
        if (despesa.id === action.payload.id) {
          return action.payload;
        }
        return despesa;
      }),
    };

  case GUARDAR_MOEDAS:
    return {
      ...state,
      currencies: [...state.currencies, { ...action.despesas }],
    };

  default:
    return state;
  }
}

export default carteiraReducer;
